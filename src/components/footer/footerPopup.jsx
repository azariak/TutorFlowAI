import React from 'react';
import Popup from 'reactjs-popup';
import AboutContent from './AboutContent';
import LicenseContent from './LicenseContent';

export default function FooterPopup({ activePopup, setActivePopup }) {
  return (
    <Popup 
      open={activePopup !== null}
      onClose={() => setActivePopup(null)}
      modal
      overlayStyle={{ background: 'rgba(0, 0, 0, 0.85)' }}
      contentStyle={{
        background: 'none',
        border: 'none',
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className="modal-popup">
        <button 
          className="close-button"
          onClick={() => setActivePopup(null)}
        >
          ×
        </button>
        {activePopup === 'about' ? (
          <AboutContent setActivePopup={setActivePopup} />
        ) : (
          <LicenseContent setActivePopup={setActivePopup} />
        )}
      </div>
    </Popup>
  );
}
