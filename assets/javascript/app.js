//Function the ensures HTML loads first
$(document).ready(function () {
	//Object
	const triviaGame = [{
		question: "Who was Michael Scott's first on-screen kiss?",
		options: ["Jan", "Carol", "Donna", "Holly"],
		answer: 0,
		photo1: "assets/images/jan.webp",
		photo2: "assets/images/jan2.gif",
	}, {
		question: "What product does Dunder Mifflin primarily sell?",
		options: ["Pencils", "Post-it Notes", "Paper", "Printers"],
		answer: 2,
		photo1: "assets/images/celebration.gif",
		photo2: "assets/images/turntables.gif",
	}, {
		question: "What is the name of Jim and Pam's first child?",
		options: ["Peepee", "Peepa", "Mimi", "Cece"],
		answer: 3,
		photo1: "assets/images/highfive.gif",
		photo2: "assets/images/wrong.gif",
	}, {
		question: "Abraham Lincoln once said that 'If you're a racist...",
		options: ["I will attack you with the north", "I hate you", "You'll go to prison", "Don't call me Surly"],
		answer: 0,
		photo1: "assets/images/thankyou.gif",
		photo2: "assets/images/ignorant.gif",
	}, {
		question: "In an episode titled 'The Injury', what injury does Michael endure?",
		options: ["Head stuck in stair railing", "Burns foot on foreman grill", "Hit by a car", "Stomach Cramps"],
		answer: 1,
		photo1: "assets/images/correct.gif",
		photo2: "assets/images/grill.gif",
	}, {
		question: "Who was Pam's first romance on the show?",
		options: ["Dwight", "Oscar", "Roy", "Michael"],
		answer: 2,
		photo1: "assets/images/nice.gif",
		photo2: "assets/images/work.gif",
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
	const themeSong = new Audio("assets/audio/officetheme.mp3");
//Appends the button that begins the game and plays the themesong
	let goBtn = $("<button>").html("<h2> Click here to begin </h2>");
	goBtn.attr("id", "goBtn");
	$("#answers-stats").append(goBtn);
	themeSong.play();
	//Function that begins the game
	$(goBtn).on("click", function () {
		goBtn.hide();
		countDown();
		displayQuestion();
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
			$("#answers-stats").text("");
			$("#answers-stats").append(idiotGif);
			unansweredPic();
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
		$("#question-text").html("<h3>" + pick.question + "</h3>");
		//Loops through the keys in the chosen position
		for (let i = 0; i < pick.options.length; i++) {
			//Assigns the user's guess to a dynamically created div
			let userGuess = $("<button>").attr("class", "userguess");
			//Appends each value as an h2 inside a newly created div
			userGuess.html("<h2>" + pick.options[i] + "</h2>");
			//Assigns a data-value to each key: value
			userGuess.attr("data-guessvalue", i);
			//Appends the newly created divs with each answer option into the answers-stats div
			$("#answers-stats").append(userGuess);
		}

		//Function that allows user to choose an answer and determines the outcome
		$(".userguess").on("click", function () {
			//Determines the array position of each userGuess option by converting it back to an integer temporarily
			userGuess = parseInt($(this).attr("data-guessvalue"));
			//If user guesses correctly
			if (userGuess === pick.answer) {
				//Stop the countDown
				halt();
				//Add to the correctGuess counter
				correctGuess++;
				//Temporarily empty the userGuess text
				userGuess = "";
				//Add congratulatory text to question-text div
				$("#question-text").html("<h3> Congrats! You want a medal, or should we continue? </h3>");
				//Call correct guess picture function
				correctPic();
			} else {
				halt();
				incorrectGuess++;
				userGuess = "";
				$("#question-text").html("<h3> Nope, the correct answer is: " + pick.options[pick.answer] + "</h3>");
				incorrectPic();
			}
		})
	}
	//Function that hides photo and then displays if anwer is correct
	function correctPic() {
		$("#answers-stats").html("<img src=" + pick.photo1 + ">");
		emptyArray.push(pick);
		//.splice researched here: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice"
		triviaGame.splice(index, 1);
		//Assigns variable to set timeout
		let hiddenPic = setTimeout(function () {
			$("#answers-stats").empty();
			timer = 30;
			//Check if game is over, and then displays the score screen
			if ((incorrectGuess + correctGuess + unanswered) === qCount) {
				$("#time-remaining").empty();
				//Empty's the question-text div
				$("#question-text").empty();
				//Overrides question-text with:
				$("#question-text").html("<h3> Well, that's every of the time we have; here's how ya did: </h3>");
				//Appends correct, incorrect, and unanswered scores, appends reset button, and resets scores to zero, or continues the game
				$("#answers-stats").append("<h2> Correct: " + correctGuess + "</h2>");
				$("#answers-stats").append("<h2> Incorrect: " + incorrectGuess + "</h2>");
				$("#answers-stats").append("<h2> Unanswered: " + unanswered + "</h2>");
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
	//Function that hides photo and then displays if answer is incorrect
	function incorrectPic() {
		$("#answers-stats").html("<img src=" + pick.photo2 + ">");
		emptyArray.push(pick);
		//.splice researched here: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice"
		triviaGame.splice(index, 1);
		//Assigns variable to set timeout
		let hiddenPic = setTimeout(function () {
			$("#answers-stats").empty();
			timer = 30;
			//Check if game is over, and then displays the score screen
			if ((incorrectGuess + correctGuess + unanswered) === qCount) {
				$("#time-remaining").empty();
				//Empty's the question-text div
				$("#question-text").empty();
				//Overrides question-text with:
				$("#question-text").html("<h3> Well, that's every of the time we have; here's how ya did: </h3>");
				//Appends correct, incorrect, and unanswered scores, appends reset button, and resets scores to zero, or continues the game
				$("#answers-stats").append("<h2> Correct: " + correctGuess + "</h2>");
				$("#answers-stats").append("<h2> Incorrect: " + incorrectGuess + "</h2>");
				$("#answers-stats").append("<h2> Unanswered... " + unanswered + "</h2>");
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
	//Function that hides photo then displays if question isn't answered
	function unansweredPic() {
		const fail = $("<img>").attr("src", "assets/images/dwight.gif");
		$("#answers-stats").html(fail);
		emptyArray.push(pick);
		//.splice researched here: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice"
		triviaGame.splice(index, 1);
		//Assigns variable to set timeout
		let hiddenPic = setTimeout(function () {
			$("#answers-stats").empty();
			timer = 30;
			//Check if game is over, and then displays the score screen
			if ((incorrectGuess + correctGuess + unanswered) === qCount) {
				$("#time-remaining").empty();
				//Empty's the question-text div
				$("#question-text").empty();
				//Overrides question-text with:
				$("#question-text").html("<h3> Well, that's every of the time we have; here's how ya did: </h3>");
				//Appends correct, incorrect, and unanswered scores, appends reset button, and resets scores to zero, or continues the game
				$("#answers-stats").append("<h2> Correct: " + correctGuess + "</h2>");
				$("#answers-stats").append("<h2> Incorrect: " + incorrectGuess + "</h2>");
				$("#answers-stats").append("<h2> Unanswered... " + unanswered + "</h2>");
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
	$("#reset").on("click", function () {
		$("#answers-stats").empty();
		$("#question-text").empty();
		for (let i = 0; i < tempArray.length; i++) {
			triviaGame.push(tempArray[i]);
		}
		countDown();
		displayQuestion();
	})

});