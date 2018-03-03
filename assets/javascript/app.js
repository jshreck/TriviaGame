var questionOptions = [
    {
        question: "This is question 1",
        answerChoices: ["answerA", "answerB", "answerC", "answerD"],
        correctAnswer: "answerA"
    },

    {
        question: "This is question 2",
        answerChoices: ["answerA", "answerB", "answerC", "answerD"],
        correctAnswer: "answerB"
    },

    {
        question: "This is question 3",
        answerChoices: ["answerA", "answerB", "answerC", "answerD"],
        correctAnswer: "answerC"
    }
];

var numberCorrect = 0;
var gameQuestions = [];
var questionIndex = 0;
var questionTimer = {
    timerDuration: 30,
    timeLeft: 30,
    countdown: function () {
        if (questionTimer.timeLeft===0){
            questionTimer.stop();
            outOfTime();
        }
        else {
        questionTimer.timeLeft--;
        $(".progress-bar").css("width", (questionTimer.timeLeft/questionTimer.timerDuration * 100) + "%").html(questionTimer.timeLeft);
        }
    },
    start: function () {
        questionTimer.timeLeft = questionTimer.timerDuration;
        timer = setInterval(questionTimer.countdown, 1000);
    },
    stop: function () {
        clearInterval(timer);
    }
}

//SHOULD THIS BE PART OF OBJECT?
function outOfTime () {
    console.log("Out of time!");
    nextQuestion();
}

//Pick random questions used for game
for (i = 0; i < 2; i++) {
    var index = Math.floor(Math.random() * questionOptions.length);
    var question = questionOptions[index];
    gameQuestions.push(question);
    questionOptions.splice(index, 1);
}

//Prep for nextQuestion
function nextQuestion() {
    questionIndex++;
    setTimeout(function () {
        $(".well").removeClass("answerChoice");
        display();
    }, 2000);
}

//display questions and answer choices
function display() {
    $(".progress-bar").css("width", "100%");
    questionTimer.start();
    if (questionIndex < gameQuestions.length) {
    $("#question-number").html("Question " + (questionIndex+1));    
    $("#question").html(gameQuestions[questionIndex].question);
        var answerChoiceCounter = 0;
        $(".well").each(function () {
            $(this).html(gameQuestions[questionIndex].answerChoices[answerChoiceCounter]);
            answerChoiceCounter++;
        });
    }
    else {
        console.log("GAME OVER");
        questionTimer.stop();
        //DISPLAY FINAL SCREEN
    }
}

// function to check game status to see if @ end, check before displaying if not then display and if so then "final screen"
//play again function? either refresh page or restore original questions options array and pick new questions + reset score


//===========================================================================
display();
$("#total-questions").html(gameQuestions.length);

//When answer is chosen, check to see if it's right, then go to the next question
$(".well").on("click", function () {
    questionTimer.stop();
    $(this).addClass("answerChoice");
    var answerPicked = $(this).html();
    if (answerPicked === gameQuestions[questionIndex].correctAnswer) {
        numberCorrect++; 
        $("#numberCorrect").html(numberCorrect);  
        console.log("right answer");
    }
    else {
        console.log("wrong answer");
    }
    nextQuestion();
});



