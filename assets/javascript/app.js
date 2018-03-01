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

//Pick X random questions used for game
for (i = 0; i < 2; i++) {
    var index = Math.floor(Math.random()*questionOptions.length);
    var question = questionOptions[index];
    gameQuestions.push(question);
    questionOptions.splice(index, 1);
}
//CHECK to see what questions are picked
console.log(gameQuestions);

//display questions and it's answer choices
function display (question) {
$("#question").html(gameQuestions[question].question);
var answerChoiceCounter = 0;
$(".well").each(function () {
    $(this).html(gameQuestions[question].answerChoices[answerChoiceCounter]);
    answerChoiceCounter ++;
});
}
// function to check game status to see if @ end, check before displaying if not then display and if so then "final screen"
//play again function? either refresh page or restore original questions options array and pick new questions + reset score


    
 display (questionIndex);
 //When answer is chosen, check to see if it's right
 $(".well").on("click", function() {
    var answerPicked = $(this).html();
    if (answerPicked === gameQuestions[questionIndex].correctAnswer) {
        console.log ("right answer");
    }
    else {
        console.log ("wrong answer");
    }
    questionIndex ++;
    display (questionIndex);
    });

// click to start, will go to question 1
// when question answer picked, say right or wrong and if wrong display correct answer
// will then go to next question (call display)
// ... and at each is a timer, if it reaches the end it counts as wrong (make timer in display?)


