const quizData = [
    {
        question: "What is 9 - 3?",
        choices: ["6", "7", "8", "9"],
        correct: 0
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let selectedAnswer = null;
let score = 0;

function startQuiz() {
    document.getElementById("startScreen").classList.add("d-none");
    document.getElementById("quizContainer").classList.remove("d-none");
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    const question = quizData[currentQuestionIndex];
    const quizContent = document.getElementById("quizContent");

    selectedAnswer = null;

    quizContent.innerHTML = `
            <h2 class="mb-4">${question.question}</h2>
            <div class="row justify-content-center" id="choices">
                ${question.choices.map((choice, index) => `
                <div class="col-6 col-md-3 mb-3 d-flex justify-content-center">
                    <button class="answer-btn w-100" onclick="selectAnswer(${index})">${choice}</button>
                </div>
                `).join('')}
            </div>
            `;

}

function selectAnswer(index) {
    selectedAnswer = index;
    const buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach((btn, i) => {
        btn.classList.toggle("selected", i === index);
    });
}

function confirmAnswer() {
    if (selectedAnswer === null) {
        alert("Please select an answer.");
        return;
    }

    if (selectedAnswer === quizData[currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const quizContent = document.getElementById("quizContent");
    quizContent.innerHTML = `
            <h2>Quiz Complete!</h2>
            <p class="fs-4">You scored ${score} out of ${quizData.length}</p>
        `;
}

function goHome() {
    document.getElementById("startScreen").classList.remove("d-none");
    document.getElementById("quizContainer").classList.add("d-none");
    currentQuestionIndex = 0;
    score = 0;
}

// Optional: preload first question if needed
// loadQuestion();