<?php
require 'dbConnection.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST'); // Add other allowed methods if needed (e.g., GET, PUT, DELETE)
header('Access-Control-Allow-Headers: Content-Type'); // Add other allowed headers if needed

// Allow requests only from your React app's domain (replace http://localhost:3000 with your app's domain)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'];
  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  try {
    $conn = getDBConnection();
    $stmt = $conn->prepare("INSERT INTO testtable (name, username, password) VALUES (:name, :username, :password)");
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $password);
    $stmt->execute();

    // Close the database connection
    $conn = null;

    // Return a success message
    header('Content-Type: application/json');
    echo json_encode(array('message' => 'Data added successfully'));
  } catch (PDOException $e) {
    // If there's an error, display the error message
    http_response_code(500);
    echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
  }
}
?>
