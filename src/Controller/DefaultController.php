<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class DefaultController extends AbstractController
{
    #[Route('/main', name: 'main')]
    public function index(): Response
    {
        return $this->render('quiz/index.html.twig');
    }

    #[Route('/login', name: 'login')]
    public function login(): Response
    {
        return $this->render('quiz/login.html.twig');
    }

    #[Route('/register', name: 'register')]
    public function register(): Response
    {
        return $this->render('quiz/register.html.twig');
    }

    #[Route('/dashboard/{id}', name: 'dashboard',defaults: ['id' => null], methods: ['GET','HEAD'])]
    public function dashboard($id): Response
    {
        return $this->render('quiz/dashboard.html.twig',["id" => $id]);
    }
}
