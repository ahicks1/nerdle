import Keyboard from './Keyboard';
import GuessField from './GuessField';
import React from 'react';
import PropTypes from 'prop-types';
import { 
  getNewGameId, 
  createGameString, 
  parseGameString } from '../utils/gameLogic';
import { 
  useChangeCurrentGame, 
  useCurrentGameState } from '../utils/gameStateTools';
import GameHeader from './GameHeader';

/**
 * 
 * @param {object} props 
 * @returns 
 */
function MainGame({validGuesses, onWin}) {
  const [
    {guessState:guesses, answer}, 
    setGuesses
  ] = useCurrentGameState();

  const [, changeGameId] = useChangeCurrentGame();

  const isValidGuess = guess => { 
    return guess.length === 5 && 
    guesses.length <= 6 &&
    validGuesses.has(guess)
  };

  const handleSubmit = () => {
    const currentGuess = guesses[guesses.length-1];
    const gameString = createGameString(getNewGameId(),currentGuess);
    console.log(gameString)
    console.log(parseGameString(gameString))

    if (isValidGuess(currentGuess)) {
      if (currentGuess === answer || guesses.length === 6) {
        onWin(guesses, answer);
        setGuesses([...guesses,'']);
      } else {
        // Add a new blank guess to guesses
        setGuesses([...guesses,'']);
      }
    }
  }
  
  const updateGuesses = newGuess => {
    // Drop the current most recent guess and replace it with newGuess
    setGuesses([...guesses.slice(0, guesses.length-1), newGuess])
  }

  const guessRows = [...Array(6).keys()].map(i => <GuessField
        guess={guesses[i]??""} 
        answer={answer}
        submitted={guesses.length-1>i}
        key={`GuessField ${i}`} />
  );
  
  return (
    <div>
      <GameHeader onBack={() => changeGameId('')}/>
    <div className="MainGame">
        {guessRows}
        <Keyboard 
            answer={answer} 
            guesses={guesses} 
            onChange={updateGuesses} 
            onSubmit={handleSubmit} />
    </div>
    </div>
  );
}
MainGame.propTypes = {
  validGuesses: PropTypes.instanceOf(Set).isRequired,
  onWin: PropTypes.func,
  gameId: PropTypes.string
}

export default MainGame;
