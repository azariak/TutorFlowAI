import React from 'react';
import logo from '../../assets/brand/svgLogoWhite.svg';
import styles from './header.module.css';

export function HeaderLogo() {
  return (
    <h1 className={styles.logo}>
      <a href="https://tutorflowai.com" className={styles.logoLink}>
        <img src={logo} alt="TutorFlowAI" className={styles.logoImage} />
      </a>
    </h1>
  );
}
