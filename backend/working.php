<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST'); // Add other allowed methods if needed (e.g., GET, PUT, DELETE)
header('Access-Control-Allow-Headers: Content-Type'); // Add other allowed headers if needed

// Allow requests only from your React app's domain (replace http://localhost:3000 with your app's domain)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Database configuration
  $host = 'localhost';
  $port = '3306';
  $dbname = 'testdb';
  $username = 'root';
  $password = '';

  try {
    // Connect to the database
    $conn = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Perform the SQL query to retrieve data from the table
    $stmt = $conn->query("SELECT * FROM testtable");
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Close the database connection
    $conn = null;

    // Return the results as JSON
    header('Content-Type: application/json');
    echo json_encode($results);
  } catch (PDOException $e) {
    // If there's an error, display the error message
    http_response_code(500);
    echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
  }
}
?>
