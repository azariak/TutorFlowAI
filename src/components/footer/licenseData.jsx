export const licenseData = [
    { name: '@google/generative-ai', licenseType: 'Apache-2.0', version: '0.21.0', author: '' },
    { name: 'dotenv', licenseType: 'BSD-2-Clause', version: '16.4.7', author: '' },
    { name: 'react-dom', licenseType: 'MIT', version: '18.3.1', author: '' },
    { name: 'react-markdown', licenseType: 'MIT', version: '9.0.1', author: 'Espen Hovlandsdal' },
    { name: 'reactjs-popup', licenseType: 'MIT', version: '2.0.6', author: 'Youssouf El Azizi' },
    { name: 'remark-math', licenseType: 'MIT', version: '6.0.1', author: '' },
    { name: 'rehype-katex', licenseType: 'MIT', version: '7.0.0', author: '' },
    { name: 'katex', licenseType: 'MIT', version: '0.16.9', author: '' }
  ];
  
  // src/components/footer/useFooterState.js
  import { useState } from 'react';
  
  export function useFooterState() {
    const [activePopup, setActivePopup] = useState(null);
    return { activePopup, setActivePopup };
  }