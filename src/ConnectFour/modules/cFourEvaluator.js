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
    let scores = checkPossibilities();
    // if we have any wins, the game is over
    if (scores[8] === 1){
        return 10;
    }
    else if (scores[9] === 1){
        return -10;
    }

    // if no wins, continue with the evaluation
    let p1TotalOptions = scores[0];
    let p2TotalOptions = scores[1];

    // remove all options from total moves which also appear as singles, doubles, or triples
    p1TotalOptions = p1TotalOptions - scores[2] - scores[4] - scores[6];
    p2TotalOptions = p2TotalOptions - scores[3] - scores[5] - scores[7];

    console.log(scores);

    // create overall scores
    // weights: empty options = 1, singles = 4, doubles = 10, triples = 50
    let p1TotalWt = p1TotalOptions + (scores[2] * 4) + (scores[4] * 10) + (scores[6] * 50);
    let p2TotalWt = p2TotalOptions + (scores[3] * 4) + (scores[5] * 10) + (scores[7] * 50);

    // return the weight as a score out of 10. negative means that p2 is ahead, positive means that p1 is ahead
    return Math.round((p1TotalWt/(p1TotalWt+p2TotalWt)*100)-50)/10;
}

function checkPossibilities(){
    let p1Score = 0;
    let p2Score = 0;
    let p1Singles = 0;
    let p2Singles = 0;
    let p1Doubles = 0;
    let p2Doubles = 0;
    let p1Triples = 0;
    let p2Triples = 0;
    let p1Win = 0;
    let p2Win = 0;

    let p1ColStreak, p1ColLastFour;
    let p2ColStreak, p2ColLastFour;

    // find all possible ways that each player can make 4 in the current position

    let p1RowStreaks = [0, 0, 0, 0, 0, 0];
    let p2RowStreaks = [0, 0, 0, 0, 0, 0];
    let p1Row1LastFour = [0, 0, 0, 0];
    let p1Row2LastFour = [0, 0, 0, 0];
    let p1Row3LastFour = [0, 0, 0, 0];
    let p1Row4LastFour = [0, 0, 0, 0];
    let p1Row5LastFour = [0, 0, 0, 0];
    let p1Row6LastFour = [0, 0, 0, 0];
    let p2Row1LastFour = [0, 0, 0, 0];
    let p2Row2LastFour = [0, 0, 0, 0];
    let p2Row3LastFour = [0, 0, 0, 0];
    let p2Row4LastFour = [0, 0, 0, 0];
    let p2Row5LastFour = [0, 0, 0, 0];
    let p2Row6LastFour = [0, 0, 0, 0];
    // check vertical and horizontal 4s that can be made
    for (let col = 0; col < 7; col++){
        p1ColStreak = 0;
        p1ColLastFour = [0, 0, 0, 0];
        p2ColStreak = 0;
        p2ColLastFour = [0, 0, 0, 0];
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

            // update the lists of last four on the current streak
            for (let i = 3; i >= 1; i--){
                p1ColLastFour[i] = p1ColLastFour[i-1];
                p2ColLastFour[i] = p2ColLastFour[i-1];
                switch (row){
                    case 0:
                        p1Row1LastFour[i] = p1Row1LastFour[i-1];
                        p2Row1LastFour[i] = p2Row1LastFour[i-1];
                        break;
                    case 1:
                        p1Row2LastFour[i] = p1Row2LastFour[i-1];
                        p2Row2LastFour[i] = p2Row2LastFour[i-1];
                        break;
                    case 2:
                        p1Row3LastFour[i] = p1Row3LastFour[i-1];
                        p2Row3LastFour[i] = p2Row3LastFour[i-1];
                        break;
                    case 3:
                        p1Row4LastFour[i] = p1Row4LastFour[i-1];
                        p2Row4LastFour[i] = p2Row4LastFour[i-1];
                        break;
                    case 4:
                        p1Row5LastFour[i] = p1Row5LastFour[i-1];
                        p2Row5LastFour[i] = p2Row5LastFour[i-1];
                        break;
                    case 5:
                        p1Row6LastFour[i] = p1Row6LastFour[i-1];
                        p2Row6LastFour[i] = p2Row6LastFour[i-1];
                        break;
                }
            }
            p1ColLastFour[0] = gameBoard[row][col];
            p2ColLastFour[0] = gameBoard[row][col];
            switch (row){
                case 0:
                    p1Row1LastFour[0] = gameBoard[row][col];
                    p2Row1LastFour[0] = gameBoard[row][col];
                    break;
                case 1:
                    p1Row2LastFour[0] = gameBoard[row][col];
                    p2Row2LastFour[0] = gameBoard[row][col];
                    break;
                case 2:
                    p1Row3LastFour[0] = gameBoard[row][col];
                    p2Row3LastFour[0] = gameBoard[row][col];
                    break;
                case 3:
                    p1Row4LastFour[0] = gameBoard[row][col];
                    p2Row4LastFour[0] = gameBoard[row][col];
                    break;
                case 4:
                    p1Row5LastFour[0] = gameBoard[row][col];
                    p2Row5LastFour[0] = gameBoard[row][col];
                    break;
                case 5:
                    p1Row6LastFour[0] = gameBoard[row][col];
                    p2Row6LastFour[0] = gameBoard[row][col];
                    break;
            }

            let counters;
            // if we have a vertical streak of 4 or more, add one way to get four and check for any pieces already there
            if (p1ColStreak >= 4){
                p1Score ++;
                if (row === 5 || gameBoard[row + 1][col] !== 1) {
                    counters = incrementScores(countLastFour(1, p1ColLastFour), p1Singles, p1Doubles, p1Triples, p1Win);
                    p1Singles = counters[0];
                    p1Doubles = counters[1];
                    p1Triples = counters[2];
                    p1Win = counters[3];
                }
            }
            if (p2ColStreak >= 4){
                p2Score ++;
                if (row === 5 || gameBoard[row + 1][col] !== 1) {
                    counters = incrementScores(countLastFour(2, p2ColLastFour), p2Singles, p2Doubles, p2Triples, p2Win);
                    p2Singles = counters[0];
                    p2Doubles = counters[1];
                    p2Triples = counters[2];
                    p2Win = counters[3];
                }
            }

            // if we have a horizontal streak of 4 or more, add one way to get four and check for pieces already there
            let p1RowLastFour, p2RowLastFour;
            switch (row){
                case 0:
                    p1RowLastFour = p1Row1LastFour;
                    p2RowLastFour = p2Row1LastFour;
                    break;
                case 1:
                    p1RowLastFour = p1Row2LastFour;
                    p2RowLastFour = p2Row2LastFour;
                    break;
                case 2:
                    p1RowLastFour = p1Row3LastFour;
                    p2RowLastFour = p2Row3LastFour;
                    break;
                case 3:
                    p1RowLastFour = p1Row4LastFour;
                    p2RowLastFour = p2Row4LastFour;
                    break;
                case 4:
                    p1RowLastFour = p1Row5LastFour;
                    p2RowLastFour = p2Row5LastFour;
                    break;
                case 5:
                    p1RowLastFour = p1Row6LastFour;
                    p2RowLastFour = p2Row6LastFour;
                    break;
            }

            if (p1RowStreaks[row] >= 4){
                p1Score ++;
                counters = incrementScores(countLastFour(1, p1RowLastFour), p1Singles, p1Doubles, p1Triples, p1Win);
                p1Singles = counters[0];
                p1Doubles = counters[1];
                p1Triples = counters[2];
                p1Win = counters[3];
            }
            if (p2RowStreaks[row] >= 4){
                p2Score ++;
                counters = incrementScores(countLastFour(2, p2RowLastFour), p2Singles, p2Doubles, p2Triples, p2Win);
                p2Singles = counters[0];
                p2Doubles = counters[1];
                p2Triples = counters[2];
                p2Win = counters[3];
            }
        }
    }

    // Check ways to make 4 on the diagonals
    let p1DiagStreak, p2DiagStreak, p1DiagLastFour, p2DiagLastFour;
    for (let i = 0; i < 12; i++){
        p1DiagStreak = 0;
        p2DiagStreak = 0;
        p1DiagLastFour = [-1, -1, -1, -1];
        p2DiagLastFour = [-1, -1, -1, -1];
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
        while (moveRow <= 5 && moveCol <= 6 && moveCol >= 0) {
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

            // adjust the lists of the last four elements seen
            for (let i = 3; i >= 1; i--) {
                p1DiagLastFour[i] = p1DiagLastFour[i - 1];
                p2DiagLastFour[i] = p2DiagLastFour[i - 1];
            }
            p1DiagLastFour[0] = gameBoard[moveRow][moveCol];
            p2DiagLastFour[0] = gameBoard[moveRow][moveCol];

            // adjust the col depending on which direction we are looking
            if (i < 6) {
                moveCol++;
            }
            else {
                moveCol --;
            }
            moveRow ++;

            // if we have a streak of 4 or more, add to the score and check for how many pieces in the last four we have already seen
            let counters;
            if (p1DiagStreak >= 4){
                p1Score ++;
                counters = incrementScores(countLastFour(1, p1DiagLastFour), p1Singles, p1Doubles, p1Triples, p1Win);
                p1Singles = counters[0];
                p1Doubles = counters[1];
                p1Triples = counters[2];
                p1Win = counters[3];
            }
            if (p2DiagStreak >= 4){
                p2Score ++;
                counters = incrementScores(countLastFour(2, p2DiagLastFour), p2Singles, p2Doubles, p2Triples, p2Win);
                p2Singles = counters[0];
                p2Doubles = counters[1];
                p2Triples = counters[2];
                p2Win = counters[3];
            }
        }
    }

    // returns an array of the calculated scores
    // array format is: [p1Score, p2Score, p1Singles, p2Singles...., p2Win]
    return [p1Score, p2Score, p1Singles, p2Singles, p1Doubles, p2Doubles, p1Triples, p2Triples, p1Win, p2Win];
}

/**
 * Counts the number of times a player's pieces are in the last 4 pieces looked at
 * @param player the integer for player 1 or 2
 * @param lastFour the array of the last 4 pieces seen on the board
 * @return {number} the number of the player's pieces which were seen in the last 4 given
 */
function countLastFour(player, lastFour){
    let count = 0;
    for (let i = 0; i < 4; i++){
        if(lastFour[i] === player){
            count ++;
        }
    }

    return count;
}

/**
 * increments the correct counter based on the number of resents seen and returns all the counters after modifying one
 * @param num the number of pieces seen in the last four
 * @param singles the number of singles so far for this player
 * @param doubles the number of doubles so far for this player
 * @param triples the number of triples so far for this player
 * @param win 1 if the player has had a win, 0 otherwise
 * @return {(*|number)[]} an array with all the counters
 */
function incrementScores(num, singles, doubles, triples, win){
    if (num > 0){
        if (num > 1){
            if (num > 2){
                if (num > 3){
                    win = 1;
                }
                else {
                    triples++;
                }
            }
            else {
                doubles++;
            }
        }
        else {
            singles++;
        }
    }
    return [singles, doubles, triples, win];
}