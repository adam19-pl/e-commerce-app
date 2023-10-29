import styled from 'styled-components';

export const Wrapper = styled.div`
margin-top: 3rem;
width: 100%;
display: flex;
justify-content:center;
align-items: center;
text-align: center;
flex-direction: column;
.imageContainer img{
    max-width: 180px;
}
div{
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
}
a{  

    min-width: 80px;
    margin: 0 1rem;
    background-image: linear-gradient(to right, #051937, #044166, #006e94, #009ebe, #25d1e1);
    text-decoration: none;
    border-radius: 16px;
    padding: 0.5rem;
    color: white;
    transition: 500ms;
        &:hover{
            background-image: linear-gradient(to right, #25d1e1, #009ebe, #006e94, #044166, #051937);
            cursor: pointer;
        }
}
.borrow-link{
    background-image: linear-gradient(to right, #b4d49a, #9ecd7c, #87c55d, #6ebd3b, #50b500);
    &:hover{
            &:before {
            opacity: 0.5;
        }
            background-image: linear-gradient(to right, #50b500, #6ebd3b,  #87c55d, #9ecd7c, #b4d49a);
            cursor: pointer;
        }
}
table{
    margin: auto;
    width: 100%;
    td{
        text-align: center;
        margin: 1rem 0 1rem 0 ;
        justify-content: center;
        a{
            display: block;
            margin: 0.5rem 0.3rem;
        }
        div{
            width: 100%;
            justify-content: center;
            img{
                margin: auto;
            }
        }
    }
}
}
`