import './App.css';
import React from 'react';
import MainGame from './components/MainGame';
import {getWordSet } from './utils/gameLogic';
import GameList from './components/GameList';
import { useChangeCurrentGame, useGamesList } from './utils/gameStateTools';

function App() {
  const validGuesses = getWordSet();
  // TODO: improve win detection logic
  const [games] = useGamesList();
  const [currentGame, setGame] = useChangeCurrentGame();
  
  return (
    <div className="App">
      <header className="App-header">
        {!currentGame && <GameList 
          games={games.map(gameId => ({gameId}))} 
          onSelect={gameId => {
            console.log("Setting current game id "+gameId)
            setGame(gameId)
            }}
          wordList={validGuesses}/>}
        {currentGame && <MainGame 
            key={currentGame}
            gameId={currentGame}
            validGuesses={validGuesses}/>}
      </header>
    </div>
  );
}

export default App;
