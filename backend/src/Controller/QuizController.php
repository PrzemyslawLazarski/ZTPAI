<?php

namespace App\Controller;

use App\Entity\Quiz;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;


#[Route('/api/quizzes', name: 'quiz_')]
class QuizController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $quizRepository = $this->entityManager->getRepository(Quiz::class);
        $quizzes = $quizRepository->findAll();
        return $this->json($quizzes);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(Quiz $quiz): JsonResponse
    {
        return $this->json($quiz);
    }

    #[Route('/', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $quiz = new Quiz();
        $quiz->setTitle($data['title']);
        $quiz->setDescription($data['description']);
        $quiz->setImage($data['image']);
        //$quiz->setIdAssignedBy($data['id_assigned_by']);
        // Set other properties...

        $this->entityManager->persist($quiz);
        $this->entityManager->flush();

        return $this->json($quiz, Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Quiz $quiz, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $quiz->setTitle($data['title']);
        $quiz->setDescription($data['description']);
        $quiz->setImage($data['image']);
        //$quiz->setIdAssignedBy($data['id_assigned_by']);
        // Update other properties...

        $this->entityManager->flush();

        return $this->json($quiz);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Quiz $quiz): Response
    {
        $this->entityManager->remove($quiz);
        $this->entityManager->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }
}
