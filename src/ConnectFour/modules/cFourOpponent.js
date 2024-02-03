// importing
import {cFourEvaluator} from "./cFourEvaluator";

export class cFourOpponent{
    // define private class attributes
    #state;
    #bestEval;
    #bestMove;

    constructor(state) {
        this.#state = state;
        this.#bestEval = 11;
    }

    /**
     * Find all possible actions from this state
     * @return {*[]}
     */
    #actions(){
        let actns = [];
        for (let i = 0; i < 8; i++){
            if (!this.#state.isColFull(i)){
                actns.add(i);
            }
        }
        return actns;
    }

    /**
     * search all possible actions in this state to find the best one
     */
    #searchLevel(){
        let actns = this.#actions();
        for (let i = 0; i < actns.length; i++){
            let stateCpy = this.#state.copyBoard();
            let evaluator = new cFourEvaluator();

            stateCpy.playPiece(i);
            evaluator.updateGameBoard(stateCpy.getGameState(), stateCpy.getTurn());

            let score = evaluator.getEvalScore();
            if (score < this.#bestEval){
                this.#bestEval = score;
                this.#bestMove = i;
            }
        }
    }

    /**
     * performs the search and returns the best move to make
     * @return {*}
     */
    doSearch(){
        this.#searchLevel();
        return this.#bestMove
    }
}