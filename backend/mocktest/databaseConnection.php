<?php

function getDBConnection() {
    $host = 'localhost';
    $port = '3306';
    $dbname = 'mocktestdb';
    $username = 'root';
    $password = '';

    try {
        $conn = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $e) {
        throw new Exception('Database connection error: ' . $e->getMessage());
    }
}