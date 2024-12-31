import React from 'react';
import { HeaderLogo } from './headerLogo';
import { HeaderTagline } from './headerTagLine';
import { useHeaderStyles } from './styles';

export default function Header() {
  const styles = useHeaderStyles();
   
  return (
    <header>
      <div style={styles.header}>
        <HeaderLogo />
        <HeaderTagline />
      </div>
    </header>
  );
}
