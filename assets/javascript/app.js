/*
1. Pick a theme for the trivia game
2. Create questions with 1 correct and 3 incorrect answers.
3. Create score counters of correct and incorrect picks for each answer selected
4. Create game states that determine which portion of the game is displayed and when.
5. Create on-click events for buttons that correspond with the question that is displayed to determine if the user picked correctly of not.
6. Create timers for each question that gives the user 30 seconds to pick an answer.
7. Make timer move game to next stage whether the user picks correctly, incorrectly, or not at all.
8. Create a win page for each correct guess.
9. Create a loss page for each incorrect guess that displays the correct answer.
10. Display users' correct, incorrect, and unanswered questions at the end of the game.
Bonus. Play audio files for each correct or incorrect answer, as well as at the beginning and end of the game.
*/
/* Conditions of the game:
1. User is given a question with 4 possible answers.
2. User must select and answer by clicking a corresponding button.
3. If answer is correct, a win screen is briefly displayed (an audio file is played) and the game moves to the next question
4. If the answer is incorrect, a loss screen is displayed with the correct answer(an audio file is played) and the game moves to the next question.
5. Each question the user is given 30 seconds to answer.
6. At the end of the game, (another audio file is played), correct, incorrect, and unanswered questsions are displayed, and a reset button is displayed.

/*
1. Make start screen appear that includes begin button
2. Make question screen appear with 1 question, and 4 answers
3. Determine if user clicks correct or incorrect answer.
4. Display Correct screen, or incorrect screen that displays correct answer.
5. Display end screen with correct, incorrect, and unanswered stats.
6. Make play again button reset game without refreshing browser.
*/
//Global variables I think I need
let correctGuess = 0;
let incorrectGuess = 0;
let unanswered = 0;
let isRunning = false;
let themeSong = new Audio("assets/audio/officetheme.mp3");
//Function to ensure HTML loads first
$(document).ready(function() {
//Adding a button to make the game start and class for styling later
$("#answers-stats").append("<h2> Click here to begin </h2>");
$("h2").attr("id", "goBtn");
//Creating an object with the question and answers
const triviaGame = {
	q1 : "Who was Michael Scott's first on-screen kiss?",
	q1Answers : {
		a1 : "Jan",
		a2 : "Carol",
		a3 : "Donna",
		a4 : "Holly",
	}
}
//Adding on click event to goBtn to start gaming
$("#goBtn").on("click", function() {
	isRunning = true;
	quest1();
});
/*Creating a function for the question section,
	that displays the question and the four answers,
	by pulling values from object*/
function quest1() {
	let quest1 = $("#question-text").text(triviaGame.q1);
	let ans1 = $("<h2>").text(triviaGame.q1Answers.a1);
	let ans2 = $("<h2>").text(triviaGame.q1Answers.a2);
	let ans3 = $("<h2>").text(triviaGame.q1Answers.a3);
	let ans4 = $("<h2>").text(triviaGame.q1Answers.a4);	
	if (isRunning = true) {
		$("#goBtn").text("");
		$("#question-text").append(quest1);
		$("#answers-stats").append(ans1, ans2, ans3, ans4);
	}
}
});