<?php

class Link
{
    public $id;
    public $breed_id;
    public $characteristic_id;
    public $breed_name;
    public $characteristic_name;

    function __construct(
        $id,
        $breed_id,
        $characteristic_id,
        $breed_name,
        $characteristic_name
    ) {
        $this->id = $id;
        $this->breed_id = $breed_id;
        $this->characteristic_id = $characteristic_id;
        $this->breed_name = $breed_name;
        $this->characteristic_name = $characteristic_name;
    }
}
