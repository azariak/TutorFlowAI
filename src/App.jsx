import Whiteboard from './components/whiteboard';
import Header from './components/header/header';
import Footer from './components/footer';
import Chat from './components/chat/chat'
import Microphone from './components/microphone'
import './App.css';

export default function App() {
    return (
        <div>
            <Header />

            <Whiteboard />

            <Chat />

            <Microphone />

            <Footer />

        </div>
        
    );
}
