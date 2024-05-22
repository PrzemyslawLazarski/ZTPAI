<?php

// src/Controller/RegisterController.php
namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Role;
class RegisterController extends AbstractController
{
    #[Route('/api/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $nickname = $data['nickname'];
        $email = $data['email'];
        $password = $data['password'];

        // Check if user with the same email already exists
        $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
        if ($existingUser) {
            return new JsonResponse(['success' => false, 'message' => 'Email already in use'], Response::HTTP_CONFLICT);
        }

        // Create new User entity
        $user = new User($entityManager);

        $user->setNickname($nickname);
        $user->setEmail($email);

        // Hash the password and set it to the user entity
        $hashedPassword = $passwordHasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);
        $role = $entityManager->getRepository(Role::class)->findOneBy(['id' => 0]);

        // Jeśli nie istnieje, utwórz nową rolę
        if (!$role) {
            $role = new Role();
            $role->setId(0);
            $entityManager->persist($role);
            $entityManager->flush();
        }

        $user->setRole($role);

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(['success' => true, 'user' => [
            'id' => $user->getId(),
            'nickname' => $user->getNickname(),
            'email' => $user->getEmail(),
        ]], Response::HTTP_CREATED);
    }
}
