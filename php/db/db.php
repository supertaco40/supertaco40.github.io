<?php
require '../db/model/characteristic.php';
require '../db/model/breed.php';
require '../db/model/link.php';


function get_all_links()
{
    $connect = pg_connect('host=localhost port=5432 dbname=cat_db user=cat_user password=catpass');
    $result = pg_query(
        $connect,
        'SELECT 
            Breed_Characteristics.id,
            Breed_Characteristics.breedId,
            Breed_Characteristics.characteristicId,
            Breed.name,
            Characteristic.name
        FROM Breed_Characteristics
        LEFT JOIN Breed ON Breed.id = Breed_Characteristics.breedId
        LEFT JOIN Characteristic ON Characteristic.id = Breed_Characteristics.characteristicId;'
    );
    $array = array();
    while ($row = pg_fetch_row($result)) {
        $entry = new Link($row[0], $row[1], $row[2], $row[3], $row[4]);
        $array[] = $entry;
    }
    pg_close($connect);
    return $array;
}

function get_all_breeds()
{
    $connect = pg_connect('host=localhost port=5432 dbname=cat_db user=cat_user password=catpass');
    $result = pg_query(
        $connect,
        'SELECT 
            Breed.id,
            Breed.name,
            Breed.description
        FROM Breed;'
    );
    $array = array();
    while ($row = pg_fetch_row($result)) {
        $entry = new Breed($row[0], $row[1], $row[2]);
        $array[] = $entry;
    }
    pg_close($connect);
    return $array;
}

function get_all_characteristics()
{
    $connect = pg_connect('host=localhost port=5432 dbname=cat_db user=cat_user password=catpass');
    $result = pg_query(
        $connect,
        'SELECT 
            Characteristic.id,
            Characteristic.name,
            Characteristic.description
        FROM Characteristic;'
    );
    $array = array();
    while ($row = pg_fetch_row($result)) {
        $entry = new Characteristic($row[0], $row[1], $row[2]);
        $array[] = $entry;
    }
    pg_close($connect);
    return $array;
}

function get_characteristics($id)
{
    $connect = pg_connect('host=localhost port=5432 dbname=cat_db user=cat_user password=catpass');
    $result = pg_query(
        $connect,
        "SELECT 
            Characteristic.id,
            Characteristic.name,
            Characteristic.description
        FROM Characteristic 
        JOIN Breed_Characteristics ON Breed_Characteristics.characteristicId=Characteristic.id
        WHERE Breed_Characteristics.breedId=$id;"
    );
    $array = array();
    while ($row = pg_fetch_row($result)) {
        $entry = new Characteristic($row[0], $row[1], $row[2]);
        $array[] = $entry;
    }
    pg_close($connect);
    return $array;
}

function get_breeds($id)
{
    $connect = pg_connect('host=localhost port=5432 dbname=cat_db user=cat_user password=catpass');
    $result = pg_query(
        $connect,
        "SELECT 
            Breed.id,
            Breed.name,
            Breed.description
        FROM Breed 
        JOIN Breed_Characteristics ON Breed_Characteristics.breedId=Breed.id
        WHERE Breed_Characteristics.characteristicId=$id;"
    );
    $array = array();
    while ($row = pg_fetch_row($result)) {
        $entry = new Breed($row[0], $row[1], $row[2]);
        $array[] = $entry;
    }
    pg_close($connect);
    return $array;
}
