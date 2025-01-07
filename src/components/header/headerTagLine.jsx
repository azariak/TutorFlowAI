import React, { useState, useEffect } from 'react';
import { HelpPopup } from './helpPopup';
import { SettingsPopup } from './settingsPopup';
import { GitHubPopup } from './githubPopup';  // Add this import
import helpIcon from '../../assets/icons/help-icon.png';
import settingsIcon from '../../assets/icons/settings-icon.png';
import githubIcon from '../../assets/icons/github-icon.png';
import styles from './header.module.css';

export function HeaderTagline() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGitHubOpen, setIsGitHubOpen] = useState(false);  // Add this state

  return (
    <>
      <span className={styles.tagline}>
        Interactive Learning Made Simple (Beta).
        <img 
          src={githubIcon} 
          alt="Source code" 
          className={styles.githubIcon}
          onClick={() => setIsGitHubOpen(true)}  // Change to onClick
          style={{ cursor: 'pointer' }}  // Add cursor pointer
        />
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
      <GitHubPopup isOpen={isGitHubOpen} onClose={() => setIsGitHubOpen(false)} />  {/* Add this line */}
    </>
  );
}

export default HeaderTagline;