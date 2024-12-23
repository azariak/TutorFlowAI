import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

export default function App() {

    const whiteboardWidth = 55;
    const marginLeft = 100 - whiteboardWidth;

    const whiteboardHeight = 80;
    const marginTop = 95 - whiteboardHeight;
    
    return (
        <div style={{ 
            position: 'fixed', 
            inset: 0, 
            width: `${whiteboardWidth}vw`, 
            height: `${whiteboardHeight}vh`,
            marginLeft: `${marginLeft}vw`, 
            marginTop: `${marginTop}vh`
        }}>
            <Tldraw inferDarkMode={true} />
        </div>
    )
}