// importing
import {cFourEvaluator} from "./cFourEvaluator.js";

export class cFourOpponent{
    #depthLimit = 4;
    #transpositionTable;

    /**
     * Find all possible actions from this state
     * @return {*[]}
     */
    #actions(state){
        let actns = [];
        for (let i = 0; i < 8; i++){
            if (!state.isColFull(i)){
                actns += i;
            }
        }
        return actns;
    }

    /**
     * finds the best action for min in a minimax search
     */
    #minimaxMinDecision(state){
        let actns = this.#actions(state);
        let bestMove = "";
        let bestEval = 11;
        this.#transpositionTable = new Map();
        let alpha = -11;
        let beta = 11;

        for (let i = 0; i < actns.length; i++){
            let stateCpy = state.copyBoard();

            stateCpy.playPiece(i);
            stateCpy.nextTurn();
            let score = this.#maxValue(stateCpy, 1, alpha, beta);

            if (score < bestEval){
                bestEval = score;
                bestMove = i;
            }

            beta = Math.min(beta, bestEval);
        }

        return bestMove
    }

    /**
     * performs the search and returns the best move to make
     * @return {*}
     */
    doSearch(state){
        return this.#minimaxMinDecision(state);
    }

    #maxValue(state, depth, alpha, beta){
        let evaluator = new cFourEvaluator();
        evaluator.updateGameBoard(state.getGameState(), state.getTurn());
        let stateString = state.getTranspositionString();

        if (stateString in this.#transpositionTable){
            return this.#transpositionTable[stateString];
        }

        else if (evaluator.getEvalScore() >= 10 || evaluator.getEvalScore() <= -10){
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
                let score = this.#minValue(stateCpy, depth + 1, alpha, beta);

                if (score > bestEval){
                    bestEval = score;
                }
                if (bestEval >= beta){
                    return bestEval;
                }
                alpha = Math.max(alpha, bestEval);
            }
            this.#transpositionTable[stateString] = bestEval;

            return bestEval;
        }
    }

    #minValue(state, depth, alpha, beta){
        let evaluator = new cFourEvaluator();
        evaluator.updateGameBoard(state.getGameState(), state.getTurn());
        let stateString = state.getTranspositionString();

        if (stateString in this.#transpositionTable){
            return this.#transpositionTable[stateString];
        }

        else if (evaluator.getEvalScore() === 10 || evaluator.getEvalScore() === -10){
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
                let score = this.#maxValue(stateCpy, depth + 1, alpha, beta);

                if (score < bestEval){
                    bestEval = score;
                }
                if (bestEval <= alpha){
                    return bestEval;
                }
                beta = Math.min(beta, bestEval);
            }
            this.#transpositionTable[stateString] = bestEval;

            return bestEval;
        }
    }
}