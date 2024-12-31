import React, { useState } from 'react';

export default function FooterTrigger({ setActivePopup }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <h1
      onClick={() => setActivePopup('about')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`trigger ${isHovered ? 'hovered' : ''}`}
    >
      A project by Azaria Kelman
    </h1>
  );
}
