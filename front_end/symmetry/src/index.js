import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ManagerPage from './pages/ManagerPage';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
    <Route path="*" element={<Home />} />
    <Route path="/" element = {<Home/>}></Route>
    <Route path="/manager" element = {<ManagerPage/>}></Route>
    <Route path="/profile" element = {<ProfilePage/>}></Route>
    <Route path="/chat" element = {<ChatPage/>}></Route>




  
    </Routes>

    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//     <App />

reportWebVitals();
