import Whiteboard from './components/whiteboard';
import Header from './components/header';
import Footer from './components/footer';
import Chat from './components/chat/chat'
import './App.css';

export default function App() {
    return (
        <div>
            <Header />

            <Whiteboard />

            <Chat />

            <Footer />
        </div>
    );
}
