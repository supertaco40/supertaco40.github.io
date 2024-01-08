<?php

require '../http/respond.php';
require '../db/db.php';

$id = $_GET["id"];
$breeds = get_breeds($id);

send_response($breeds);
