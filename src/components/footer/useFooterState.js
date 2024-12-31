import { useState } from 'react';

export function useFooterState() {
  const [activePopup, setActivePopup] = useState(null);
  return { activePopup, setActivePopup };
}
