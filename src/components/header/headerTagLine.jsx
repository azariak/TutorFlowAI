import React, { useState } from 'react';
import { HelpPopup } from './helpPopup';
import { SettingsPopup } from './settingsPopup';
import helpIcon from '../../assets/icons/help-icon.png';
import settingsIcon from '../../assets/icons/settings-icon.png';
import githubIcon from '../../assets/icons/github-icon.png';
import { useHeaderStyles } from './styles';

export function HeaderTagline() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const styles = useHeaderStyles();

  return (
    <>
      <span style={styles.tagline}>
        Interactive Learning Made Simple (Beta).
        <a href='https://github.com/azariak/TutorFlowAI' target='_blank'>        <img
          src={githubIcon}
          alt="Source code"
          style={styles.githubIcon}
        /></a>
        <img
          src={helpIcon}
          alt="Help"
          style={styles.icon}
          onClick={() => setIsHelpOpen(true)}
        />
        <img
          src={settingsIcon}
          alt="Settings"
          style={styles.settingsIcon}
          onClick={() => setIsSettingsOpen(true)}
        />
      </span>
      <HelpPopup isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <SettingsPopup isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}