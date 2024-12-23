// import icon from './assets/icons/downloadIcon.png';

export default function Header() {
    return (
        <header>
            <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginLeft: '2vw',
                marginRight: '2vw',
                fontSize: '22px'
            }}>
                <h1 style={{ margin: 0 }}>
                    TutorFlow
                </h1>
                <span style={{
                    fontSize: '22px', // Smaller font size for the latter half
                }}>
                    Interactive Learning Made Simple.
                </span>
            </div>
        </header>
    );
}
