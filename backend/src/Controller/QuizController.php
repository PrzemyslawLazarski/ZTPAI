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
use App\Entity\Answer;

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
        $questions = $quiz->getQuestions();
        $questionsData = [];

        foreach ($questions as $question) {
            $answers = $question->getAnswers();
            $answersData = [];

            foreach ($answers as $answer) {
                $answersData[] = [
                    'id' => $answer->getId(),
                    'text' => $answer->getAnswerText(),
                    'isCorrect' => $answer->getIsCorrect(),
                ];
            }

            $questionsData[] = [
                'id' => $question->getId(),
                'question_text' => $question->getQuestionText(),
                'answers' => $answersData,
            ];
        }

        $quizData = [
            'id' => $quiz->getId(),
            'title' => $quiz->getTitle(),
            'description' => $quiz->getDescription(),
            'image' => $quiz->getImage(),
            'questions' => $questionsData,
        ];

        return $this->json($quizData, 200, [], [
            'groups' => 'quiz:read',
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Quiz $quiz): JsonResponse
    {
        $this->entityManager->remove($quiz);
        $this->entityManager->flush();


        return new JsonResponse(['message' => 'Quiz deleted successfully'], Response::HTTP_OK);
    }

    /*
     * #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Question $question): Response
    {
        $this->entityManager->remove($question);
        $this->entityManager->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }
     *
     */
    #[Route('/', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $title = $data['title'];
        $description = $data['description'];
        $imageBase64 = $data['image'];
        $questionsData = $data['questions'];

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

        $this->entityManager->persist($quiz);

        foreach ($questionsData as $questionData) {
            $questionText = $questionData['text'];
            $answersData = $questionData['answers'];

            $question = new Question();
            $question->setQuestionText($questionText);
            $question->setQuiz($quiz);

            $this->entityManager->persist($question);

            foreach ($answersData as $answerData) {
                $answerText = $answerData['text'];
                $isCorrect = $answerData['isCorrect'];

                $answer = new Answer();
                $answer->setAnswerText($answerText);
                $answer->setIsCorrect($isCorrect);
                $answer->setQuestion($question);

                $this->entityManager->persist($answer);
            }
        }


        $this->entityManager->flush();

        return $this->json($quiz, Response::HTTP_CREATED, [], [
            'groups' => 'quiz:read',
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
    }

    #[Route('/api/quizzes/{id}/questions', name: 'quiz_questions', methods: ['GET'])]
    public function getQuizQuestions(Quiz $quiz): JsonResponse
    {
        $questions = $quiz->getQuestions();

        $data = [];
        foreach ($questions as $question) {
            $answers = $question->getAnswers()->map(function($answer) {
                return [
                    'id' => $answer->getId(),
                    'answer_text' => $answer->getAnswerText(),
                    'is_correct' => $answer->getIsCorrect()
                ];
            });

            $data[] = [
                'id' => $question->getId(),
                'question_text' => $question->getQuestionText(),
                'answers' => $answers
            ];
        }

        return $this->json($data, 200, [], [
            'groups' => ['quiz:read', 'question:read', 'answer:read']
        ]);
    }


}
