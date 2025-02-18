import React from 'react';

export default function AboutContent({ setActivePopup }) {
  return (
    <>
      <h2 className="modal-title">About TutorFlowAI</h2>
      <div className="modal-content">
        <p>
          {/* At TutorFlow, we’re reimagining education with the power of AI.  */}
        TutorFlow provides interactive tutoring that combines real-time voice communication, AI-powered feedback, and a digital whiteboard.
        Our chatbot interface help users grasp concepts more effectively with personalized, real-time insights. 
        As users engage with the whiteboard, the AI observes activity and provides helpful suggestions to deepen understanding. 
        Our mission is to create an intuitive, enjoyable, and efficient learning experience for everyone.
        </p>
      </div>
      <p className="copyright">
        Copyright © 2025 <a href="https://www.azariak.com/" target="_blank">Azaria Kelman</a>
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