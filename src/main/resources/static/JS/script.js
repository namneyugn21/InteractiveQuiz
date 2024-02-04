let currentQuestion = 0
let correctAnswer = 0
var qaList = [
    {
        question_number: "Question 1",
        question: "What is Vietnam's iconic dish?",
        answer_choice_1: "Pho",
        answer_choice_2: "Ramen",
        answer_choice_3: "Tom Yum Soup",
        answer_choice_4: "Pasta",
        answer_chosen:"",
        answer: "Pho"
    },
    {
        question_number: "Question 2",
        question: "What is the capital city of Vietnam?",
        answer_choice_1: "Ho Chi Minh City",
        answer_choice_2: "Hanoi",
        answer_choice_3: "Hue",
        answer_choice_4: "Phu Quoc",
        answer_chosen:"",
        answer: "Hanoi"
    },
    {
        question_number: "Question 3",
        question: "What is the two colours of the Vietnamese flag?",
        answer_choice_1: "Red and Blue",
        answer_choice_2: "Blue and White",
        answer_choice_3: "Red and Black",
        answer_choice_4: "Red and Yellow",
        answer_chosen:"",
        answer: "Red and Yellow",
    },
    {
        question_number: "Question 4",
        question: "How many provinces are there in Vietnam?",
        answer_choice_1: "50",
        answer_choice_2: "48",
        answer_choice_3: "15",
        answer_choice_4: "58",
        answer_chosen:"",
        answer: "58"
    },
    {
        question_number: "Question 5",
        question: "What is the most populated city in Vietnam?",
        answer_choice_1: "Ho Chi Minh City",
        answer_choice_2: "Can Tho",
        answer_choice_3: "Hanoi",
        answer_choice_4: "Hai Phong",
        answer_chosen:"",
        answer: "Ho Chi Minh City"
    }
]

// Whenever the user click on an answer button, it will glow up, and when they click on a different
// button, the newly chosen button will glow up
let answerChoices = document.querySelectorAll('.answer-choice')
answerChoices.forEach(choice => {
    choice.addEventListener('click', function(evt) {
        answerChoices.forEach(choice => {
            choice.classList.remove('click')
        })
        choice.classList.add('click')
        qaList[currentQuestion].answer_chosen = choice.textContent
        nextButton.classList.remove('next-button-disable')
        nextButton.classList.add('next-button')
    })
})

// Changing the question and answer whenever the user click next or previous
function updateQuestion() {
    document.getElementById('question-number').innerHTML = qaList[currentQuestion].question_number
    document.getElementById('question-prompt').innerHTML = qaList[currentQuestion].question
    document.getElementById('answer-choice1').innerHTML = qaList[currentQuestion].answer_choice_1
    document.getElementById('answer-choice2').innerHTML = qaList[currentQuestion].answer_choice_2
    document.getElementById('answer-choice3').innerHTML = qaList[currentQuestion].answer_choice_3
    document.getElementById('answer-choice4').innerHTML = qaList[currentQuestion].answer_choice_4

    let answerChoices = document.querySelectorAll('.answer-choice')
    if (qaList[currentQuestion].answer_chosen == "") {
        answerChoices.forEach(choice => {
            choice.classList.remove('click')
        })
        nextButton.classList.add('next-button-disable')
        nextButton.classList.remove('next-button')
        if (currentQuestion != 0) {
            previousButton.classList.add('previous-button')
            previousButton.classList.remove('previous-button-disable')
        }
    } else { 
        answerChoices.forEach(choice => {
            choice.classList.remove('click')
            if (choice.innerHTML == qaList[currentQuestion].answer_chosen) {
                choice.classList.add('click');
            }
        })
        nextButton.classList.remove('next-button-disable')
        nextButton.classList.add('next-button')
        if (currentQuestion != 0) {
            previousButton.classList.add('previous-button')
            previousButton.classList.remove('previous-button-disable')
        } else {
            previousButton.classList.remove('previous-button')
            previousButton.classList.add('previous-button-disable')
        }
    }
}

// Calculate the correct answer
function calculateResult() {
    for (var i = 0; i < 5; i++) {
        if (qaList[i].answer_chosen == qaList[i].answer) {
            correctAnswer++
        }
    }
}
// Highlight correct and incorrect answer
// Show the result to the user when they finsihed the quiz
function showResult() {
    calculateResult()
    let questionContainer = document.querySelector('.question')
    questionContainer.classList.add('question-hidden')

    let resultContainer = document.querySelector('.result-hidden')
    resultContainer.classList.remove('result-hidden')
    resultContainer.classList.add('result')

    let score = document.getElementById('user-score')
    score.innerText = correctAnswer

    // Highlight the correct and incorrect answer
    for (var i = 0; i < 5; i++) {
        let resultButtonsElement = document.querySelectorAll('.result-buttons')[i];
        let children = resultButtonsElement.children;
        for (var j = 0; j < children.length; j++) {
            if (children[j].innerText == qaList[i].answer) {
                children[j].classList.add('result-choice-correct')
            } else if (children[j].innerText != qaList[i].answer && children[j].innerText == qaList[i].answer_chosen) {
                children[j].classList.add('result-choice-incorrect')
            }
        }
    }
}

// Either go to the next question or submit the whole quiz when currentQuestion is 5
let nextButton = document.querySelector('.next-button-disable')
nextButton.addEventListener("click", function(evt) {
    if (currentQuestion == 4) {
        showResult()
    } else {
        if (qaList[currentQuestion].answer_chosen != "") {
            currentQuestion++
            updateQuestion()
        }
    }
})

// Either go to the previous question or send console error message if the currentQuestion is -1
let previousButton = document.querySelector('.previous-button-disable')
previousButton.addEventListener("click", function(evt) {
    if (currentQuestion > 0) {
        currentQuestion--
        updateQuestion()
    }
})

