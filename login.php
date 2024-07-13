<?php
session_start();

// Array of valid usernames and their corresponding passwords
$users = [
    'tporter.consultant@newscorp.com' => 'GSOCIntranet2024!',
    'lagsoc@newscorp.com' => 'GSOCIntranet2024'
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // Check if the username exists and the password matches
    if (array_key_exists($username, $users) && $users[$username] === $password) {
        $_SESSION['loggedIn'] = true;
        $_SESSION['username'] = $username; // Store username in session
        header('Location: index.html'); // Redirect to the main page after login
        exit();
    } else {
        echo '<script>alert("Incorrect username or password. Please try again."); window.location.href = "login.html";</script>';
    }
}
?>
