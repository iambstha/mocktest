<?php
require './databaseConnection.php';

function fetchDataFromDatabase() {
    try{
        $conn = getDBConnection();
        $stmt = $conn->query("SELECT * FROM students");
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
