<?php

require '../http/respond.php';
require '../db/db.php';

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$characteristics = get_all_links();

send_response($characteristics);
