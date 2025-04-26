import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ToDo from './pages/ToDo';  
import Counter from './pages/Counter';  
import './style/styles.css';

export default function App() {
    return (
        <BrowserRouter>
            <nav className='nav-list'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/ToDo">To Do List</Link></li>
                    <li><Link to="/Counter">Counter</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ToDo" element={<ToDo />} />
                <Route path="/Counter" element={<Counter />} />
            </Routes>
        </BrowserRouter>
    );
}