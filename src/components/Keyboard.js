import './Keyboard.css'
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { getGuessStates, cleanString } from '../utils/gameLogic'
import GuessState from '../utils/GuessState'
import PropTypes from 'prop-types';

/**
 * Given an answer and a list of guesses compute what the user knows which
 * letter and return as a map from letter to GuessState
 * @param {String[]} guesses 
 * @param {String} answer 
 * @returns {Map<String, GuessState>}
 */
function getLetterStates(guesses, answer) {
  const allStates = guesses
    .slice(0, -1)
    .map(g => getGuessStates(g, answer).map( (s,i) => [g[i], s]))
    .flat();
  
  const letterStates = new Map();
  allStates.forEach(([letter, state]) => {
    // The switch here to avoid setting a state for a letter that is
    // already "more correct"
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

/**
 * Component that contains all the typing logic for nerdle
 * @param {object} props 
 * @param {string[]} props.guesses
 * @param {string} props.answer
 * @param {func} props.onChange
 * @param {func} props.onSubmit
 * @returns {JSX.Element} Keyboard JSX
 */
function Keyboard({guesses, answer, onChange, onSubmit}) {
  const letterStates = getLetterStates(guesses, answer)
  const handleKeyDown = e => {
    switch(e.key) {
      case 'Backspace':
        onChange(guesses[guesses.length-1].slice(0,-1));
        break;
      case 'Enter':
        onSubmit();
        break;
      default:
        onChange(cleanString(guesses[guesses.length-1]+e.key));
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown);
  })
  const constructRow = row => [...row].map(l => <KeyboardLetter 
    key={`KeyboardLetter ${l}`} 
    letter={l} 
    letterState={letterStates.get(l)} 
    onClick={l => onChange(cleanString(guesses[guesses.length-1]+l))} />
  )
  
  const topRow = constructRow('QWERTYUIOP');
  const middleRow = constructRow('ASDFGHJKL');
  const bottomRow = constructRow('ZXCVBNM');
  const backspace = () => onChange(guesses[guesses.length-1].slice(0,-1));
  
  return (<div>
    <div className='KeyboardRow'>{topRow}</div>
    <div className='KeyboardRow'>{middleRow}</div>
    <div className='KeyboardRow'>
    <div
          className="WideKeyboardLetter KeyboardLetter" 
          onClick={onSubmit} ><FontAwesomeIcon icon={faCheckCircle} /></div>
      {bottomRow}
      <div
          className="WideKeyboardLetter KeyboardLetter" 
          onClick={backspace} ><FontAwesomeIcon icon={faBackspace} /></div>
    </div>
</div>);
}
Keyboard.propTypes = {
    guesses: PropTypes.arrayOf(PropTypes.string),
    answer: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
}

/**
 * 
 * @param {Object} props
 * @param {String} props.letter
 * @param {Function} props.onClick
 * @param {GuessState} props.letterState
 * @returns 
 */
function KeyboardLetter({letter, onClick, letterState=GuessState.Unknown}) {
    return (<div 
      onClick={() => onClick(letter)} 
      className={'KeyboardLetter '+letterState.getCSSClass()}>
        {letter}
    </div>)
}
KeyboardLetter.propTypes = {
    letter: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onClick: PropTypes.func,
    letterState: PropTypes.instanceOf(GuessState)
}


export default Keyboard;