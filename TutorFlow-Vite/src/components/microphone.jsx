import micIcon from '../assets/icons/mic-icon.png';

export default function Microphone() {
    return (

        <div style={{ 
            position: 'absolute',
            bottom: '10vh',
            marginLeft: '38.5vw' 
        }}>
        <img 
            src={micIcon} 
            alt="Microphone" 
            style={{ width: '75px', height: '75px' }}
        /> </div>
    );
}
