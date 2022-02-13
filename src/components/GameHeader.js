import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

function GameHeader({onBack, onShare}) {
    return <div className='gameHeader'>
        <div
          className="WideKeyboardLetter KeyboardLetter" 
          onClick={onBack} ><FontAwesomeIcon icon={faBackspace} /></div>
    </div>
}
GameHeader.propTypes = {
    onBack: PropTypes.func,
    onShare: PropTypes.func
}
export default GameHeader;