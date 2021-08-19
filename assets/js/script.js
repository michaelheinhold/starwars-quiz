//Question arrays
var myQuestions = [
    {
        question: "Who is the Chosen One?",
        choices: [
            "Luke Skywalker",
            "Obi-wan Kenobi",
            "Yoda",
            "Anakin Skywalker"
        ],
        answer: "Anakin Skywalker"
    },
    {
        question: "What is the name of Boba Fett's ship?",
        choices: [
            "Slave I",
            "Razor Crest",
            "Millenium Falcon",
            "Soulless One"
        ],
        answer: "Slave I"
    },
    {
        question: "Who was the Jedi Master that ordered the creation of the clone army?",
        choices: [
            "Yoda",
            "Obi-Wan Kenobi",
            "Kit Fisto",
            "Syfo Dyas"
        ],
        answer: "Syfo Dyas"
    },
    {
        question: "What is the substance that powers lightsabers?",
        choices: [
            "The Force",
            "Heat",
            "Kyber Crystals",
            "Hope"
        ],
        answer: "Kyber Crystals"
    },
    {
        question: "What is the name of the main character in 'The Mandalorian?'",
        choices: [
            "Owen Candroon",
            "Dahar Vitaan",
            "Din Djarin",
            "Moff Gideon"
        ],
        answer: "Din Djarin"
    },
];

//timer vars
var timerEl = document.querySelector(".timer");
var timeLeft = myQuestions.length * 20;
var timerCountdown;
// myQuestions.length * 20

//vars for elements on page
var startBtn = document.querySelector("#btn-start");
var startScreen = document.querySelector("#start-screen");
var questionScreen =document.querySelector("#questions");
var endScreen =document.querySelector("#end-screen");
var questionTitle =document.querySelector(".question-title");
var optionsDivEl =document.querySelector(".choices");
var scoreDisplay =document.querySelector(".final-score");
var scoreForm =document.querySelector("#hiscore-form");

//other vars
var selectedQuestion = 0;
var score = 0;

//start quiz
var quizStart = function(){
    //hide the start screen
    startScreen.setAttribute("class", "hide");

    //display questions
    questionScreen.removeAttribute("class");

    timerEl.textContent=timeLeft;

    timerCountdown = setInterval(timerFunc, 1000);

    getQuestion();
}

//gets question from myQuestions array
var getQuestion =function(){
    var currentQuestion= myQuestions[selectedQuestion];
    //clear previous questions
    questionTitle.innerText= "";
    optionsDivEl.innerHTML="";

    if(!currentQuestion){
        endQuiz();
        return;
    }

    questionTitle.innerText = currentQuestion.question;

    

    //variable for choices
    var questionOptions = currentQuestion.choices;
    //for loop for each of the item choices
    questionOptions.forEach(function(option) {
        //creates button for each element
        var optionButton = document.createElement("button");
        optionButton.setAttribute("class", "option");
        optionButton.setAttribute("value", option);
        //sets the text of the button to be the selected option
        optionButton.innerText =option;
        //adds to the div
        optionsDivEl.appendChild(optionButton);
    });

    //increase to next question
    selectedQuestion++;

}

//determines if correct answer was clicked or not
var choiceSelected = function(event){
    var currentQuestion= myQuestions[selectedQuestion-1];

    //gets target element
    var targetEl = event.target;
    if(targetEl.matches(".option")){
        console.log(targetEl);
        if(targetEl.value !== currentQuestion.answer){
            console.log("wrong");
            timeLeft-=20
            getQuestion(); 
        } else{
            console.log("correct!");
            score +=10;
            getQuestion();
        }
    }

}

//end quiz
var endQuiz = function(){
    //ends timer and sets time left as score
    clearInterval(timerCountdown);
    timerEl.textContent=timeLeft;
    score += timeLeft;
    console.log(score);

    console.log("end of game")
    //hide questions
    questionScreen.setAttribute("class", "hide");

    //display end screen
    endScreen.removeAttribute("class");

    scoreDisplay.textContent="Your score is: "+score+"!";
}

//timer
var timerFunc =function(){
    timeLeft--;
    timerEl.textContent=timeLeft

    if(timeLeft===0){
        endQuiz();

    }
};

//save hiscores to local storage
var saveScore = function(event){
    //stops from refreshing
    event.preventDefault();

    //collects form data
    var userInitials = document.querySelector("input[name='user-initials']").value;
    //makes sure user inputs accurate data less than 3 digits
    if(!userInitials || userInitials.length>3){
        alert("Please enter initials 3 or less characters");
        return;
    }

    //sets up hiscore as an array or whatever it was before
    var hiscore = JSON.parse(localStorage.getItem("hiscore")) || [];

    //creates a new object to store in the array
    var newHiscore = {
        player: userInitials,
        score: score
    };

    //adds new score to the hiscores array
    hiscore.push(newHiscore);
    //saves to local storage
    localStorage.setItem("hiscore", JSON.stringify(hiscore));
    scoreForm.reset();
    window.location.replace("./hiscores.html");
}

//event listeners
startBtn.addEventListener("click", quizStart);
questionScreen.addEventListener("click", choiceSelected);
scoreForm.addEventListener("submit", saveScore);
