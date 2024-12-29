import micIcon from '../assets/icons/mic-icon.png';

export default function Microphone() {
    return (

        <div style={{ 
            position: 'absolute',
            bottom: '10vh',
            marginLeft: '38vw' // Make it depend on other components.
        }}>
        <img 
            src={micIcon} 
            alt="Microphone" 
            style={{ width: '5vw', height: '5vw' }}
        /> </div>
    );
}
