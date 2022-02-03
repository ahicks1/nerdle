import './GuessField.css'
import { getGuessStates } from './gameLogic';
import GuessState from './utils/GuessState';

// function getGuessStates(guess, answer) {
//     return guess.split("").map( (letter,index) => {
//         if(answer[index] === letter) return GuessState.Correct;
//         else if(answer.includes(letter)) return GuessState.SemiCorrect;
//         return GuessState.Wrong
//     })
//     // return Array(5).fill(GuessState.Correct);
// }

function GuessField({guess, answer="adunt", submitted}) {
    let [l1, l2, l3, l4, l5] = guess;
    let [c1, c2, c3, c4, c5] = submitted?getGuessStates(guess, answer):[];//Array(5).fill(GuessState.Unknown);
    // guess; //
    
    
    return (<div className="Guess-Field">
        <Letter letter={l1} guessState={c1}/>
        <Letter letter={l2} guessState={c2}/>
        <Letter letter={l3} guessState={c3}/>
        <Letter letter={l4} guessState={c4}/>
        <Letter letter={l5} guessState={c5}/>
    </div>)
}

function Letter({guessState=GuessState.Unknown, letter}) {

    return (<div className={"Letter "+guessState.getCSSClass()}>
        {letter??""}
    </div>)
}

export default GuessField;