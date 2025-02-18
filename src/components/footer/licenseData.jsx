export const licenseData = [
    { name: '@google/generative-ai', licenseType: 'Apache-2.0', version: '0.21.0', url: 'https://github.com/google/generative-ai-js' },
    { name: 'dotenv', licenseType: 'BSD-2-Clause', version: '16.4.7', url: 'https://github.com/motdotla/dotenv' },
    { name: 'react-dom', licenseType: 'MIT', version: '18.3.1', url: 'https://github.com/facebook/react' },
    { name: 'react-markdown', licenseType: 'MIT', version: '9.0.1', url: 'https://github.com/remarkjs/react-markdown' },
    { name: 'reactjs-popup', licenseType: 'MIT', version: '2.0.6', url: 'https://github.com/yjose/reactjs-popup' },
    { name: 'remark-math', licenseType: 'MIT', version: '6.0.1', url: 'https://github.com/remarkjs/remark-math' },
    { name: 'rehype-katex', licenseType: 'MIT', version: '7.0.0', url: 'https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex' },
    { name: 'katex', licenseType: 'MIT', version: '0.16.9', url: 'https://github.com/KaTeX/KaTeX' }
  ];
  
  // src/components/footer/useFooterState.js
  import { useState } from 'react';
  
  export function useFooterState() {
    const [activePopup, setActivePopup] = useState(null);
    return { activePopup, setActivePopup };
  }