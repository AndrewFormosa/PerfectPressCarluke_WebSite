<?php
$customer = $_POST["customer_name"];
$contact = $_POST["customer_contact"];

$email_to = "info@perfectpresscarluke.co.uk";
$name = "Andy James";
$email_from = "info@perfectpresscarluke.co.uk";

$reply_to = "info@perfectpresscarluke.co.uk";
$message = "Please send a price list to :" .$customer ."\nCustomer Email Address is: " .$contact ."\nFrom your website";

$email_subject = "Price list request";
$headers = "From: " . $email_from . "\n";
$headers .= "Reply-To: " . $reply_to . "\n";

echo $message;

ini_set("sendmail_from", $email_from);
$sent = mail($email_to, $email_subject, $message, $headers, "-f" .$email_from);
if ($sent)
{
echo "sent successful";
} else {
echo "There has been an error sending your comments. Please try later.";
}
header("Location:http://www.afomos.co.uk/test_docs/test_web/perfectpresscarluke/thankyou.html");
exit();
?>