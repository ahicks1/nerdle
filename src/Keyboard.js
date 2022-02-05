import './Keyboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { getGuessStates, cleanString } from './gameLogic'
import GuessState from './utils/GuessState'

/**
 * 
 * @param {String[]} guesses 
 * @param {String} answer 
 * @returns {Map<String, GuessState>}
 */
function getLetterStates(guesses, answer) {
    const states = guesses.slice(0, -1).map(g => getGuessStates(g, answer).map( (s,i) => [g[i], s])).flat();
    const letterStates = new Map();
    states.forEach(([letter, state]) => {
        switch(state) {
            case GuessState.Wrong:
                if(letterStates.has(letter)) break;
                // falls through
            case GuessState.SemiCorrect:
                if(letterStates.get(letter) === GuessState.Correct) break;
                // falls through
            default:
                letterStates.set(letter, state);
        }
    });
    return letterStates;
}

function Keyboard({guesses, answer, onChange, onSubmit}) {
    const letterStates = getLetterStates(guesses, answer)

    const constructRow = row => [...row].map(l => <Letter key={`KeyboardLetter ${l}`} letter={l} letterState={letterStates.get(l)} onClick={l => onChange(cleanString(guesses[guesses.length-1]+l))} />)
    const topRow = constructRow("QWERTYUIOP");
    const middleRow = constructRow("ASDFGHJKL");
    const bottomRow = constructRow("ZXCVBNM");
    const backspace = () => onChange(guesses[guesses.length-1].slice(0,-1));
    
    
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