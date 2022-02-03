import GuessState from "./utils/GuessState";

/**
 * 
 * @param {String} guess 
 * @param {String} answer 
 * @returns {GuessState[]} - The guess states for a given guess and answer combo
 */
export function getGuessStates(guess, answer) {
    let answerSet = [...answer];
    let states = Array(5).fill(GuessState.Wrong);
    const guessArr = [...guess];
    guessArr.forEach((letter,index) => {
        if(answer[index] === letter) {
            states[index] = GuessState.Correct;
            answerSet.splice(answerSet.findIndex(l => l === letter), 1);
        }
    }) 
    guessArr.forEach( (letter,index) => {
        let idx = answerSet.findIndex(l => l === letter);
        if(idx >= 0 && states[index] === GuessState.Wrong) {
            answerSet.splice(idx, 1);
            states[index] = GuessState.SemiCorrect;
        }
    })
    return states;
}
