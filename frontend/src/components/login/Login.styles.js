import styled from 'styled-components';

export const Wrapper = styled.div`
@media (max-width: 568px){

.textarea{
    max-width: 250px !important;
}
input{
    max-width: 250px !important;
}

}
margin-top:3rem;
display: flex;
justify-content:center;
align-items: center;
text-align: center;
flex-direction: column;


.text-input-error{
        border:1px solid red;
    }

.register-button{
        width: 140px;
        margin: 1rem auto;
        background-image: linear-gradient(to right, #051937, #044166, #006e94, #009ebe, #25d1e1);
        border: none;
        position:relative;
        border-radius: 16px;
        padding: 0.5rem;
        color: white;
        transition: 500ms;
        &:before {
            margin: 1rem auto;
            top: -50%;
            left: 0px;
            background-image: linear-gradient(to right, #25d1e1, #009ebe, #006e94, #044166, #051937);
            content: "Zarejestruj";
            padding: 0.5rem 0rem;
            border: none;
            border-radius: 16px;
            position: absolute;
            opacity: 0;
            width: 100%;
            z-index: 3;
            transition: opacity 700ms;
    }
    &:hover {
        &:before {
            opacity: 0.5;
        }
        cursor: pointer;
    }
    }
form{
    display: flex;
    flex-direction: column;
    .login-error{
        font-size: 0.8rem;
        color: red;
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
        font-style: italic;
        font-weight: 500;
    }
    
    label{
        margin-top: 0.5rem;
        margin-bottom: 0.3rem;
    }

    input{
        padding: 0.5rem;
        width: 400px;
        text-align: center;
        border: none;
        border-bottom: 1px solid blue;
        background-color: rgba(205,205,205,0.3);
        outline: none;
    
    }
    select{
        display: block;
        margin: 1rem auto 0 auto;
        width: 200px;
        text-align: center;
        outline: none;
        border: none;
        border-bottom: 1px solid blue;
    }
    
    .error{
        font-size: 0.8rem;
        color: red;
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
        font-style: italic;
        font-weight: 500;
    }
    button{
        width: 140px;
        margin: 1rem auto;
        background-image: linear-gradient(to right, #b4d49a, #9ecd7c, #87c55d, #6ebd3b, #50b500);
        border: none;
        border-radius: 16px;
        position:relative;
        padding: 0.5rem;
        color: white;
        transition: 500ms;
        &:before {
        margin: 1rem auto;
        top: -50%;
        left: 0px;
        background-image: linear-gradient(to right, #50b500, #6ebd3b,  #87c55d, #9ecd7c, #b4d49a);
        content: "Zaloguj";
        padding: 0.5rem 0rem;
        border: none;
        border-radius: 16px;
        position: absolute;
        opacity: 0;
        width: 100%;
        z-index: 3;
        transition: opacity 700ms;
    }
    &:hover {
        &:before {
            opacity: 0.5;
        }
        cursor: pointer;
    }
    }
}

`