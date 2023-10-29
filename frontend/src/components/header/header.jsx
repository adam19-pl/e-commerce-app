import React from "react";
import { Wrapper } from "./Header.styles";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        navigate('/logout');
    }
    const handleAddBook = () => {
        navigate('/add');
    }
    const handleSearch = () => {
        navigate('/search')
    }
    return (
        <Wrapper>
            <h2>Biblioteka</h2>
            <div className="menuContainer">
                <div>
                    <button onClick={handleSearch}>Szukaj</button>
                </div>
                <div>
                    <button onClick={handleAddBook}>Dodaj Książkę</button>
                </div>
                <div>
                    <button onClick={handleLogOut}>Wyloguj</button>
                </div>
            </div>
        </Wrapper>
    )
}

export default Header;