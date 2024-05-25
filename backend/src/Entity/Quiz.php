<?php

namespace App\Entity;

use App\Repository\QuizRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
class Quiz
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['quiz:read', 'quiz:write'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['quiz:read', 'quiz:write'])]
    private $title;

    #[ORM\Column(type: 'text')]
    #[Groups(['quiz:read', 'quiz:write'])]
    private $description;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['quiz:read', 'quiz:write'])]
    private $image;

    #[ORM\OneToMany(targetEntity: Question::class, mappedBy: 'quiz', cascade: ['persist', 'remove'])]
    #[Groups(['quiz:read'])]
    private $questions;

    public function __construct()
    {
        $this->questions = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }


    /**
     * @return Collection<int, Question>
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): static
    {
        if (!$this->questions->contains($question)) {
            $this->questions->add($question);
            $question->setQuiz($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): static
    {
        if ($this->questions->removeElement($question)) {
            if ($question->getQuiz() === $this) {
                $question->setQuiz(null);
            }
        }

        return $this;
    }
}
