import React from 'react';
import { Route, Routes, } from 'react-router-dom';
import Home from '../../home/home';
import Delete from '../../delete/delete'

const AuthenticatedContainer = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/delete" element={<Delete/>} />
        </Routes>
    )
}

export default AuthenticatedContainer;