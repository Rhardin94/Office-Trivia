//Object
const triviaGame = [{
	question: "Who was Michael Scott's first on-screen kiss?",
	options: ["Jan", "Carol", "Donna", "Holly"],
	answer: 0,
	photo1: "assets/images/jan.webp",
	photo2: "assets/iamges/jan2.gif",
}, {
	question: "What product does Dunder Mifflin primarily sell?",
	options: ["Pencils", "Post-it Notes", "Paper", "Printers"],
	answer: 2,
	photo: "",
}];
//Global Variables
let correctGuess = 0;
let incorrectGuess = 0;
let unanswered = 0;
let isRunning = false;
let timer = 30;
let intervalId;
let userGuess = "";
let qCount = triviaGame.length;
let pick;
let index;
let emptyArray = [];
let tempArray = [];
//Function the ensures HTML loads first
$(document).ready(function () {
	let goBtn = $("<h2>").text("Click here to begin");
		$("#answers-stats").append(goBtn);

	//Function that begins the game
	$(goBtn).on("click", function() {
		goBtn.hide();
		displayQuestion();
		countDown();
		for (let i = 0; i < triviaGame.length; i++) {
			tempArray.push(triviaGame[i]);
		}
	})
	//Function that starts the timer
	function countDown() {
		if (!isRunning) {
			intervalId = setInterval(decrement, 1000);
			isRunning = true;
		}
	}
	//Function that begins the countdown
	function decrement() {
		$("#time-remaining").html("<h3>Time Remaining: " + timer + "</h3>");
		timer--;
		//Stops the timer if it reaches 0
		if (timer === 0) {
			unanswered++;
			halt();
			$("#question-text").html("<h3> You didn't answer the question...</h3>");
			let idiotGif = $("<img>").attr("src", "assets/images/dwight.gif");
			$("#ansers-stats").append(idiotGif);
		}
	}
	//Function that stops the countDown, will be called multiple times.
	function halt() {
		isRunning = false;
		clearInterval(intervalId);
	}
	//Function that displays the question randomly based on whether it has been displayed or not
	function displayQuestion() {
		//Randomizes a position in the object's array
		index = Math.floor(Math.random() * triviaGame.length);
		//Associates the choice with the random position chosen above
		pick = triviaGame[index];
		//Appends the chosen question to the question-text div
		$("#question-text").html("<h3>" + pick.question + "</h2>");
		//Loops through the keys in the chosen position
		for (let i = 0; i < pick.triviaGame.length; i++) {
			//Assigns the user's guess to a dynamically created div
			let userGuess = $("<div>").attr("class", "user-choice");
			//Appends each value inside a newly created div
			userGuess.html(pick.options[i]);
			//Assigns a data-value to each key: value
			userGuess.attr("data-guessvalue", i);
			//Appends the newly created divs with each answer options into the answers-stats div
			$("#answers-stats").append(userGuess);
		}
	}
//Function that allows user to choose an answer and determines the outcome
$(".user-choice").on("click", function() {
	//Determines the array position of each userGuess option by converting it back to an integer temporarily
	userGuess = parseInt($(this).attr("data-guessvalue"));
	//If user guesses correctly
	if (userGuess === pick.answer) {
		//Stop the countDown
		halt();
		//Add to the correctGuess counter
		correctGuess++;
		//Temporarily empty the userGuess text
		userGuess="";
		//Add congratulatory text to question-text div
		$("#question-text").text("<h3> Congrats! You want a medal, or should we continue? </h3>");
		//Call correct guess picture function
		hidePic1();
	}
})
//Function that hides photo and then displays if anwer is correct
function hidePic1() {
	$("#answers-stats").append("<img src=" + pick.photo1 + ">");
	emptyArray.push(pick);
	//.splice researched here: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice"
	triviaGame.splice(index, 1);
	//Assigns variable to set timeout
	let hiddenPic = setTimeout(function() {
		$("#answers-stats").empty();
		timer = 30;
		//Check if game is over, and then displays the score screen
		if ((incorrectGuess + correctGuess + unanswered) === qCount) {
			//Empty's the question-text div
			$("#question-text").empty();
			//Overrides question-text with:
			$("#question-text").html("<h3> Game Over, Man! Here's the deets: </h3>");
			//Appends correct, incorrect, and unanswered scores
			$("#answers-stats").append("<h2> Correct: " + correctGuess + "</h2>");
			$("#answers-stats").append("<h2> Incorrect: " + incorrectGuess + "</h2>");
			$("#answers-stats").append("<h2 Unanswered..." + unanswered + "</h2>");
			let resetBtn = $("<h4>").text("Play Again?");
			resetBtn.attr("id", "reset");
			$("#answers-stats").append(resetBtn);
			correctGuess = 0;
			incorrectGuess = 0;
			unanswered = 0;
		} else {
			countDown();
			displayQuestion();
		}
	}, 1000 * 3);
}
//Function that restarts the game
$("#reset").on("click", function() {
	$("#answers-stats").empty();
	$("#question-text").empty();
	for (let i = 0; i < tempArray.length; i++) {
		triviaGame.push(tempArray[i]);
	}
	countDown();
	displayQuestion();
})

});