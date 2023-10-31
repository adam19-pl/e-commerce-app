import React from "react";
import { useNavigate } from 'react-router-dom';
import { Wrapper } from "./add.styles";
import CreateForm from "./CreateForm/createform";


const CreateProject = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/')
    }
    return (
        <Wrapper>
            <h2>Dodaj Produkt</h2>
            <CreateForm />
            <button onClick={handleGoBack} className="login-button">Go back</button>
        </Wrapper >
    );
};

export default CreateProject;