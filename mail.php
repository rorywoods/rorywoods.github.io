<?php  

  if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if ($_POST['contact-name'] != "") {
      $_POST['name'] = filter_var($_POST['contact-name'], FILTER_SANITIZE_STRING);
      if ($_POST['contact-name'] == "") {
        $errors .= 'Please enter a valid name.<br/><br/>';
      }
    } else {
      $errors .= 'Please enter your name.<br/>';
    }

    if ($_POST['contact-email'] != "") {
      $email = filter_var($_POST['contact-email'], FILTER_SANITIZE_EMAIL);
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors .= "$email is <strong>NOT</strong> a valid email address.<br/><br/>";
      }
    } else {
      $errors .= 'Please enter your email address.<br/>';
    } 

    if ($_POST['contact-subject'] != "") {
      $_POST['contact-subject'] = filter_var($_POST['contact-subject'], FILTER_SANITIZE_STRING);
      if ($_POST['contact-subject'] == "") {
        $errors .= 'Please enter a subject.<br/>';
      }
    } else {
      $errors .= 'Please enter a subject.<br/>';
    }

    if ($_POST['contact-message'] != "") {
      $_POST['contact-message'] = filter_var($_POST['contact-message'], FILTER_SANITIZE_STRING);
      if ($_POST['contact-message'] == "") {
        $errors .= 'Please enter a message to send.<br/>';
      }
    } else {
      $errors .= 'Please enter a message to send.<br/>';
    }

    if (!$errors) {
      $mail_to = 'info@rowo.co';
      $subject = "RoWoCo Site Inquiry: " . $_POST['contact-subject'];
      $message  = 'From: ' . $_POST['contact-name'] . "\n";
      $message .= 'Email: ' . $_POST['contact-email'] . "\n\n";
      $message .= "Message:\n" . $_POST['contact-message'] . "\n";
      $header = "From:" . $_POST['contact-email'] . "\r\n";
      if (mail($mail_to, $subject, $message, $header)) {
        echo '<div class="alert alert-success margin-top-40"><button type="button" class="close" data-dismiss="alert">×</button><strong>Success!</strong> Thank you for your email.</div>';
      } else {
        echo '<div class="alert alert-danger margin-top-40"><button type="button" class="close" data-dismiss="alert">×</button><strong>Error in submiting! Please fill out the form again.</strong><br /></div>';
      }
    } else {
      echo '<div class="alert alert-danger margin-top-40"><button type="button" class="close" data-dismiss="alert">×</button><strong>Error!</strong><br /> ' . $errors . '</div>';
    }
  }

?>
