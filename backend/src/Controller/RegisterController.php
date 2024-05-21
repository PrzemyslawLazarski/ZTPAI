<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\Role;

class RegisterController extends AbstractController
{

    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = new User($entityManager);
        $user->setEmail($data['email']);
        $user->setNickname($data['nickname']);
        $user->setPassword($passwordHasher->hashPassword($user, $data['password']));

        // Sprawdź, czy istnieje rola o id 0
        $role = $entityManager->getRepository(Role::class)->findOneBy(['id' => 0]);

        // Jeśli nie istnieje, utwórz nową rolę
        if (!$role) {
            $role = new Role();
            $role->setId(0);
            $entityManager->persist($role);
            $entityManager->flush();
        }

        $user->setRole($role);

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorsString = (string) $errors;

            return new JsonResponse(['errors' => $errorsString], Response::HTTP_BAD_REQUEST);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(['message' => 'User registered successfully'], Response::HTTP_CREATED);
    }


}
