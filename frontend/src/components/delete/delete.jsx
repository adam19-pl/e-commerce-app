import React from "react"
import { Wrapper } from "./delete.styles";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";

const Delete = () => {
    const location = useLocation()
    const { from } = location.state
    const navigate = useNavigate();
    function handleClick() {
        axiosInstance.delete('products/' + from._id + '/').then((res) => {
            navigate('/');
        }).catch((error) => {
            console.log(error.response);
        })
    }
    return (
        <Wrapper>
            {from.is_owner ? <>
                <h2>Jesteś pewien, że chcesz usunąć produkt?</h2>
                <button className="delete-project-button" type="submit" onClick={handleClick}>Usuń</button>
            </> : <h2>Nie masz odpowiednich uprawnień do usunięcia produktu</h2>}
            <Link to="/">Wróć</Link>
        </Wrapper>
    )
}
export default Delete;