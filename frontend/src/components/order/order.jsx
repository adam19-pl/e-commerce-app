import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Wrapper } from "./order.styles";
import OrderForm from "./OrderForm/orderform";
// import CreateForm from "./CreateForm/createform";


const OrderProduct = () => {
    const location = useLocation();
    const { from } = location.state;
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/')
    }
    return (
        <Wrapper>
            <h2>Zamów Produkty</h2>
            <OrderForm orderList={from}/>
            <button onClick={handleGoBack} className="login-button">Go back</button>
        </Wrapper >
    );
};

export default OrderProduct;