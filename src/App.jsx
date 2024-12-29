import Whiteboard from './components/whiteboard';
import Header from './components/header';
import Footer from './components/footer';
import Chat from './components/chat/chat'
import Microphone from './components/microphone'
import './App.css';

import ReactGA from 'react-ga';

const TRACKING_ID = "G-6T856ZQMXX"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

export default function App() {
    return (
        <div>
            <Header />

            <Whiteboard />

            <Chat />

            <Microphone />

            <Footer />

            <Analytics />

        </div>
    );
}
