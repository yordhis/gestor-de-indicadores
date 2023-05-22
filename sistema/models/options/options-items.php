<?php

require_once '../../includes/config.php';

$sqlItems = "SELECT * FROM items ";
$queryItems = $pdo->prepare($sqlItems);
$queryItems->execute();
$data = $queryItems->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data,JSON_UNESCAPED_UNICODE);