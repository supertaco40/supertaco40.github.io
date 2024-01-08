<?php

require '../http/respond.php';
require '../db/db.php';

$breeds = get_all_breeds();

send_response($breeds);
