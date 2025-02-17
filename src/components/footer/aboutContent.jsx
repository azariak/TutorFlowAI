import React from 'react';

export default function AboutContent({ setActivePopup }) {
  return (
    <>
      <h2 className="modal-title">About TutorFlowAI</h2>
      <div className="modal-content">
        <p>
          At TutorFlowAI, we’re reimagining education with the power of AI. 
          Our platform combines advanced tutoring models with real-time text and voice communication, 
          making learning more interactive and personalized. 
          The AI continuously monitors whiteboard activity, offering insights and feedback tailored to each user's needs. 
          Our mission is to create an intuitive, enjoyable, and efficient learning experience for everyone.
        </p>
      </div>
      <p className="copyright">
        © 2025 <a href="https://www.azariak.com/" target="_blank">Azaria Kelman. </a>
      </p>
      <p className="copyright">
        <a href="mailto:azaria.kelman@mail.utoronto.ca?subject=TutorFlowAI%20-%20">
          azaria.kelman@mail.utoronto.ca
        </a>
      </p>
      <div className="attribution">
        Built using open source software. 
        <p className="license-link">
          <span onClick={() => setActivePopup('license')} className="popupLink">
            View license information
          </span>
        </p>
      </div>
      
    </>
  );
}