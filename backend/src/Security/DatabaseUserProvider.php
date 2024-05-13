<?php

namespace App\Security;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class DatabaseUserProvider implements UserProviderInterface
{
        private EntityManagerInterface $entityManager;

        public function __construct(EntityManagerInterface $entityManager)
        {
        $this->entityManager = $entityManager;
    }

    public function loadUserByUsername(string $username): UserInterface
    {
    // Pobieranie użytkownika z bazy danych na podstawie adresu email
    $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $username]);

    if (!$user) {
    throw new UserNotFoundException(sprintf('User with email "%s" not found.', $username));
    }

    return $user;
    }

    public function refreshUser(UserInterface $user): UserInterface
    {
    // Metoda do odświeżania użytkownika po zalogowaniu
    if (!$user instanceof User) {
    throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', get_class($user)));
    }

    return $this->loadUserByUsername($user->getEmail());
    }

    public function supportsClass(string $class): bool
    {
    // Sprawdza, czy dostawca obsługuje daną klasę użytkownika
    return User::class === $class;
    }

    public function loadUserByIdentifier(string $identifier): UserInterface
    {
        // Pobieranie użytkownika z bazy danych na podstawie dowolnego identyfikatora
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $identifier]);

        if (!$user) {
            throw new UserNotFoundException(sprintf('User with identifier "%s" not found.', $identifier));
        }

        return $user;
    }

}

