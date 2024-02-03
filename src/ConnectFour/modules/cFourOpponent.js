// importing
import {GameBoard} from "./gameBoardClass";
import {getEvalScore} from "./cFourEvaluator";

export class cFourOpponent{
    // define private class attributes
    #state;
    #bestEval;
    #bestMove;

    constructor(state) {
        this.#state = state;
    }

    #actions(){
        let actns = [];
        for (let i = 0; i < 8; i++){
            if (!this.#state.isColFull(i)){
                actns.add(i);
            }
        }
        return actns;
    }

    #searchLevel(){
        let actns = this.#actions();
        for (let i = 0; i < actns.length; i++){
            let stateCpy = this.#state.copyBoard();
            stateCpy.playPiece(i);

        }
    }
}