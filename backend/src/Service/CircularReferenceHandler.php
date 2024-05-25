<?php
// src/Service/CircularReferenceHandler.php

namespace App\Service;

use App\Entity\Quiz;

class CircularReferenceHandler
{
    public function __invoke($object)
    {
        if ($object instanceof Quiz) {
            return $object->getId();
        }

        return null;
    }
}
