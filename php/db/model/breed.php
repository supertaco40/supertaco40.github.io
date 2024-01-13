<?php

class Breed
{
    public $id;
    public $name;
    public $description;
    public $metadescription;

    function __construct($id, $name, $description, $metadescription, $keyword)
    {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->metadescription = $metadescription;
        $this->$keyword = $keyword;
    }
}
