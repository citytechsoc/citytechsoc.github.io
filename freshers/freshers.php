<?php
if (!isset($included) && !(isset($_SERVER['HTTP_REFERER']) && (strpos($_SERVER['HTTP_REFERER'], "cityuni.tech") || strpos($_SERVER['HTTP_REFERER'], "localhost")))) {
    die("Access denied.");
}

header('Cache-Control: no-cache, must-revalidate');
header('Content-type: application/json');

$save = "freshers.txt";
$freshers = file_get_contents($save);

$reply = array('status' => 'error', 'error' => false);
$firstname = ""; $lastname = ""; $email = ""; $check = "";

if (isset($_REQUEST['firstname']) && !empty($_REQUEST['firstname'])) {
    $firstname  = $_REQUEST['firstname'];
} else {
    $reply['error']['firstname'] = "Please enter your first name.";
}

if (isset($_REQUEST['lastname']) && !empty($_REQUEST['lastname'])) {
    $lastname = $_REQUEST['lastname'];
} else {
    $reply['error']['lastname'] = "Please enter your last name.";
}

if (!isset($_REQUEST['email']) || empty($_REQUEST['email'])) {
    $reply['error']['email'] = "Please enter your email address.";
} elseif (!filter_var($_REQUEST['email'], FILTER_VALIDATE_EMAIL)) {
    $reply['error']['email'] = "The email you entered is not valid!";
} else {
    $email  = $_REQUEST['email'];
}

if (isset($_REQUEST['check']) && !empty($_REQUEST['check'])) {
    $check  = $_REQUEST['check'];
} else {
    $reply['error']['check'] = "Please confirm that we can send you communications.";
}

if ($reply['error'] === false) {
    if (strpos($freshers, "{$email}") === false) {
        $freshers .= "{$firstname},{$lastname},{$email},{$check}\n";
        file_put_contents($save, $freshers);

        $reply['status'] = "success";
    } else {
        $reply['error']['other']['fail'] = "You've already signed up with that email!";
    }
}

echo json_encode($reply);