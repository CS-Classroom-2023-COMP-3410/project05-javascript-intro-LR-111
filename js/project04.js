document.addEventListener('DOMContentLoaded', () => {
    const questions = [
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2,
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1,
      },
      {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3,
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
        correct: 0,
      },
    ];
  
    let currentQuestionIndex = 0;
    let userAnswers = Array(questions.length).fill(null);
  
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const scoreSection = document.getElementById("score-section");
    const scoreElement = document.getElementById("score");
    const reviewButton = document.getElementById("review");
    const reviewSection = document.getElementById("review-section");
    const reviewContainer = document.getElementById("review-container");
    const restartButtons = document.querySelectorAll("#restart, #restart-from-review");
  
    // Load a question and its options
    function loadQuestion(index) {
      const question = questions[index];
      questionElement.textContent = question.question;
      optionsElement.innerHTML = "";
  
      question.options.forEach((option, i) => {
        const li = document.createElement("li");
        li.textContent = option;
  
        // Highlight if the user has already selected this answer
        if (userAnswers[index] === i) {
          li.classList.add("selected");
        }
  
        li.addEventListener("click", () => {
          userAnswers[index] = i; // Record user's answer
          updateOptions();
        });
  
        optionsElement.appendChild(li);
      });
  
      updateNavigationButtons();
    }
  
    // Update option styles to highlight the selected answer
    function updateOptions() {
      const options = optionsElement.querySelectorAll("li");
      options.forEach((option, i) => {
        if (userAnswers[currentQuestionIndex] === i) {
          option.classList.add("selected");
        } else {
          option.classList.remove("selected");
        }
      });
    }
  
    // Enable/disable navigation buttons based on the current question index
    function updateNavigationButtons() {
      prevButton.disabled = currentQuestionIndex === 0;
      nextButton.textContent =
        currentQuestionIndex === questions.length - 1 ? "Submit" : "Next";
    }
  
    // Calculate the user's score based on their answers
    function calculateScore() {
      return userAnswers.filter(
        (answer, i) => answer === questions[i].correct
      ).length;
    }
  
    // Show the quiz summary and the user's score
    function showSummary() {
      const score = calculateScore();
      scoreElement.textContent = `You scored ${score} out of ${questions.length}`;
      scoreSection.style.display = "block";
      document.getElementById("question-section").style.display = "none";
      document.getElementById("navigation").style.display = "none";
    }
  
    // Show the review section with user's answers and correct answers
    function showReview() {
      scoreSection.style.display = "none";
      reviewSection.style.display = "block";
      reviewContainer.innerHTML = "";
  
      questions.forEach((question, i) => {
        const questionDiv = document.createElement("div");
        questionDiv.innerHTML = `
          <h3>${i + 1}. ${question.question}</h3>
          <p><strong>Your answer:</strong> ${
            question.options[userAnswers[i]] || "No answer"
          }</p>
          <p><strong>Correct answer:</strong> ${
            question.options[question.correct]
          }</p>
        `;
        reviewContainer.appendChild(questionDiv);
      });
    }
  
    // Restart the quiz and reset all variables
    function restartQuiz() {
      currentQuestionIndex = 0;
      userAnswers = Array(questions.length).fill(null);
      scoreSection.style.display = "none";
      reviewSection.style.display = "none";
      document.getElementById("question-section").style.display = "block";
      document.getElementById("navigation").style.display = "flex";
      loadQuestion(currentQuestionIndex);
    }
  
    // Event listeners for navigation and restart buttons
    prevButton.addEventListener("click", () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
      }
    });
  
    nextButton.addEventListener("click", () => {
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
      } else {
        showSummary();
      }
    });
  
    reviewButton.addEventListener("click", showReview);
    restartButtons.forEach((btn) => btn.addEventListener("click", restartQuiz));
  
    // Load the first question initially
    loadQuestion(currentQuestionIndex);
  });
  