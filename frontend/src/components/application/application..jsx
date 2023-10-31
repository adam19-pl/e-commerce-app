import React from "react";
import { Wrapper } from "./Application.styles";
import Header from "../header/header";


import AuthenticatedContainer from "./authenticatedContainer/authenticatedContainer";
const Application = () => {

    return (
        <Wrapper>
            <Header />
            <AuthenticatedContainer />
        </Wrapper>
    )
}


export default Application;