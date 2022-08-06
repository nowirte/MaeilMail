import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavList = styled.input`
display: none;

+label:hover{
    background-color:white;
    color:#474747;
}

+label {
    cursor: pointer;
    font-size: 32px;
    border-radius: 5px;
    margin: 5px 10px;
    padding: 15px 0 15px 30px;
    border: none;
    background-color:#40577A;
    color:white;
    justify-content: start;
    align-items: center;
}
&:checked + label {
    background: white;
    color: #474747;
  }
`

export const StyledLink = styled(Link)`
text-decoration: none;
`;

export const Line = styled.hr`
width: 90%;
background-color: #e0e0e0;
`;

export const Logo = styled.img`
width: 50%;
display: block;
margin: 0px auto;
padding-top: 0.25rem;
`;

export const NavTop = styled.div`
height: 140px;
border-radius: 0.25rem;
width: 100%;
`;