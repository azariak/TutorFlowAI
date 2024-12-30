import { useState } from 'react';
import { exportToBlob, Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

export default function App() {
    const whiteboardWidth = 55;
    const marginLeft = 100 - whiteboardWidth;
    const whiteboardHeight = 77;
    const marginTop = 92 - whiteboardHeight;

    const [editor, setEditor] = useState(null);

    // Function to capture and return the current whiteboard state
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
        <div style={{
            position: 'fixed',
            inset: 0,
            width: `${whiteboardWidth}vw`,
            height: `${whiteboardHeight}vh`,
            marginLeft: `${marginLeft}vw`,
            marginTop: `${marginTop}vh`
        }}>
            <Tldraw
                onMount={(editorInstance) => {
                    setEditor(editorInstance);
                    editorInstance.user.updateUserPreferences({ colorScheme: 'dark' }, editorInstance);
                }}
            />
        </div>
    );
}