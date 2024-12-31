import React from 'react';
import { licenseData } from './licenseData';

export default function LicenseContent({ setActivePopup }) {
  return (
    <>
      <button 
        className="back-button"
        onClick={() => setActivePopup('about')}
      >
        ←
      </button>
      <h2 className="modal-title">License Information</h2>
      <div className="table-container">
        <table className="license-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>License Type</th>
              <th>Version</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {licenseData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.licenseType}</td>
                <td>{item.version}</td>
                <td>{item.author || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}