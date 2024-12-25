
export default function App() {

    const chatWidth = 35;
    const marginLeft = 2;

    const chatHeight = 77;
    const marginTop = 92 - chatHeight;
    
    return (
        <div style={{ 
            position: 'fixed', 
            inset: 0, 
            width: `${chatWidth}vw`, 
            height: `${chatHeight}vh`,
            marginLeft: `${marginLeft}vw`, 
            marginTop: `${marginTop}vh`,
            backgroundColor: '#FFECD1',
            borderRadius: '25px'
            }}>
            
        </div>
    )
}