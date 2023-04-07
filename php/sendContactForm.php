<?php
$customer = $_POST["customer_name"];
$emailAddress = $_POST["customer_email"];
$telephoneNumber = $_POST["customer_telephone"];
$customerMessage = $_POST["customer_message"];


$email_to = "info@perfectpresscarluke.co.uk";

$email_from = "info@perfectpresscarluke.co.uk";

$reply_to = "info@perfectpresscarluke.co.uk";

$message = "Please contact :" .$customer ."\nCustomer Email address is: " .$emailAddress ."\nCustomer telephone number is:".$telephoneNumber."\nCustomer message is:".$customerMessage;


$email_subject = "Contact Us Form";
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
header("Location:http://www.perfectpresscarluke.co.uk/thankyou.html");
exit();
?>