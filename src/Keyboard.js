import './Keyboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { getGuessStates } from './gameLogic'
import GuessState from './utils/GuessState'

/**
 * Takes a string and returns at most 5 uppercase alphabetic characters
 * @param {String} string 
 * @returns 
 */
 function cleanString(string) {
    return string
        .toUpperCase()
        .replace(/[^A-Z]/g, '')
        .substring(0,5)
  }

function getLetterStates(guesses, answer) {
    const states = guesses.slice(0, -1).map(g => getGuessStates(g, answer).map( (s,i) => [g[i], s])).flat();
    const letterStates = {};
    states.forEach(([letter, state]) => {
        switch(state) {
            case GuessState.Wrong:
                if(letterStates[letter] !== undefined) break;
            case GuessState.SemiCorrect:
                if(letterStates[letter] === GuessState.Correct) break;
            default:
                letterStates[letter] = state;
        }
    });
    return letterStates;
}

function Keyboard({guesses, answer, onChange, onSubmit}) {
    const letterStates = getLetterStates(guesses, answer)

    const constructRow = row => [...row].map(l => <Letter key={`KeyboardLetter ${l}`} letter={l} letterState={letterStates[l]} onClick={l => onChange(cleanString(guesses.at(-1)+l))} />)
    const topRow = constructRow("QWERTYUIOP");
    const middleRow = constructRow("ASDFGHJKL");
    const bottomRow = constructRow("ZXCVBNM");
    const backspace = () => onChange(guesses.at(-1).slice(0,-1));
    
    
    return (<div>
        <div className='KeyboardRow'>{topRow}</div>
        <div className='KeyboardRow'>{middleRow}</div>
        <div className='KeyboardRow'>
            <Letter letterState={GuessState.Unknown} letter={<FontAwesomeIcon icon={faCheckCircle} />} onClick={onSubmit} />
            {bottomRow}
            <Letter letterState={GuessState.Unknown} letter={<FontAwesomeIcon icon={faBackspace} />} onClick={backspace} />
        </div>
    </div>);
}

/**
 * 
 * @param {Object} param0
 * @param {String} param0.letter
 * @param {Function} param0.onClick
 * @param {GuessState} param0.letterState
 * @returns 
 */
function Letter({letter, onClick, letterState=GuessState.Unknown}) {
    return (<div onClick={() => onClick(letter)} className={"KeyboardLetter "+letterState.getCSSClass()}>
        {letter}
    </div>)
}


export default Keyboard;