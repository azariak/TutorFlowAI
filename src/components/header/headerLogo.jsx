import React from 'react';
import logo from '../../assets/logo.png';
import { useHeaderStyles } from './styles';

export function HeaderLogo() {
  const styles = useHeaderStyles();
  
  return (
    <h1 style={styles.logo}>
      <a href="https://tutorflowai.com" style={styles.logoLink}>
        <img src={logo} alt="TutorFlowAI" style={styles.logoImage} />
      </a>
    </h1>
  );
}