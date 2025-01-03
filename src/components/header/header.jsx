import React from 'react';
import { HeaderLogo } from './headerLogo';
import { HeaderTagline } from './headerTagLine';
import styles from './header.module.css';

export default function Header() {
  return (
    <header>
      <div className={styles.header}>
        <HeaderLogo />
        <HeaderTagline />
      </div>
    </header>
  );
}