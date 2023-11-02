import React from 'react';
import { Route, Routes, } from 'react-router-dom';
import Home from '../../home/home';
import Add from '../../add/add';
import Delete from '../../delete/delete';
import Details from '../../details/details';
import Edit from '../../edit/edit';
import OrderProduct from '../../order/order';

const AuthenticatedContainer = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/delete" element={<Delete />} />
            <Route path="/details" element={<Details />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/order" element={<OrderProduct />} />
        </Routes>
    )
}

export default AuthenticatedContainer;