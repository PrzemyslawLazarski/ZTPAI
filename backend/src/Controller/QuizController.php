<?php

namespace App\Controller;

use App\Entity\Quiz;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Question;
use Doctrine\Persistence\ManagerRegistry as PersistenceManagerRegistry;

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

        return $this->json($quizzes, 200, [], [
            'groups' => 'quiz:read',
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(Quiz $quiz): JsonResponse
    {
        return $this->json($quiz, 200, [], [
            'groups' => 'quiz:read',
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
    }

    #[Route('/', name: 'create', methods: ['POST'])]
    public function create(Request $request, PersistenceManagerRegistry $doctrine): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $title = $data['title'];
        $description = $data['description'];
        $imageBase64 = $data['image'];
        $questionsData = $data['questions']; // Pobierz dane pytań

        if ($imageBase64) {
            $imageParts = explode(";base64,", $imageBase64);
            $imageData = base64_decode($imageParts[1]);
            $filename = $data['filename'];

            $sanitizedFilename = preg_replace('/[^a-zA-Z0-9\-\._]/', '_', $filename);
            $fullImagePath = $this->getParameter('photos_directory') . '/' . $sanitizedFilename;

            $directoryPath = dirname($fullImagePath);
            if (!is_dir($directoryPath)) {
                mkdir($directoryPath, 0755, true);
            }

            file_put_contents($fullImagePath, $imageData);
        } else {
            return $this->json(['error' => 'Invalid image file'], Response::HTTP_BAD_REQUEST);
        }

        $quiz = new Quiz();
        $quiz->setTitle($title);
        $quiz->setDescription($description);
        $quiz->setImage($sanitizedFilename);

// Zapisz quiz
        $this->entityManager->persist($quiz);
        $this->entityManager->flush();

// Dodaj pytania do quizu
        foreach ($questionsData as $questionText) {
            $question = new Question();
            $question->setQuestionText($questionText);
            $question->setQuiz($quiz);
            $this->entityManager->persist($question);
        }
        $this->entityManager->flush();


        return $this->json($quiz, Response::HTTP_CREATED, [], [
            'groups' => 'quiz:read',
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Quiz $quiz, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $title = $data['title'];
        $description = $data['description'];
        $imageBase64 = $data['image'];

        if ($imageBase64) {
            $imageData = explode(',', $imageBase64)[1];
            $imagePath = uniqid() . '.png';
            $fullImagePath = $this->getParameter('photos_directory') . '/' . $imagePath;

            // Create directory if it doesn't exist
            $directoryPath = dirname($fullImagePath);
            if (!is_dir($directoryPath)) {
                mkdir($directoryPath, 0755, true);
            }

            file_put_contents($fullImagePath, base64_decode($imageData));
        } else {
            return $this->json(['error' => 'Invalid image file'], Response::HTTP_BAD_REQUEST);
        }

        $quiz->setTitle($title);
        $quiz->setDescription($description);
        $quiz->setImage('img/' . $imagePath);

        $this->entityManager->flush();


        return $this->json($quiz, 200, [], [
            'groups' => 'quiz:read',
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Quiz $quiz): Response
    {
        $this->entityManager->remove($quiz);
        $this->entityManager->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/{id}/questions', name: 'add_question', methods: ['POST'])]
    public function addQuestion(int $id, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $questionText = $data['question_text'];

        $quiz = $this->entityManager->getRepository(Quiz::class)->find($id);

        if (!$quiz) {
            return $this->json(['error' => 'Quiz not found'], Response::HTTP_NOT_FOUND);
        }

        $question = new Question();
        $question->setQuestionText($questionText);
        $question->setQuiz($quiz);

        $this->entityManager->persist($question);
        $this->entityManager->flush();


        return $this->json($question, Response::HTTP_CREATED, [], [
            'groups' => 'question:read',
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
    }
}
