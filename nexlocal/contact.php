<?php
declare(strict_types=1);

define('NEXLOCAL_BOOTSTRAP', true);
$config = require __DIR__ . '/config/contact-config.php';

header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Cache-Control: no-store');

function nexlocal_wants_json(): bool
{
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
    $requestedWith = strtolower((string) ($_SERVER['HTTP_X_REQUESTED_WITH'] ?? ''));
    return str_contains(strtolower($accept), 'application/json') || $requestedWith === 'xmlhttprequest';
}

function nexlocal_respond(array $config, int $status, bool $success, string $message, array $errors = []): never
{
    http_response_code($status);
    if (nexlocal_wants_json()) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(
            ['success' => $success, 'message' => $message, 'errors' => (object) $errors],
            JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
        );
        exit;
    }

    $location = $success ? $config['success_redirect'] : $config['error_redirect'];
    header('Location: ' . $location, true, 303);
    exit;
}

function nexlocal_value(string $key, bool $multiline = false): string
{
    $raw = $_POST[$key] ?? '';
    if (!is_string($raw)) {
        return '';
    }
    $value = str_replace(["\r\n", "\r"], "\n", $raw);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    $value = strip_tags($value);
    if (!$multiline) {
        $value = preg_replace('/\s+/u', ' ', $value) ?? '';
    }
    return trim($value);
}

function nexlocal_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function nexlocal_allowed(string $value, array $allowed): bool
{
    return in_array($value, $allowed, true);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    nexlocal_respond($config, 405, false, 'Please submit the inquiry form using POST.');
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 30000) {
    nexlocal_respond($config, 413, false, 'The submitted form is too large.');
}

// A filled honeypot is treated as accepted without sending or storing the submission.
if (nexlocal_value('company') !== '') {
    nexlocal_respond($config, 200, true, 'Thank you. Your inquiry has been submitted successfully.');
}

$sessionReady = false;
if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'httponly' => true,
        'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'samesite' => 'Lax',
    ]);
    $sessionReady = @session_start();
}

if ($sessionReady && isset($_SESSION['nexlocal_last_sent'])) {
    $elapsed = time() - (int) $_SESSION['nexlocal_last_sent'];
    if ($elapsed < (int) $config['rate_limit_seconds']) {
        nexlocal_respond($config, 429, false, 'Please wait briefly before sending another inquiry.');
    }
}

$fields = [
    'fullName' => nexlocal_value('fullName'),
    'businessName' => nexlocal_value('businessName'),
    'email' => nexlocal_value('email'),
    'website' => nexlocal_value('website'),
    'requestType' => nexlocal_value('requestType'),
    'service' => nexlocal_value('service'),
    'businessCategory' => nexlocal_value('businessCategory'),
    'currentSetup' => nexlocal_value('currentSetup'),
    'budget' => nexlocal_value('budget'),
    'timeline' => nexlocal_value('timeline'),
    'message' => nexlocal_value('message', true),
];

$errors = [];
foreach (['fullName', 'businessName', 'email', 'requestType', 'service', 'businessCategory', 'currentSetup', 'budget', 'timeline', 'message'] as $required) {
    if ($fields[$required] === '') {
        $errors[$required] = 'This field is required.';
    }
}

foreach ($config['max_lengths'] as $field => $maximum) {
    if (nexlocal_length($fields[$field]) > $maximum) {
        $errors[$field] = 'This field is longer than allowed.';
    }
}

if ($fields['email'] !== '' && (!filter_var($fields['email'], FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $fields['email']))) {
    $errors['email'] = 'Enter a valid email address.';
}

if ($fields['website'] !== '') {
    $websiteValid = filter_var($fields['website'], FILTER_VALIDATE_URL);
    $websiteScheme = strtolower((string) parse_url($fields['website'], PHP_URL_SCHEME));
    if (!$websiteValid || !in_array($websiteScheme, ['http', 'https'], true)) {
        $errors['website'] = 'Enter a complete website URL beginning with http:// or https://.';
    }
}

if ($fields['requestType'] !== '' && !nexlocal_allowed($fields['requestType'], $config['request_types'])) {
    $errors['requestType'] = 'Choose a valid request type.';
}
if ($fields['service'] !== '' && !nexlocal_allowed($fields['service'], $config['services'])) {
    $errors['service'] = 'Choose a valid service.';
}
if ($fields['businessCategory'] !== '' && !nexlocal_allowed($fields['businessCategory'], $config['business_categories'])) {
    $errors['businessCategory'] = 'Choose a valid business category.';
}
if ($fields['budget'] !== '' && !nexlocal_allowed($fields['budget'], $config['budgets'])) {
    $errors['budget'] = 'Choose a valid budget range.';
}
if ($fields['timeline'] !== '' && !nexlocal_allowed($fields['timeline'], $config['timelines'])) {
    $errors['timeline'] = 'Choose a valid timeline.';
}
if (nexlocal_value('privacy') !== 'accepted') {
    $errors['privacy'] = 'You must agree before submitting the inquiry.';
}

if ($errors !== []) {
    nexlocal_respond($config, 422, false, 'Please review the highlighted fields.', $errors);
}

$serviceLabels = [
    'small-business-websites' => 'Small Business Websites',
    'google-business-profile-setup' => 'Google Business Profile Setup',
    'online-booking-setup' => 'Online Booking Setup',
    'lead-forms-call-tracking' => 'Lead Forms & Call Tracking',
    'review-management' => 'Review Management',
    'email-sms-automation' => 'Email & SMS Automation',
    'analytics-setup' => 'Analytics Setup',
    'crm-setup' => 'CRM Setup',
    'not-sure' => 'Not sure yet',
];

$lines = [
    'New Nexlocal website inquiry',
    '----------------------------------------',
    'Name: ' . $fields['fullName'],
    'Business: ' . $fields['businessName'],
    'Email: ' . $fields['email'],
    'Website: ' . ($fields['website'] !== '' ? $fields['website'] : 'Not provided'),
    'Request type: ' . $fields['requestType'],
    'Service: ' . $serviceLabels[$fields['service']],
    'Business category: ' . $fields['businessCategory'],
    'Current setup: ' . $fields['currentSetup'],
    'Estimated budget: ' . $fields['budget'],
    'Desired timeline: ' . $fields['timeline'],
    '',
    'Message / goals:',
    $fields['message'],
    '',
    'Privacy agreement: accepted',
];

$subject = $config['subject_prefix'] . ' ' . $fields['requestType'];
$headers = [
    'From: Nexlocal Website <' . $config['sender'] . '>',
    'Reply-To: ' . $fields['email'],
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail(
    $config['recipient'],
    $subject,
    wordwrap(implode("\n", $lines), 78),
    implode("\r\n", $headers)
);

if (!$sent) {
    error_log('Nexlocal contact delivery failed at ' . gmdate('c'));
    nexlocal_respond($config, 502, false, 'Your message could not be sent. Please try again later.');
}

if ($sessionReady) {
    $_SESSION['nexlocal_last_sent'] = time();
}

nexlocal_respond($config, 200, true, 'Thank you. Your inquiry has been submitted successfully.');
