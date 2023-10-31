import React from 'react';
import { Route, Routes, } from 'react-router-dom';
import Home from '../../home/home';
import Delete from '../../delete/delete'
import Details from '../../details/details'
import Add from '../../add/add'

const AuthenticatedContainer = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/delete" element={<Delete />} />
            <Route path="/details" element={<Details />} />
            <Route path="/add" element={<Add />} />
        </Routes>
    )
}

export default AuthenticatedContainer;