<?php

class Characteristic
{
    public $id;
    public $name;
    public $description;
    public $metadescription;
    public $keyword;

    function __construct($id, $name, $description, $metadescription, $keyword)
    {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->metadescription = $metadescription;
        $this->keyword = $keyword;
    }
}
