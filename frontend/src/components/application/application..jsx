import React from "react";
import { Wrapper } from "./Application.styles";
import Header from "../header/header";


import AuthenticatedContainer from "./authenticatedContainer/authenticatedContainer";
const Application = ({ dataBooks, userEmail }) => {

    return (
        <Wrapper>
            <Header />
            <AuthenticatedContainer dataBooks={dataBooks} userEmail={userEmail} />
        </Wrapper>
    )
}


export default Application;