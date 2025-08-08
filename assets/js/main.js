const quizData = [
    {
        question: "What is 5 + 3?",
        choices: ["6", "7", "8", "9"],
        correct: 2
    },
    {
        question: "What is 6 - 4?",
        choices: ["2", "3", "4", "5"],
        correct: 0
    },
    {
        question: "What is 7 + 2?",
        choices: ["8", "9", "10", "11"],
        correct: 1
    },
    {
        question: "What is 5 + 7?",
        choices: ["10", "11", "12", "13"],
        correct: 2
    },
    {
        question: "What is 4 + 6?",
        choices: ["9", "10", "11", "12"],
        correct: 1
    },
    {
        question: "What is 5 - 3?",
        choices: ["2", "3", "4", "5"],
        correct: 0
    },
    {
        question: "What is 9 + 1?",
        choices: ["8", "9", "10", "11"],
        correct: 2
    },
    {
        question: "What is 2 + 9?",
        choices: ["9", "10", "11", "12"],
        correct: 2
    },
    {
        question: "What is 3 + 7?",
        choices: ["8", "9", "10", "11"],
        correct: 2
    },
    {
        question: "What is 3 - 2?",
        choices: ["0", "1", "2", "3"],
        correct: 1
    },
    {
        question: "What is 8 + 5?",
        choices: ["12", "13", "14", "15"],
        correct: 1
    },
    {
        question: "What is 6 - 5?",
        choices: ["0", "1", "2", "3"],
        correct: 1
    },
    {
        question: "What is 6 + 9?",
        choices: ["14", "15", "16", "17"],
        correct: 1
    },
    {
        question: "What is 11 + 3?",
        choices: ["12", "13", "14", "15"],
        correct: 2
    },
    {
        question: "What is 5 + 7?",
        choices: ["10", "11", "12", "13"],
        correct: 2
    },
    {
        question: "What is 9 - 8?",
        choices: ["0", "1", "2", "3"],
        correct: 1
    },
    {
        question: "What is 9 + 6?",
        choices: ["14", "15", "16", "17"],
        correct: 1
    },
    {
        question: "What is 13 + 5?",
        choices: ["16", "17", "18", "19"],
        correct: 2
    },
    {
        question: "What is 4 + 9?",
        choices: ["11", "12", "13", "14"],
        correct: 2
    },
    {
        question: "What is 10 + 7?",
        choices: ["15", "16", "17", "18"],
        correct: 2
    },
    {
        question: "What is 4 + 4?",
        choices: ["7", "8", "9", "10"],
        correct: 1
    },
    {
        question: "What is 2 + 2?",
        choices: ["1", "2", "3", "4"],
        correct: 3
    },
    {
        question: "What is 9 + 3?",
        choices: ["10", "11", "12", "13"],
        correct: 2
    },
    {
        question: "What is 9 - 3?",
        choices: ["6", "7", "8", "9"],
        correct: 0
    },
    {
        question: "What is 4 - 2?",
        choices: ["2", "3", "4", "5"],
        correct: 0
    }
];

// number of random questions to use each run
const NUM_QUESTIONS = 10;

let currentQuestionIndex = 0;
let selectedAnswer = null;
let score = 0;
let quizQuestions = []; // randomized subset used during a run

function startQuiz() {
    document.getElementById("startScreen").classList.add("d-none");
    document.getElementById("quizContainer").classList.remove("d-none");

    currentQuestionIndex = 0;
    score = 0;

    // Shuffle and pick N random questions
    quizQuestions = [...quizData].sort(() => Math.random() - 0.5).slice(0, NUM_QUESTIONS);

    loadQuestion();
}

function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const quizContent = document.getElementById("quizContent");
    const navigation = document.getElementById("navigation");

    // Reset selection state
    selectedAnswer = null;

    // Render question and choices as row / col-6 / col-md-3
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

    // Restore navigation buttons (home + confirm). Confirm is enabled for new question.
    navigation.innerHTML = `
        <button class="btn-home btn btn-secondary" onclick="goHome()">HOME</button>
        <button class="btn-confirm btn btn-primary ms-2" onclick="confirmAnswer()">CONFIRM</button>
    `;
}

function selectAnswer(index) {
    selectedAnswer = index;

    // Highlight selected button
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

    // Disable current confirm button (if exists) to prevent spamming
    const confirmBtn = document.querySelector(".btn-confirm");
    if (confirmBtn) confirmBtn.disabled = true;

    // Use quizQuestions (not quizData) — this fixes the wrong-answer problem
    const currentQ = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQ.correct;
    const correctText = currentQ.choices[currentQ.correct];

    // Change boy image based on correctness
    const boyImg = document.getElementById("boy-img");
    if (boyImg) boyImg.src = isCorrect ? "assets/img/correct.png" : "assets/img/wrong.png";

    // Hide navigation while feedback is shown
    const navigation = document.getElementById("navigation");
    if (navigation) navigation.innerHTML = "";

    // Show feedback
    const quizContent = document.getElementById("quizContent");
    quizContent.innerHTML = `
        <div class="text-center p-4">
            <h2 class="mb-3">${isCorrect ? "🎉 Amazing!" : "😢 Oops!"}</h2>
            <p class="fs-3">"${correctText}" is the correct answer!</p>
        </div>
    `;

    // Optional: trigger confetti if you have a launchConfetti() function
    if (isCorrect && typeof launchConfetti === "function") {
        launchConfetti();
    }

    // Delay before moving on (feedback timeout)
    setTimeout(() => {
        if (isCorrect) score++;
        currentQuestionIndex++;

        // Reset boy image to welcome (if exists)
        if (boyImg) boyImg.src = "assets/img/welcome.png";

        // Restore navigation buttons for the next question (or for results)
        if (navigation) {
            navigation.innerHTML = `
                <button class="btn-home btn btn-secondary" onclick="goHome()">HOME</button>
                <button class="btn-confirm btn btn-primary ms-2" onclick="confirmAnswer()">CONFIRM</button>
            `;
            // Re-enable the newly created confirm button
            const newConfirm = navigation.querySelector(".btn-confirm");
            if (newConfirm) newConfirm.disabled = false;
        }

        // Proceed to next question or show result
        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 2000); // <-- feedback timeout in milliseconds; change as needed
}

function showResult() {
    const quizContent = document.getElementById("quizContent");
    quizContent.innerHTML = `
            <h2>Quiz Complete!</h2>
            <p class="fs-4">You scored ${score} out of ${NUM_QUESTIONS}</p>
        `;
}

function goHome() {
    document.getElementById("startScreen").classList.remove("d-none");
    document.getElementById("quizContainer").classList.add("d-none");
    currentQuestionIndex = 0;
    score = 0;
}
