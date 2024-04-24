// importing
import {cFourEvaluator} from "./cFourEvaluator";

export class cFourOpponent{
    #depthLimit = 4;

    /**
     * Find all possible actions from this state
     * @return {*[]}
     */
    #actions(state){
        let actns = [];
        for (let i = 0; i < 8; i++){
            if (!state.isColFull(i)){
                actns.add(i);
            }
        }
        return actns;
    }

    /**
     * finds the best action for min in a minimax search
     */
    #minimaxDecision(state){
        let actns = this.#actions(state);
        let bestMove = "";
        let bestEval = 11;

        for (let i = 0; i < actns.length; i++){
            let stateCpy = state.copyBoard();

            stateCpy.playPiece(i);
            stateCpy.nextTurn();
            let score = this.#maxValue(stateCpy, 1);

            if (score < bestEval){
                bestEval = score;
                bestMove = i;
            }
        }

        return bestMove
    }

    /**
     * performs the search and returns the best move to make
     * @return {*}
     */
    doSearch(state){
        return this.#minimaxDecision(state);
    }

    #maxValue(state, depth){
        let evaluator = new cFourEvaluator();
        evaluator.updateGameBoard(state, state.getTurn());

        if (evaluator.getEvalScore() === 10 || evaluator.getEvalScore() === -10){
            return evaluator.getEvalScore();
        }

        else if (depth >= this.#depthLimit){
            return evaluator.getEvalScore();
        }

        else {
            let actns = this.#actions(state);
            let bestEval = -11;

            for (let i = 0; i < actns.length; i++){
                let stateCpy = state.copyBoard();

                stateCpy.playPiece(i);
                stateCpy.nextTurn();
                let score = this.#minValue(stateCpy, depth + 1);

                if (score > bestEval){
                    bestEval = score;
                }
            }

            return bestEval;
        }
    }

    #minValue(state, depth){
        let evaluator = new cFourEvaluator();
        evaluator.updateGameBoard(state, state.getTurn());

        if (evaluator.getEvalScore() === 10 || evaluator.getEvalScore() === -10){
            return evaluator.getEvalScore();
        }

        else if (depth >= this.#depthLimit){
            return evaluator.getEvalScore();
        }

        else {
            let actns = this.#actions(state);
            let bestEval = 11;

            for (let i = 0; i < actns.length; i++){
                let stateCpy = state.copyBoard();

                stateCpy.playPiece(i);
                stateCpy.nextTurn();
                let score = this.#maxValue(stateCpy, depth + 1);

                if (score < bestEval){
                    bestEval = score;
                }
            }

            return bestEval;
        }
    }
}