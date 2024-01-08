<?php

require '../http/respond.php';
require '../utils/getBody.php';
require '../utils/authenticate.php';

$body = getRequestBody();
if (!authenticate($body)) {
    send_response('Not found', 404);
} else {
    send_response('OK', 200);
}
