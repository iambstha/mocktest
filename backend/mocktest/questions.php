<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST'); // Add other allowed methods if needed (e.g., GET, PUT, DELETE)
header('Access-Control-Allow-Headers: Content-Type'); // Add other allowed headers if needed

require './databaseConnection.php';

// Allow requests only from your React app's domain (replace http://localhost:3000 with your app's domain)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = fetchQuestions();
  header('Content-Type: application/json');
  echo json_encode($data);
}



function fetchQuestions() {
    try{
        $conn = getDBConnection();
        $stmt = $conn->query("SELECT * FROM questions");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $conn = null;

        return $results;
    }
    catch (PDOException $e) {
        // If there's an error, display the error message
        http_response_code(500);
        echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
    }
}
