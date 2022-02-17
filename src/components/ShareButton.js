import React, { useState } from 'react'
import PropTypes from 'prop-types';

function ShareButton({shareText, shareType, onDoneShare}) {

  const [isSharing, setIsSharing] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        [shareType]: shareText
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(console.error);
    } else {
      setIsSharing(true)
    }
  }

  if(isSharing) return <div>
      <textarea 
            readOnly
            type='text' 
            value={shareText} 
            rows={shareText.split('\n').length}
            cols={Math.max(...(shareText.split('\n').map(s => s.length)))}
            autoFocus
            onFocus={e => e.currentTarget.select()}
            onBlur={() => setIsSharing(false)}/>
  </div>

  return <div>
      <button onClick={handleShare}>Share</button>
  </div>
}
ShareButton.propTypes = {
    shareText: PropTypes.string,
    shareType: PropTypes.string,
    onDoneShare: PropTypes.func
}

export default ShareButton;