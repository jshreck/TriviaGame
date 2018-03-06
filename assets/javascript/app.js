var numberCorrect = 0; //tracking score
var gameQuestions = []; //array of the questions randomly selected from questionOptions
var questionIndex = 0;  
// questions and answers to choose from
var questionOptions = [
    {
        question: "In Tangled, what is the name of Rapunzel's chameleon?",
        answerChoices: ["Maximus","Pascal","Rainbow","Spot"],
        correctAnswer: "Pascal"
    },

    {
        question: "In Frozen, how many brother does Hanz have?",
        answerChoices: ["8","4","12","13"],
        correctAnswer: "12"
    },

    {
        question: "Which of the following is not a name of one of the fairies in Sleeping Beauty?",
        answerChoices: ["Flora","Fauna","Merryweather","Verdure"],
        correctAnswer: "Verdure"
    },
    {
        question: "In A Bug's Life, what is the name of the group of girls that Dot belongs to?",
        answerChoices: ["The Blueberries","The Girl Scouts","The Ant Scouts","The Seedlings"],
        correctAnswer: "The Blueberries"
    },

    {
        question: "What color is Cinderella's original dress (the one ripped apart by her stepsisters)?",
        answerChoices: ["blue","pink","purple","green"],
        correctAnswer: "pink"
    },

    {
        question: "What alias does Aladdin use to fool the sultan into thinking he was a prince?",
        answerChoices: ["Prince Abu","Prince Ali","Prince Razoul","Prince Farouk"],
        correctAnswer: "Prince Ali"
    },
    {
        question: "In Brave, what is Merida skilled in?",
        answerChoices: ["baking","stone throwing","knitting","archery"],
        correctAnswer: "archery"
    },

    {
        question: "In Alice in Wonderland, what occasion was being celebrated at The Mad Tea Party?",
        answerChoices: ["tea time","a birthday","an unbirthday","the arrival of summer"],
        correctAnswer: "an unbirthday"
    },

    {
        question: "What was the name of Bambi's skunk friend?",
        answerChoices: ["Rose","Flower","Stinker","Oreo"],
        correctAnswer: "Flower"
    },
    {
        question: "What country is the movie Beauty in the Beast set in?",
        answerChoices: ["France","Italy","Spain","Canada"],
        correctAnswer: "France"
    }
];
//setting up timer
var questionTimer = {
    timerDuration: 5, //set timer duration here
    timeLeft: this.timerDuration, //using this to countdown
    countdown: function () {
        if (questionTimer.timeLeft===0){
            questionTimer.stop();
            questionTimer.outOfTime();
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
    },
    outOfTime: function () {
    $("#answer-options").append('<div class="message">');
    $(".message").height($("#answer-options").height());
    $(".message").html("Out of time! The correct answer was " + gameQuestions[questionIndex].correctAnswer + " .");
        nextQuestion();
    }
}

//Prep for nextQuestion
function nextQuestion() {
    questionIndex++;
    setTimeout(function () {
        $(".well").removeClass("answerChoice");
        $(".message").remove();
        display();
    }, 2000);
}
//display questions and answer choices
function display() {
    // $(".progress-bar").css("width", "100%");
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
        $(".well").addClass("disabled");
        questionTimer.stop();
        console.log("GAME OVER");
        $(".container").append('<div class="game-over">');
        $(".game-over").height($(".container").height());
        $(".game-over").append("<h1>GAME OVER</h1>");
        $(".game-over").append("<button type='button' id='restart'>Play Again</button>");
        $("#restart").on("click", function() {
            location.reload();
        });
    }
}

// function to check game status to see if @ end, check before displaying if not then display and if so then "final screen"
//play again function? either refresh page or restore original questions options array and pick new questions + reset score


//===========================================================================
//Pick random questions used for game
for (i = 0; i < 3; i++) {
    var index = Math.floor(Math.random() * questionOptions.length);
    var question = questionOptions[index];
    gameQuestions.push(question);
    questionOptions.splice(index, 1);
}
$("#total-questions").html(gameQuestions.length);

display();

//When answer is chosen, check to see if it's right, then go to the next question
$(".well").on("click", function () {
    questionTimer.stop();
    $(this).addClass("answerChoice");
    $("#answer-options").append('<div class="message">');
    $(".message").height($("#answer-options").height());
    var answerPicked = $(this).html();
    if (answerPicked === gameQuestions[questionIndex].correctAnswer) {
        numberCorrect++; 
        $("#numberCorrect").html(numberCorrect); 
        $(".message").html( "Correct! Answer: " + gameQuestions[questionIndex].correctAnswer + " .");
    }
    else {
        $(".message").html( "Incorrect. The correct answer was " + gameQuestions[questionIndex].correctAnswer + " .");
    }
    nextQuestion();
});



