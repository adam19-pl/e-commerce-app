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

.login-button{
        width: 140px;
        margin: 1rem auto;
        background-color: rgba(3, 198, 252,1);
        border: none;
        border-radius: 16px;
        padding: 0.5rem;
        color: white;
        transition: 500ms;
        &:hover{
            background-color: rgba(3, 123, 252,0.8);
            cursor: pointer;
        }
    }

form{
    display: flex;
    flex-direction: column;

    .email-error{
        font-size: 0.8rem;
        color: red;
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
        font-style: italic;
        font-weight: 500;
    }

    .text-input-error{
        border:1px solid red;
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

    .textarea{
        width: 400px;
        height: 300px;
    }
    .textarea-error{
        width: 400px;
        height: 300px;  
        border:1px solid red;
    }
    select{
        display: block;
        margin: 1rem auto 0 auto;
        padding: 0.5rem;
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

    .select-error{
        padding: 0.5rem;
        border: 1px solid red;
    }


    }
    .create-project-button{
        width: 140px;
        margin: 1rem auto;
        background-color: rgba(14, 181, 92,0.8);
        border: none;
        border-radius: 16px;
        padding: 0.5rem;
        color: white;
        transition: 500ms;
        &:hover{
            background-color:rgba(25, 191, 86,1) ;
            cursor: pointer;
        }
    }
}
`