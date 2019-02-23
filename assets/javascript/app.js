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
*/
//Object that holds all the questions and answers?
const triviaGame = {
    q1 = {
        a1 : "Jan",
        a2 : "Carol",
        a3 : "Holly",
        a4 : "Donna",
    },
    q2 = {
        a1 : "",
        a2 : "",
        a3 : "",
        a4 : "",
    },
    q3 = {
        a1 : "",
        a2 : "",
        a3 : "",
        a4 : "",
    },
    q4 = {
        a1 : "",
        a2 : "",
        a3 : "",
        a4 : "",
    },
    q5 = {
        a1 : "",
        a2 : "",
        a3 : "",
        a4 : "",
    },
    q6 = {
        a1 : "",
        a2 : "",
        a3 : "",
        a4 : "",
    },
    q7 = {
        a1 : "",
        a2 : "",
        a3 : "",
        a4 : "",
    },
    q8 = {
        a1 : "",
        a2 : "",
        a3 : "",
        a4 : "",
    },
}