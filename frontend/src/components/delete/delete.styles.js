import styled from 'styled-components';

export const Wrapper = styled.div`
margin-top: 3rem;
display: flex;
justify-content:center;
align-items: center;
text-align: center;
flex-direction: column;
a{
    width: 140px;
        margin: 1rem auto;
        background-color: rgba(14, 181, 92,0.8);
        border: none;
        border-radius: 16px;
        padding: 0.5rem;
        color: white;
        transition: 500ms;
        text-decoration: none;
        &:hover{
            background-color:rgba(25, 191, 86,1) ;
            cursor: pointer;
        }
}
button{
    width: 140px;
        margin: 1rem auto;
        background-color: rgba(252, 13, 97,0.8);
        border: none;
        border-radius: 16px;
        padding: 0.5rem;
        color: white;
        transition: 500ms;
        &:hover{
            background-color:rgba(252, 13, 97,1) ;
            cursor: pointer;
        }
}
`