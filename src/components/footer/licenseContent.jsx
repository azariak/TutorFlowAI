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
            </tr>
          </thead>
          <tbody>
            {licenseData.map((item, index) => (
              <tr key={index}>
                <td>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                </td>
                <td>{item.licenseType}</td>
                <td>{item.version}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="attribution">Any errors or omissions are accidental. </p>
      </div>
    </>
  );
}