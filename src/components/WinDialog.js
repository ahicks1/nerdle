import { getShareText } from '../utils/gameLogic';
import './WinDialog.css'
import React from 'react'
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

function WinDialog({isOpen, onClose, guesses, answer}) {

  const text = isOpen?
      getShareText(
        guesses.slice(0, guesses.length-1),
        answer):
      "";
  const className = `Modal ${(isOpen?"ModalOpen":"ModalClosed")}`;

  return <div className={className} onClick={onClose} >
    <div className="ModalContent" onClick={e => e.stopPropagation()}>
      <pre>{text}</pre>
      <ShareButton shareText={text} shareType='text'/>
    </div>
  </div>
}
WinDialog.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    guesses: PropTypes.arrayOf(PropTypes.string),
    answer: PropTypes.string
}

export default WinDialog;