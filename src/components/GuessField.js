import './GuessField.css'
import React from 'react';
import { getGuessStates } from '../utils/gameLogic';
import GuessState from '../utils/GuessState';
import PropTypes from 'prop-types';

/**
 * A component representing a single player guess. 
 * Currently hardcoded to support only 5 letter games
 * @param {Object} props 
 * @param {string} props.guess Guess to display, 
 * partial guesses >5 letters are supported
 * @param {string} props.answer Answer used to compute guess states
 * @param {boolean} props.submitted Boolean to enable guess computation
 * @returns 
 */
function GuessField({ guess, answer, submitted }) {
    let [l1, l2, l3, l4, l5] = guess;
    let [c1, c2, c3, c4, c5] = submitted?getGuessStates(guess, answer):[];
    
    return (<div className="Guess-Field">
        <Letter letter={l1} guessState={c1}/>
        <Letter letter={l2} guessState={c2}/>
        <Letter letter={l3} guessState={c3}/>
        <Letter letter={l4} guessState={c4}/>
        <Letter letter={l5} guessState={c5}/>
    </div>)
}
GuessField.propTypes = {
    guess: PropTypes.string,
    answer: PropTypes.string,
    submitted: PropTypes.bool,
}

/**
 * Private component used by GuessField
 * @param {Object} props 
 * @param {GuessState} props.guessState
 * @param {string} props.letter
 * @returns {JSX.Element} a div representing a single letter of a guess
 */
function Letter({guessState=GuessState.Unknown, letter}) {
    return <div className={'Letter '+guessState.getCSSClass()}>
        {letter??''}
    </div>
}
Letter.propTypes = {
    guessState: PropTypes.instanceOf(GuessState),
    letter: PropTypes.string,
}

export default GuessField;