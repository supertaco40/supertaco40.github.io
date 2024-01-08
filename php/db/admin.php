<?php

function create_breed($body)
{
    $connect = pg_connect('host=localhost port=5432 dbname=cat_db user=cat_user password=catpass');
    pg_insert($connect, 'breed', $body);
    pg_close($connect);
}

function update_breed($body)
{
    $id = $body["id"];
    unset($body["id"]);

    $connect = pg_connect('host=localhost port=5432 dbname=cat_db user=cat_user password=catpass');
    pg_update($connect, 'breed', $body, array("id" => $id));
    pg_close($connect);
}

function delete_breed($body)
{
    $id = $body["id"];

    $connect = pg_connect('host=localhost port=5432 dbname=cat_db user=cat_user password=catpass');
    pg_delete($connect, 'breed', array("id" => $id));
    pg_close($connect);
}


function create_characteristic($body)
{
    $connect = pg_connect('host=localhost port=5432 dbname=cat_db user=cat_user password=catpass');
    pg_insert($connect, 'characteristic', $body);
    pg_close($connect);
}

function update_characteristic($body)
{
    $id = $body["id"];
    unset($body["id"]);

    $connect = pg_connect('host=localhost port=5432 dbname=cat_db user=cat_user password=catpass');
    pg_update($connect, 'characteristic', $body, array("id" => $id));
    pg_close($connect);
}

function delete_characteristic($body)
{
    $id = $body["id"];

    $connect = pg_connect('host=localhost port=5432 dbname=cat_db user=cat_user password=catpass');
    pg_delete($connect, 'characteristic', array("id" => $id));
    pg_close($connect);
}

function create_link($body)
{
    $connect = pg_connect('host=localhost port=5432 dbname=cat_db user=cat_user password=catpass');
    pg_insert($connect, 'breed_characteristics', $body);
    pg_close($connect);
}

function delete_link($body)
{
    $id = $body["id"];

    $connect = pg_connect('host=localhost port=5432 dbname=cat_db user=cat_user password=catpass');
    pg_delete($connect, 'breed_characteristics', array("id" => $id));
    pg_close($connect);
}
