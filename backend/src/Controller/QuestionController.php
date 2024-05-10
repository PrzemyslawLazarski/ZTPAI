<?php

namespace App\Controller;

use App\Entity\Question;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

#[Route('/api/questions', name: 'question_')]
class QuestionController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $questionRepository = $this->entityManager->getRepository(Question::class);
        $questions = $questionRepository->findAll();
        return $this->json($questions);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(Question $question): JsonResponse
    {
        return $this->json($question);
    }

    #[Route('/', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $question = new Question();
        $question->setQuizId($data['quiz_id']);
        $question->setQuestionText($data['question_text']);
        // Set other properties...

        $this->entityManager->persist($question);
        $this->entityManager->flush();

        return $this->json($question, Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Question $question, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $question->setQuizId($data['quiz_id']);
        $question->setQuestionText($data['question_text']);
        // Update other properties...

        $this->entityManager->flush();

        return $this->json($question);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Question $question): Response
    {
        $this->entityManager->remove($question);
        $this->entityManager->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }
}
