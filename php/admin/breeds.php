<?php

require '../utils/authenticate.php';
require '../utils/getBody.php';
require '../db/admin.php';
require '../http/respond.php';

$body = getRequestBody();

if (!authenticate($body)) {
    send_response('Unauthorized', 401);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    create_breed($body);
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    update_breed($body);
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    delete_breed($body);
}

send_response('OK', 200);
