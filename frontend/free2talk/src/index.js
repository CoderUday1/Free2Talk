import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'
import Home from './components/home';
import MeetPage from './components/meet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SocketProvider } from './providers/socket';
import { PeerProvider } from './providers/Peer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SocketProvider>
      <PeerProvider>
        <Router>
          <Routes>
              <Route path="/meet/:id" element={<MeetPage />} />
              <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </PeerProvider>
    </SocketProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
