import styled from 'styled-components';

export const Wrapper = styled.div`
margin-top: 3rem;
width: 100%;
display: flex;
justify-content:center;
align-items: center;
text-align: center;
flex-direction: column;
.detail-header{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    a{
        min-width: 80px;
    margin: 0 1rem;
    
    background-color: rgba(3, 198, 252,1);
    text-decoration: none;
    border-radius: 16px;
    padding: 0.5rem;
    color: white;
    transition: 500ms;
        &:hover{
            background-color: rgba(3, 123, 252,0.8);
            cursor: pointer;
        }
    }
}

.comment{
    word-break: break-all;
    max-width: 500px;
    margin: 1rem auto;
    padding: 1rem;
    border: 1px solid grey;
    border-radius: 16px;
    background-color: rgba(0,0,0,0.1);
    h4{
        margin:0 auto;
        font-size: 0.8rem;
    }
    h2{
        font-size: 18px;
    }

 
}
.autor-comment{
        background-color: rgba(149, 189, 245,0.5);
    }

`