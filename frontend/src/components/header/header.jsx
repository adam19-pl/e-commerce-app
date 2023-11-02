import React from "react";
import { Wrapper } from "./Header.styles";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        navigate('/logout');
    }
    return (
        <Wrapper>
            <h2>E-Commerce</h2>
            <div className="menuContainer">
                <div>
                    <button onClick={handleLogOut}>Wyloguj</button>
                </div>
            </div>
        </Wrapper>
    )
}

export default Header;