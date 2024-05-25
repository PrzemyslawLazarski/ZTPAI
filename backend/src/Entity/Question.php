<?php

namespace App\Entity;

use App\Repository\QuestionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
class Question
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['quiz:read', 'question:read', 'question:write'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['quiz:read', 'question:read', 'question:write'])]
    private ?string $question_text;

    #[ORM\ManyToOne(targetEntity: Quiz::class, inversedBy: 'questions')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['question:read', 'question:write'])]
    private ?Quiz $quiz;

    #[ORM\OneToMany(targetEntity: Answer::class, mappedBy: 'question')]
    private Collection $answers;

    public function __construct()
    {
        $this->answers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestionText(): ?string
    {
        return $this->question_text;
    }

    public function setQuestionText(string $question_text): static
    {
        $this->question_text = $question_text;

        return $this;
    }

    public function getQuiz(): ?Quiz
    {
        return $this->quiz;
    }

    public function setQuiz(?Quiz $quiz): static
    {
        $this->quiz = $quiz;

        return $this;
    }
}
