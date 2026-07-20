<?php
declare(strict_types=1);

if (!defined('NEXLOCAL_BOOTSTRAP')) {
    http_response_code(404);
    exit;
}

return [
    'recipient' => 'support@nexlocal.com',
    'sender' => 'noreply@nexlocal.com',
    'subject_prefix' => '[Nexlocal Inquiry]',
    'success_redirect' => 'contact.html?status=success#inquiry-form',
    'error_redirect' => 'contact.html?status=error#inquiry-form',
    'rate_limit_seconds' => 15,
    'request_types' => [
        'Request a Digital Audit',
        'Ask About a Service',
        'Request Package Information',
        'Advertise & Collaborate',
        'Discuss a Partnership',
        'General Inquiry',
    ],
    'services' => [
        'small-business-websites',
        'google-business-profile-setup',
        'online-booking-setup',
        'lead-forms-call-tracking',
        'review-management',
        'email-sms-automation',
        'analytics-setup',
        'crm-setup',
        'not-sure',
    ],
    'business_categories' => [
        'Restaurants & Cafes',
        'Salons & Wellness',
        'Clinics',
        'Home Services',
        'Retail',
        'Professional Services',
        'Other',
    ],
    'budgets' => [
        'Not sure yet',
        'Under $2,500',
        '$2,500–$5,000',
        '$5,000–$10,000',
        '$10,000+',
        'Prefer to discuss',
    ],
    'timelines' => [
        'Exploring options',
        'Within 1 month',
        'Within 1–3 months',
        'Within 3–6 months',
        'Flexible',
    ],
    'max_lengths' => [
        'fullName' => 100,
        'businessName' => 120,
        'email' => 180,
        'website' => 220,
        'currentSetup' => 300,
        'message' => 4000,
    ],
];
