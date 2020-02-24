<?php

$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod == 'GET') {
    echo 'helloworld';
} elseif ($requestMethod == 'POST') {
    echo $_POST['name'].', 你好！';
}
