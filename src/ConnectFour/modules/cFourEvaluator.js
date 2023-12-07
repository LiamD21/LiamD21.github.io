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

    // TODO check diagonal 4s as well

    // returns a score from 10 to -10, 10 being p1 wins, -10 being p2 wins
    return Math.round(p1Score-p2Score)/10;
}