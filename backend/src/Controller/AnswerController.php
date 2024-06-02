<?php

namespace App\Controller;

use App\Entity\Answer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

#[Route('/api/answers', name: 'answer_')]
class AnswerController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $answerRepository = $this->entityManager->getRepository(Answer::class);
        $answers = $answerRepository->findAll();
        return $this->json($answers);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(Answer $answer): JsonResponse
    {
        return $this->json($answer);
    }

    #[Route('/', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $answer = new Answer();
        $answer->setAnswerText($data['answer_text']);

        $this->entityManager->persist($answer);
        $this->entityManager->flush();

        return $this->json($answer, Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Answer $answer, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $answer->setAnswerText($data['answer_text']);
        $this->entityManager->flush();

        return $this->json($answer);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Answer $answer): Response
    {
        $this->entityManager->remove($answer);
        $this->entityManager->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }
}
