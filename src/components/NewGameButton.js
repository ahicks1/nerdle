import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './GameList.css'
import { 
    cleanString, 
    getShareGameLink } from '../utils/gameLogic';
import ShareButton from './ShareButton';

function NewGameButton({wordList}) {
    const [shouldShare, setShouldShare] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const handleChange = e => {
        setInputValue(cleanString(e.target.value));
    }
    const isWordValid = wordList.has(inputValue);
    const className = 'GameListEntry';
    const handleDoneShare = () => {
        window.getSelection().removeAllRanges()
        setShouldShare(false)
    };
    return <div className={className}>
        <ToggleField
            defaultChildren={
                <div key="not other" onClick={e => setShouldShare(true)}> 
                    Share New game
                </div>
            }
            otherChildren={
                <div>
                <input 
                    type='text' 
                    value={inputValue} 
                    autoFocus 
                    onChange={handleChange}
                    onBlur={() => !inputValue&&handleDoneShare()} />
                {isWordValid && <div>
                    <ShareButton 
                      shareText={getShareGameLink(inputValue)} 
                      shareType='url' />
                    </div>
                }
                </div>
            }
            toggled={shouldShare}
        />
    </div>
}
NewGameButton.propTypes = {
    wordList: PropTypes.instanceOf(Set),
}
export default NewGameButton;

function ToggleField({defaultChildren, otherChildren, toggled, onToggle}) {
    if (!toggled) return defaultChildren;
    return otherChildren
}

function EnterWord({wordList}) {


    return <div>
        
        
    </div>
}
EnterWord.propTypes = {
    wordList: PropTypes.instanceOf(Set),
}
    