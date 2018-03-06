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
        answerChoices: ["Blue","Pink","Purple","Green"],
        correctAnswer: "Pink"
    },

    {
        question: "What alias does Aladdin use to fool the sultan into thinking he was a prince?",
        answerChoices: ["Prince Abu","Prince Ali","Prince Razoul","Prince Farouk"],
        correctAnswer: "Prince Ali"
    },
    {
        question: "In Brave, what is Merida skilled in?",
        answerChoices: ["Baking","Stone throwing","Knitting","Archery"],
        correctAnswer: "Archery"
    },

    {
        question: "In Alice in Wonderland, what occasion was being celebrated at The Mad Tea Party?",
        answerChoices: ["Tea time","A birthday","An unbirthday","The arrival of summer"],
        correctAnswer: "An unbirthday"
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
    },
    {
        question: "In Hercules, what is the color of Hades's hair?",
        answerChoices: ["Orange","Black","Blue","Red"],
        correctAnswer: "Blue"
    }, {
        question: "What is the main character's name in Holes?",
        answerChoices: ["Michael Leahcim","Stanley Yelnats","Marcus Sucram","Daniel Leinad"],
        correctAnswer: "Stanley Yelnats"
    }, {
        question: "What meal do the Lady and the Tramp share on their date?",
        answerChoices: ["Pierogies","Baked ziti","Table scraps","Spaghetti"],
        correctAnswer: "Spaghetti"
    }, {
        question: "What was the name of Bambi's skunk friend?",
        answerChoices: ["Rose","Flower","Stinker","Oreo"],
        correctAnswer: "Flower"
    }, {
        question: "In meet the Robinsons, what animals does Franny teach to sing?",
        answerChoices: ["Frogs","Birds","Cat","Lizards"],
        correctAnswer: "Frogs"
    }, {
        question: "What is most energy-producing resource for Monsters Inc?",
        answerChoices: ["Screams","Laughter","Snoring","Crying"],
        correctAnswer: "Laughter"
    }, {
        question: "What is the name of Mulan's pet dragon?",
        answerChoices: ["Li Shang","Abdul","Mushu","Dhanush"],
        correctAnswer: "Mushu"
    }, {
        question: "What is the raccoon's name in Pocahantas?",
        answerChoices: ["Charlie","Powhatan","John Smith","Meeko"],
        correctAnswer: "Meeko"
    }, {
        question: "Which language does Kronk speak in the Emperor's New Groove?",
        answerChoices: ["Squirrel","Spanish","Portugese","Gibberish"],
        correctAnswer: "Squirrel"
    }, {
        question: "What is the name of the festival in The Hunchback of Notre Dame?",
        answerChoices: ["Festival of Fools","Party for Paupers","Festival of Food","Gathering of Goons"],
        correctAnswer: "Festival of Fools"
    }, {
        question: "In The Incredibles, which part of a costume does Edna warn against?",
        answerChoices: ["Mask","Boots","Cape","Gloves"],
        correctAnswer: "Cape"
    }, {
        question: "What was the name of Bambi's skunk friend?",
        answerChoices: ["Rose","Flower","Stinker","Oreo"],
        correctAnswer: "Flower"
    }, {
        question: "What is meaning of Hakuna Matata?",
        answerChoices: ["No worries","Whatever","It's cool","No problem"],
        correctAnswer: "No worries"
    }, {
        question: "What does Ariel, the little mermaid, think a fork is used for?",
        answerChoices: ["Brushing hair","Throwing things","Scratching an itch","Digging"],
        correctAnswer: "Brushing hair"
    }, {
        question: "In the beginning of WALL-E, what tool does he have trouble sorting?",
        answerChoices: ["Screwdriver","Can opener","Spork","Level"],
        correctAnswer: "Spork"
    }, {
        question: "What is Andy's neighbor's name in Toy Story?",
        answerChoices: ["Mark","Sid","Karl","Anthony"],
        correctAnswer: "Sid"
    }, {
        question: "What is Donald Duck's middle name?",
        answerChoices: ["Bellatrix","Maximilian","Heston","Fauntleroy"],
        correctAnswer: "Fauntleroy"
    }
];
//setting up timer
var questionTimer = {
    timerDuration: 10, //set timer duration here
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
        questionTimer.stop();
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
for (i = 0; i < 5; i++) {
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
        $(".message").html( "Incorrect. The correct answer is " + gameQuestions[questionIndex].correctAnswer + " .");
    }
    nextQuestion();
});



