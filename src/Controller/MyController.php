<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;


#[AsController]
class MyController
{
    #[Route('/register', name: 'register')]
    public function register(): Response
    {
        return $this->render('quiz/register.html.twig');
    }
}