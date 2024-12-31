import React from 'react';
import FooterTrigger from './footerTrigger';
import FooterPopup from './footerPopup';
import { useFooterState } from './useFooterState';
import './footer.css';

export default function Footer() {
  const { activePopup, setActivePopup } = useFooterState();
  
  return (
    <footer>
      <div className="footer">
        <FooterTrigger setActivePopup={setActivePopup} />
        <FooterPopup 
          activePopup={activePopup} 
          setActivePopup={setActivePopup} 
        />
      </div>
    </footer>
  );
}