//Object
const triviaGame = [{
	question: "Who was Michael Scott's first on-screen kiss?",
	options: ["Jan", "Carol", "Donna", "Holly"],
	answer: 0,
	photo: "assets/images/jan.webp",
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
let empyArray = [];
let tempArray = [];
//Function the ensures HTML loads first
$(document).ready(function () {

	




});