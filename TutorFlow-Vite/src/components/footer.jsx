import React, { useState } from 'react';
import Popup from 'reactjs-popup';

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    footer: {
      position: 'absolute',
      bottom: 0,
      marginLeft: '40.5vw',
      fontSize: '11px'
    },
    trigger: {
      cursor: 'pointer',
      textDecoration: isHovered ? 'underline' : 'none',
      transition: 'text-decoration 0.2s ease'
    },
    modal: {
      overlay: {
        background: 'rgba(0, 0, 0, 0.85)'
      },
      content: {
        background: 'none',
        border: 'none',
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      popup: {
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        maxWidth: '600px',
        position: 'relative',
        textAlign: 'center'
      }
    },
    text: {
      title: {
        fontSize: '20px',
        marginBottom: '25px'
      },
      content: {
        fontSize: '15px',
        lineHeight: 1.8,
        marginBottom: '30px'
      },
      licenseTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '15px'
      },
      copyright: {
        marginBottom: '20px'
      },
      attribution: {
        fontSize: '13px',
        color: '#888',
        marginTop: '25px'
      }
    },
    controls: {
      close: {
        position: 'absolute',
        right: '20px',
        top: '20px',
        cursor: 'pointer',
        fontSize: '24px',
        color: '#888',
        background: 'none',
        border: 'none',
        padding: 0
      }
    },
    link: {
      color: '#888',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  };

  const dependencies = [
    { name: 'React', url: 'https://github.com/facebook/react', license: 'MIT License' },
    { name: 'React-Markdown', url: 'https://github.com/remarkjs/react-markdown', license: 'MIT License' },
    { name: 'reactjs-popup', url: 'https://github.com/yjose/reactjs-popup', license: 'MIT License' },
    { name: 'dotenv', url: 'https://github.com/motdotla/dotenv', license: 'BSD-2-Clause' },
    { name: 'Vite', url: 'https://github.com/vitejs/vite', license: 'MIT' }
  ];

  return (
    <footer>
      <div style={styles.footer}>
        <h1
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={styles.trigger}
        >
          A project by Azaria Kelman
        </h1>
        
        <Popup 
          open={isOpen} 
          onClose={() => setIsOpen(false)}
          modal
          overlayStyle={styles.modal.overlay}
          contentStyle={styles.modal.content}
        >
          <div style={styles.modal.popup}>
            <button 
              style={styles.controls.close} 
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <h2 style={styles.text.title}>About TutorFlowAI</h2>
            <div style={styles.text.content}>
              <p>
                TutorFlowAI is an interactive learning platform designed to make 
                education more accessible and engaging through AI-powered tutoring.
                Users can interact with our AI tutor through text or voice chat,
                while the AI can see their work on the whiteboard in real-time.
              </p>
            </div>
            <h3 style={styles.text.licenseTitle}>Licensing</h3>
            <p style={styles.text.copyright}>
              © 2024 Azaria Kelman. All rights reserved.
            </p>
            <p style={styles.text.copyright}>
              Contact: <a href="mailto:azaria.kelman@mail.utoronto.ca" style={styles.link}>
                azaria.kelman@mail.utoronto.ca
              </a>
            </p>
            <div style={styles.text.attribution}>
              Built with:
              <p style={{ marginTop: '5px' }}>
                {dependencies.map(({ name, url, license }) => (
                  <React.Fragment key={name}>
                    <a 
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.link}
                    >
                      {name} ({license})
                    </a>
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </Popup>
      </div>
    </footer>
  );
};

export default Footer;