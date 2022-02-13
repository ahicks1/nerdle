import { getShareText } from '../utils/gameLogic';
import './WinDialog.css'
import React from 'react'
import PropTypes from 'prop-types';

function WinDialog({isOpen}) {

  const text = isOpen?
      getShareText(isOpen.slice(0, isOpen.length-1), isOpen[isOpen.length-1]):
      "";

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        text
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(console.error);
    } else {
      // TODO: Fallback 
    }
  }
  const className = `Modal ${(isOpen!==undefined?"ModalOpen":"ModalClosed")}`;

  return <div className={className}>
    <div className="ModalContent">
      <pre>{text}</pre>
      <button onClick={handleShare}>Share</button>
    </div>
  </div>
}
WinDialog.propTypes = {
    isOpen: PropTypes.arrayOf(PropTypes.string)
}

export default WinDialog;