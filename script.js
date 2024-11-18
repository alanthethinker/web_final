let body = document.body;

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () =>{
    profile.classList.toggle('active');
    searchForm.classList.remove('active');
}

let searchForm = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
    sideBar.classList.toggle('active');
    body.classList.toggle('active');
}

document.querySelector('.side-bar .close-side-bar').onclick = () =>{
    sideBar.classList.remove('active');
    body.classList.remove('active');
}



window.onscroll = () => {
    profile.classList.remove('active');
    searchForm.classList.remove('active');

    if(window.innerWidth < 1200){
        sideBar.classList.remove('active');
        body.classList.remove('active');
    }


}


const questions = [
    {
        question: "What is considered unusable footage in video editing, and why should it be removed?",
        answers: [
            {text: "a) Clips with perfect lighting and sound", correct: false},
            {text: "b) Mistakes, poor-quality audio, or irrelevant content", correct: true},
            {text: "c) Scenes with dynamic movement", correct: false},
            {text: "d) Footage that is already edited", correct: false},
        ]
    },
    {
        question: "How can pacing influence the viewer's experience, and what editing techniques can be used to control the pace of a video?",
        answers: [
            {text: "a) Pacing has no impact on viewer engagement; editing techniques are irrelevant", correct: false},
            {text: "b) Pacing determines how boring the video feels; add more transitions to slow it down", correct: false},
            {text: "c) Pacing affects the rhythm and flow; use cuts to match tone and mood", correct: true},
            {text: "d) Pacing is only about fast cuts; no slow scenes are allowed", correct: false},
        ]
    },
    {
        question: "What are cutaways, and how do they contribute to the dynamics of a scene?",
        answers: [
            {text: "a) A type of transition that fades one shot into another", correct: false},
            {text: "b) Shots that break the flow of a scene for no reason", correct: false},
            {text: "c) Edits showing different people, objects, or locations to add variety or focus", correct: true},
            {text: "d) A special effect to slow down a scene", correct: false},
        ]
    },
    {
        question: "Why is it important to trim clips, and what should an editor focus on when deciding which parts to remove?",
        answers: [
            {text: "a) To keep only the essential footage that contributes to the pace, story, or atmosphere", correct: true},
            {text: "b) To add extra length to the video", correct: false},
            {text: "c) To ensure every frame of the raw footage is included", correct: false},
            {text: "d) To introduce dead space for artistic effect", correct: false},
        ]
    },
    {
         question: "What is color correction, and why is it a crucial step in video editing?",
        answers: [
            {text: "a) Adjusting the camera settings before filming", correct: false},
            {text: "b) Changing the colors to be more vibrant than real life", correct: false},
            {text: "c) Adding filters to distort the colors for a dramatic effect", correct: false},
            {text: "d) Editing brightness and contrast to make the footage look natural and visually appealing", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("a-btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    }
    

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
     if(currentQuestionIndex < questions.length){
        handleNextButton();
     }else{
        startQuiz();
     }
     }
);

startQuiz();