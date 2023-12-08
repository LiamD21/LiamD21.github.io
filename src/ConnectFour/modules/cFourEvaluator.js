// Global variables
// Always keeps an updated instance of the game board ready
let gameBoard;
let evalScore;

/**
 * Used by the game board class to update the local copy of the game state whenever it is changed
 * @param gB the new copy of the game state
 */
export function updateGameBoard(gB){
    gameBoard = gB;
    evalScore = evaluatePosition();
}

/**
 * gets the eval score for the current game state
 * @return {*}
 */
export function getEvalScore(){
    return evalScore;
}

function evaluatePosition(){
    let p1Score = 0;
    let p2Score = 0;

    let p1ColStreak;
    let p2ColStreak;

    // find all possible ways that each player can make 4 in the current position

    let p1RowStreaks = [0, 0, 0, 0, 0, 0];
    let p2RowStreaks = [0, 0, 0, 0, 0, 0];
    // check vertical and horizontal 4s that can be made
    for (let col = 0; col < 7; col++){
        p1ColStreak = 0;
        p2ColStreak = 0;
        for(let row = 0; row < 6; row++){
            // check the current element
            if (gameBoard[row][col] === 0){
                p1ColStreak ++;
                p2ColStreak ++;
                p1RowStreaks[row] ++;
                p2RowStreaks[row] ++;
            }
            else if (gameBoard[row][col] === 1){
                p1ColStreak ++;
                p2ColStreak = 0;
                p1RowStreaks[row] ++;
                p2RowStreaks[row] = 0;
            }
            else if (gameBoard[row][col] === 2){
                p1ColStreak = 0;
                p2ColStreak ++;
                p1RowStreaks[row] = 0;
                p2RowStreaks[row] ++;
            }

            // if we have a vertical streak of 4 or more, add one way to get four
            if (p1ColStreak >= 4){
                p1Score ++;
            }
            if (p2ColStreak >= 4){
                p2Score++;
            }

            // if we have a horizontal streak of 4 or more, add one way to get four
            if (p1RowStreaks[row] >= 4){
                p1Score ++;
            }
            if (p2RowStreaks[row] >= 4){
                p2Score++;
            }
        }
    }

    // Check ways to make 4 on the diagonals
    let p1DiagStreak;
    let p2DiagStreak;
    for (let i = 0; i < 12; i++){
        p1DiagStreak = 0;
        p2DiagStreak = 0;
        let moveRow, moveCol;

        // for the right-down diagonals across the top
        if (i < 4) {
            moveRow = 0;
            moveCol = i;
        }
        // for the right-down diagonals in the far left col
        else if (i < 6){
            moveRow = i - 3;
            moveCol = 0;
        }
        // for the left-down diagonals across the top
        else if (i < 10){
            moveRow = 0;
            moveCol = i - 3;
        }
        // for the left-down diagonals in the far right col
        else {
            moveRow = i - 9;
            moveCol = 6;
        }
        while (moveRow <= 5) {
            if (gameBoard[moveRow][moveCol] === 0) {
                p1DiagStreak++;
                p2DiagStreak++;
            } else if (gameBoard[moveRow][moveCol] === 1) {
                p1DiagStreak++;
                p2DiagStreak = 0;
            } else if (gameBoard[moveRow][moveCol] === 2) {
                p1DiagStreak = 0;
                p2DiagStreak++;
            }

            // adjust the col depending on which direction we are looking
            if (i < 6) {
                moveCol++;
            }
            else {
                moveCol --;
            }
            moveRow ++;

            // if we have a streak of 4 or more, add to the score
            if (p1DiagStreak >= 4){
                p1Score ++;
            }
            if (p2DiagStreak >= 4){
                p2Score ++;
            }
        }
    }

    // returns a score from 10 to -10, 10 being p1 wins, -10 being p2 wins
    return Math.round(p1Score-p2Score)/10;
}