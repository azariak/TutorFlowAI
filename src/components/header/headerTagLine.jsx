import React, { useState, useEffect } from 'react';
import { HelpPopup } from './helpPopup';
import { SettingsPopup } from './settingsPopup';
import helpIcon from '../../assets/icons/help-icon.png';
import settingsIcon from '../../assets/icons/settings-icon.png';
import githubIcon from '../../assets/icons/github-icon.png';
import styles from './header.module.css';

export function HeaderTagline() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // // Toggle Help Popup when '?' key is pressed
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === '?') {
  //       setIsHelpOpen((prev) => !prev);
  //     }
  //     if (event.key === 'F12') {
  //       setIsSettingsOpen((prev) => !prev);
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);

  return (
    <>
      <span className={styles.tagline}>
        Interactive Learning Made Simple (Beta).
        <a href="https://github.com/azariak/TutorFlowAI" target="_blank" className={styles.githubLink}>
          <img src={githubIcon} alt="Source code" className={styles.githubIcon} />
        </a>
        <img
          src={helpIcon}
          alt="Help"
          className={styles.icon}
          onClick={() => setIsHelpOpen(true)}
        />
        <img
          src={settingsIcon}
          alt="Settings"
          className={styles.settingsIcon}
          onClick={() => setIsSettingsOpen(true)}
        />
      </span>
      <HelpPopup isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <SettingsPopup isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}

export default HeaderTagline;