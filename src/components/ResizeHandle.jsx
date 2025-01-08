import React, { useState, useRef, useEffect } from 'react';

const ResizeHandle = ({ containerSelector, defaultWidth = '35vw' }) => {
  const [width, setWidth] = useState(defaultWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      const container = document.querySelector(containerSelector);
      if (container) {
        container.style.width = isMobileView ? '100%' : width;
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [containerSelector, width]);

  const handleDragStart = (e) => {
    if (isMobile) return;
    isDragging.current = true;
    startX.current = e.clientX;
    const container = document.querySelector(containerSelector);
    startWidth.current = container.getBoundingClientRect().width;
    document.body.style.cursor = 'col-resize';
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDrag = (e) => {
    if (!isDragging.current || isMobile) return;
    const delta = e.clientX - startX.current;
    const appContainer = document.querySelector('.app-container');
    const containerWidth = appContainer.getBoundingClientRect().width;
    const minWidth = Math.max(300, containerWidth * 0.2);
    const maxWidth = containerWidth * 0.6;
    
    const newWidth = Math.min(maxWidth, Math.max(minWidth, startWidth.current + delta));
    const newWidthVw = `${(newWidth / containerWidth) * 100}vw`;
    setWidth(newWidthVw);
    
    const container = document.querySelector(containerSelector);
    if (container) {
      container.style.width = newWidthVw;
    }
  };

  const handleDragEnd = () => {
    if (isMobile) return;
    isDragging.current = false;
    document.body.style.cursor = 'default';
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  const resetWidth = (e) => {
    if (isMobile) return;
    e.stopPropagation();
    setWidth(defaultWidth);
    const container = document.querySelector(containerSelector);
    if (container) {
      container.style.width = defaultWidth;
    }
  };

  if (isMobile) return null;

  return (
    <div
      onMouseDown={handleDragStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '4px',
        margin: '0 -12px', // Margin around resize, also gap between whiteboard and chat 
        cursor: 'col-resize',
        background: isHovered 
          ? 'linear-gradient(to right, rgba(255, 236, 209, 0.15), rgba(255, 236, 209, 0.3), rgba(255, 236, 209, 0.15))'
          : 'linear-gradient(to right, rgba(255, 236, 209, 0.05), rgba(255, 236, 209, 0.1), rgba(255, 236, 209, 0.05))',
        position: 'relative',
        zIndex: 10,
        userSelect: 'none',
        touchAction: 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <button
        onClick={resetWidth}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '16px',
          height: '16px',
          border: 'none',
          borderRadius: '50%',
          background: isHovered 
            ? 'rgba(255, 236, 209, 0.3)'
            : 'rgba(255, 236, 209, 0.15)',
          cursor: 'pointer',
          padding: 0,
          transition: 'all 0.3s ease',
          opacity: isHovered ? 1 : 0.5,
        }}
        title="Reset to default size"
      />
    </div>
  );
};

export default ResizeHandle;