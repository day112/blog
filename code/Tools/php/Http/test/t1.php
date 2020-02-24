<?php

require '../lib/Http.class.php';

$http = new Http();

echo $http->setParams(['name'=>'张三'])->post('http://demo.com/test/t2.php');

echo $http->get('http://demo.com/test/t2.php');

$http->close();
