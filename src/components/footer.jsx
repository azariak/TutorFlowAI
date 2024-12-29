import React, { useState } from 'react';
import Popup from 'reactjs-popup';

const Footer = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const licenseData = [
    { name: '@google/generative-ai', licenseType: 'Apache-2.0', version: '0.21.0', author: '' },
    { name: 'react-ga', licenseType: 'Apache License', version: '3.3.1', author: 'n/a' },
    { name: 'dotenv', licenseType: 'BSD-2-Clause', version: '16.4.7', author: 'n/a' },
    { name: 'license-report', licenseType: 'MIT', version: '6.7.1', author: 'Yaniv Kessler' },
    { name: 'react', licenseType: 'MIT', version: '18.3.1', author: 'n/a' },
    { name: 'react-dom', licenseType: 'MIT', version: '18.3.1', author: 'n/a' },
    { name: 'react-markdown', licenseType: 'MIT', version: '9.0.1', author: 'Espen Hovlandsdal' },
    { name: 'reactjs-popup', licenseType: 'MIT', version: '2.0.6', author: 'Youssouf EL AZIZI' },
    { name: 'tldraw', licenseType: 'tldraw license', version: '3.6.1', author: 'tldraw Inc.' }
  ];

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
        maxHeight: '90vh',
        position: 'relative',
        textAlign: 'center',
        overflowY: 'auto'
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
      },
      back: {
        position: 'absolute',
        left: '20px',
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
      cursor: 'pointer'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
      fontSize: '14px',
      color: '#fff'
    },
    th: {
      backgroundColor: '#2a2a2a',
      padding: '12px',
      textAlign: 'left',
      borderBottom: '1px solid #333'
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #333'
    }
  };

  const PopupContent = ({ type }) => {
    if (type === 'about') {
      return (
        <>
          <h2 style={styles.text.title}>About TutorFlowAI</h2>
          <div style={styles.text.content}>
            <p>
              TutorFlowAI is an interactive learning platform designed to make 
              education more accessible and engaging through AI-powered tutoring.
              Users can interact with our AI tutor through text or voice chat,
              while the model can see their work on the whiteboard in real-time.
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
            Built with open source software. 
            <p style={{ marginTop: '5px' }}>
              <span 
                onClick={() => setActivePopup('license')}
                style={styles.link}
              >
                View license information
              </span>
            </p>
          </div>
        </>
      );
    }
    
    return (
      <>
        <button 
          style={styles.controls.back}
          onClick={() => setActivePopup('about')}
        >
          ←
        </button>
        <h2 style={styles.text.title}>License Information</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>License Type</th>
                <th style={styles.th}>Version</th>
                <th style={styles.th}>Author</th>
              </tr>
            </thead>
            <tbody>
              {licenseData.map((item, index) => (
                <tr key={index}>
                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>{item.licenseType}</td>
                  <td style={styles.td}>{item.version}</td>
                  <td style={styles.td}>{item.author || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <footer>
      <div style={styles.footer}>
        <h1
          onClick={() => setActivePopup('about')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={styles.trigger}
        >
          A project by Azaria Kelman
        </h1>
        
        <Popup 
          open={activePopup !== null}
          onClose={() => setActivePopup(null)}
          modal
          overlayStyle={styles.modal.overlay}
          contentStyle={styles.modal.content}
        >
          <div style={styles.modal.popup}>
            <button 
              style={styles.controls.close} 
              onClick={() => setActivePopup(null)}
            >
              ×
            </button>
            <PopupContent type={activePopup} />
          </div>
        </Popup>
      </div>
    </footer>
  );
};

export default Footer;