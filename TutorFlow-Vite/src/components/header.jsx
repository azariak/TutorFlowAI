import downloadIcon from '../assets/icons/download-icon.png';
import settingsIcon from '../assets/icons/settings-icon.png';
import helpIcon from '../assets/icons/help-icon.png';


export default function Header() {
    return (
        <header>
            <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginLeft: '3vw',
                marginRight: '5vw',
                marginTop: '3vh',
                fontSize: '22px'
            }}>
                <h1 style={{ margin: 0 }}>
                    TutorFlowAI
                </h1>
                <span style={{
                    fontSize: '22px', // Smaller font size for the latter half
                }}>
                    Interactive Learning Made Simple. 

                    <img 
                                src={downloadIcon} 
                                alt="Download" 
                                style={{ width: '2vw', height: '2vw', marginLeft: '1vw', verticalAlign: 'text-top' }}

                    />

                    <img 
                                src={helpIcon} 
                                alt="Help" 
                                style={{ width: '2vw', height: '2vw', marginLeft: '0.5vw', verticalAlign: 'text-top' }}

                    />

                    <img 
                                src={settingsIcon} 
                                alt="Settings" 
                                style={{ width: '2vw', height: '2vw', marginLeft: '0.5vw', verticalAlign: 'text-top' }}

                    />

                </span>
            </div>
        </header>
    );
}
