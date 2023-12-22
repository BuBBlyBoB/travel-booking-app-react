import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import App from './App';
import Registration from "./screens/registration";
import Dashboard from './screens/dashboard';
import Login from './screens/login';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    </BrowserRouter>
    </>


);