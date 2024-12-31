import React from 'react';

export default function AboutContent({ setActivePopup }) {
  return (
    <>
      <h2 className="modal-title">About TutorFlowAI</h2>
      <div className="modal-content">
        <p>
          TutorFlowAI is an interactive learning platform designed to make 
          education more accessible and engaging through AI-powered tutoring.
          Users can interact with our AI tutor through text or voice chat,
          while the model can see their work on the whiteboard in real-time.
        </p>
      </div>
      <h3 className="license-title">Licensing</h3>
      <p className="copyright">
        © 2024 Azaria Kelman. All rights reserved.
      </p>
      <p className="copyright">
        Contact: <a href="mailto:azaria.kelman@mail.utoronto.ca" className="link">
          azaria.kelman@mail.utoronto.ca
        </a>
      </p>
      <div className="attribution">
        Built using open source software. 
        <p className="license-link">
          <span onClick={() => setActivePopup('license')} className="link">
            View license information
          </span>
        </p>
      </div>
    </>
  );
}