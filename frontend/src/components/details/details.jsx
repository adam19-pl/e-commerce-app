import React, { useState, useEffect, } from "react";
import { useLocation } from 'react-router-dom'
import { Wrapper } from "./details.styles";
import { Link } from "react-router-dom";
import Moment from 'moment';
const Detail = () => {
    const location = useLocation()
    const { from } = location.state


    return (
        <Wrapper>
            <div className="detail-header">
                <h3>Szczegóły produktu</h3>
                <Link to="/">Wróć</Link>
            </div>
            <div><img src={from.image} width="300"/>
            </div>
            <h2>Nazwa: {from.name}</h2>
            <h2>Opis: {from.description}</h2>
            <h2>kategoria: {from.category.name}</h2>
            <h2>Cena : {from.price}</h2>
            <h2>Dodano : {Moment(from.add_date).format('DD-MM-YYYY')}</h2>
        </Wrapper>
    )
}
export default Detail;