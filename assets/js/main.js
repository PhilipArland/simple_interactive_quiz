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

    // Disable the confirm button to prevent spamming
    document.querySelector(".btn-confirm").disabled = true;

    const isCorrect = selectedAnswer === quizData[currentQuestionIndex].correct;
    const correctText = quizData[currentQuestionIndex].choices[quizData[currentQuestionIndex].correct];

    // Change boy image based on correctness
    const boyImg = document.getElementById("boy-img");
    boyImg.src = isCorrect ? "assets/img/correct.png" : "assets/img/wrong.png";

    const navigation = document.getElementById("navigation");
    navigation.innerHTML = ``

    // Show feedback
    const quizContent = document.getElementById("quizContent");
    quizContent.innerHTML = `
        <div class="text-center p-4">
            <h2 class="mb-3">${isCorrect ? "🎉 Amazing!" : "😢 Oops!"}</h2>
            <p class="fs-3">"${correctText}" is the correct answer!</p>
        </div>
    `;

    // Delay before loading next question
    setTimeout(() => {
        if (isCorrect) score++;
        currentQuestionIndex++;

        const navigation = document.getElementById("navigation");
        navigation.innerHTML = `
            <button class="btn-home" onclick="goHome()">HOME</button>
            <button class="btn-confirm" onclick="confirmAnswer()">CONFIRM</button>`

        // Reset boy image back to welcome.png
        boyImg.src = "assets/img/welcome.png";


        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }

        // Re-enable confirm button for the next question
        document.querySelector(".btn-confirm").disabled = false;
    }, 2000);
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
