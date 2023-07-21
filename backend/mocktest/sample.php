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



// Function to fetch random questions from the database
function getRandomQuestions($conn, $subject, $limit) {
    $sql = "SELECT * FROM questions WHERE subject = '$subject' ORDER BY RAND() LIMIT $limit";
    $result = $conn->query($sql);
    return $result->fetch_all(MYSQLI_ASSOC);
}

getRandomQuestions($conn, "physics", 5);

// Function to insert questionnaire and associated questions into the database
function saveQuestionnaire($conn, $title, $expiryDate, $questions) {
    $sql = "INSERT INTO questionnaires (title, expiry_date) VALUES ('$title', '$expiryDate')";
    $conn->query($sql);
    $questionnaireId = $conn->insert_id;

    foreach ($questions as $question) {
        $questionId = $question['id'];
        $sql = "INSERT INTO questionnaire_questions (questionnaire_id, question_id) VALUES ('$questionnaireId', '$questionId')";
        $conn->query($sql);
    }
    return $questionnaireId;
}

saveQuestionnaire($conn, 1,2054/48/78,'');
// Main function to handle the API request
function generateQuestionnaire() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Retrieve the title and expiry date from the request
        $title = $_POST['title'];
        $expiryDate = $_POST['expiry_date'];

        // Create a database connection
        $conn = getDBConnection();

        // Fetch random physics and chemistry questions from the database
        $physicsQuestions = getRandomQuestions($conn, 'physics', 5);
        $chemistryQuestions = getRandomQuestions($conn, 'chemistry', 5);

        // Save the questionnaire and associated questions in the database
        $questionnaireId = saveQuestionnaire($conn, $title, $expiryDate, array_merge($physicsQuestions, $chemistryQuestions));

        // Return the questionnaire ID as the API response
        $response = array('message' => 'Questionnaire generated successfully', 'questionnaire_id' => $questionnaireId);
        echo json_encode($response);
    } else {
        // Return an error response for invalid request method
        $response = array('message' => 'Invalid request method.');
        echo json_encode($response);
    }
}

// Call the main function
generateQuestionnaire();
