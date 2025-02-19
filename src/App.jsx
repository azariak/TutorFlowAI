import React from 'react';
import Whiteboard from './components/whiteboard/whiteboard';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Chat from './components/chat/chat';
import ResizeHandle from './components/ResizeHandle';

export default function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="header-container">
        <Header />
      </div>
      <div className="app-container">
        <div className="chat-container">
          <Chat />
        </div>
        <ResizeHandle containerSelector=".chat-container" defaultWidth="40vw" />
        <div className="whiteboard-container">
          <Whiteboard />
        </div>
      </div>
      <Footer />
    </div>
  );
}