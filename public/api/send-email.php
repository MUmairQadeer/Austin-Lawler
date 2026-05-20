<?php
// Allow CORS for local dev testing
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

// Read raw JSON post data
$input = json_decode(file_get_contents('php://input'), true);
$name = $input['name'] ?? '';
$jobTitle = $input['jobTitle'] ?? '';
$rating = (int)($input['rating'] ?? 0);
$text = $input['text'] ?? '';

if (empty($name) || empty($text) || empty($rating)) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

// Resend API Configuration
$apiKey = 're_5JnBpwcD_Aq2BNwCbMJRMefTqbdHE3LTV';
$stars = str_repeat('★', $rating);

// Formulate HTML Email Template
$htmlContent = "
<div style=\"font-family: sans-serif; padding: 20px; color: #0f172a; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;\">
  <h2 style=\"color: #eab308; margin-bottom: 5px;\">New Testimonial Submitted</h2>
  <p style=\"color: #64748b; margin-top: 0; font-size: 14px;\">A student/client has submitted feedback on the Safety Guild website.</p>
  <hr style=\"border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;\" />
  
  <table style=\"width: 100%; font-size: 15px; border-collapse: collapse;\">
    <tr>
      <td style=\"padding: 6px 0; font-weight: bold; width: 120px;\">Name:</td>
      <td style=\"padding: 6px 0;\">$name</td>
    </tr>
    <tr>
      <td style=\"padding: 6px 0; font-weight: bold;\">Job / Company:</td>
      <td style=\"padding: 6px 0;\">" . ($jobTitle ? $jobTitle : 'Not specified') . "</td>
    </tr>
    <tr>
      <td style=\"padding: 6px 0; font-weight: bold;\">Rating:</td>
      <td style=\"padding: 6px 0; color: #eab308;\">$stars ($rating/5)</td>
    </tr>
  </table>
  
  <div style=\"margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #eab308; border-radius: 4px;\">
    <p style=\"margin: 0; font-style: italic; line-height: 1.6;\">\"$text\"</p>
  </div>
  
  <hr style=\"border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;\" />
  <p style=\"font-size: 12px; color: #94a3b8; text-align: center;\">
    To publish this testimonial live on the website, go to your Sanity.io studio dashboard and click \"Publish\".
  </p>
</div>
";

$payload = json_encode([
    "from" => "onboarding@resend.dev",
    "to" => "muhammadumair.coding@gmail.com",
    "subject" => "New Testimonial: $name ($rating Stars)",
    "html" => $htmlContent
]);

// Initialize curl to fetch Resend API
$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200 || $httpCode === 201) {
    http_response_code(200);
    echo json_encode(["success" => true, "data" => json_decode($response)]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to send email", "details" => json_decode($response, true)]);
}
?>
