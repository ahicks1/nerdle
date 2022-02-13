import React from 'react';
import PropTypes from 'prop-types';
import './GameList.css'
import { getGameFromLocalStorage } from '../utils/gameStateTools';

function GameList({games, onSelect}) {
    console.log(games)
    const gameEntries = games
    .map(({gameId},i) => <GameListEntry 
    key={`GLE${i}`} 
    onSelect={onSelect}
    gameName={gameId} />);
    return <div className="GameList" onSelect={onSelect}>{gameEntries}</div>
}
GameList.propTypes = {
    games: PropTypes.arrayOf(PropTypes.object),
    onSelect: PropTypes.func
}

function computeGameStateColor({answer, guessState}) {
    if(guessState.length === 1) return 'Unknown'
    if(guessState[guessState.length-2] === answer) return 'Correct'
    if(guessState.length > 6) return 'Wrong'
    return 'SemiCorrect'
}

function GameListEntry({gameName, onSelect}) {
    const gameState = getGameFromLocalStorage(gameName)
    const classColor = computeGameStateColor(gameState)
    const createDay = new Date(gameState.creationTime).toLocaleDateString();
    const answerString = (classColor==='Correct'||classColor==='Wrong')?
        gameState.answer:'?????'
    return <div 
        className={`GameListEntry ${classColor}`} 
        onClick={() => onSelect(gameName)}>{ 
            `${answerString} ${gameState.guessState.length-1}/6 ` +
            `started on ${createDay}`
        
        }
    </div>;
}
GameListEntry.propTypes = {
    gameName: PropTypes.string,
    onSelect: PropTypes.func
}
export default GameList;