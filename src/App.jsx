import Whiteboard from './components/whiteboard/whiteboard';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Chat from './components/chat/chat';
import Microphone from './components/microphone';

export default function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div className="app-container">
        <div className="chat-container">
          <Chat />
        </div>
        <div className="whiteboard-container">
          <Whiteboard />
        </div>
      </div>
      <Microphone />
      <Footer />
    </div>
  );
}