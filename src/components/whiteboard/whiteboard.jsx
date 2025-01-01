// components/whiteboard/whiteboard.jsx
import { useState } from 'react';
import { exportToBlob, Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import styles from './whiteboard.module.css';

export default function Whiteboard() {
  const [editor, setEditor] = useState(null);

  window.captureWhiteboardImage = async () => {
    if (!editor) return null;
    
    const shapeIds = editor.getCurrentPageShapeIds();
    if (shapeIds.size === 0) {
      console.log('No shapes on the canvas');
      return null;
    }
    
    try {
      const blob = await exportToBlob({
        editor,
        ids: [...shapeIds],
        format: 'png',
        opts: { background: false },
      });
      
      return window.URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error capturing whiteboard:', error);
      return null;
    }
  };

  return (
    <div className={styles.whiteboardWrapper}>
      <Tldraw
        onMount={(editorInstance) => {
          setEditor(editorInstance);
          editorInstance.user.updateUserPreferences({ colorScheme: 'dark' });
          editorInstance.setCurrentTool('draw');
        }}
      />
    </div>
  );
}