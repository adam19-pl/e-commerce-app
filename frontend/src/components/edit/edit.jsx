import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Wrapper } from "./edit.styles";
import EditForm from "./EditForm/editform";

const EditProject = () => {
    const location = useLocation()
    const { from } = location.state
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/')
    }
    return (
        <Wrapper>
            <h2>Edytuj Produkt</h2>
            <EditForm product={from}/>
            <button onClick={handleGoBack} className="login-button">Go back</button>
        </Wrapper >
    );
};

export default EditProject;