import styled from 'styled-components';
import backgroundImage from '../../assets/mailboxBG.jpg';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  flex-direction: column;
`;

export const LoginCard = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InvisibleBox = styled.div`
  visibility: hidden;
  height: 50px;
  width: 10px;
`;

export const FormCardRight = styled.div`
  ${props => (props.isMobile ? `width: 100vw` : `width: 700px`)};
  height: 800px;
  background-color: white;

  ${props =>
    props.isLaptop ? `border-radius: 48px` : `border-radius: 0 48px 48px 0`};

  display: flex;
  align-items: center;
  flex-direction: column;
  ${props =>
    props.isMobile ? `justify-content: start` : `justify-content: center`};
`;

export const LoginImageCardLeft = styled.div`
  width: 700px;
  height: 800px;

  border-top-left-radius: 48px;
  border-bottom-left-radius: 48px;

  background-image: url(${backgroundImage});

  background-size: 1350px 900px;
  background-position: 55% 20%;

  display: flex;
  justify-content: center;
  flex-direction: column;

  span {
    margin-top: 50px;
    font-size: 2.5rem;
    font-weight: bold;
  }
`;

export const LoginFormButton = styled.button`
  ${props => (props.isMobile ? `width: 85%` : `width: 570px;`)};
  height: 80px;
  margin: 40px 0 20px 0;
  padding: 20px;

  background-color: #59b1fc;

  border: none;
  border-radius: 15px;

  font-size: 2rem;
  font-weight: bold;
  color: white;

  cursor: pointer;
`;

export const LoginFormInput = styled.input`
  ${props => (props.isMobile ? `width: 80%` : `width: 550px;`)};
  height: 70px;
  margin: 10px;
  padding: 0 0 0 20px;

  border: 4px solid #a9a9a9;
  border-radius: 20px;

  font-size: 2rem;
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 1vw;
  padding-bottom: 20px;

  * {
    margin: 0 20px 0 20px;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    color: #a9a9a9;
  }
`;

export const Logo = styled.img`
  ${props => (props.isMobile ? `width: 250px` : `width: 320px`)};
  padding: 0 0 20px 0;
`;

export const GoogleLogo = styled.img`
  position: absolute;
  left: 30px;
  top: 12px;

  width: 50px;
  height: 50px;

  border: none;
  border-radius: 15px;
`;

export const LoginGoogleButton = styled.button`
  position: relative;

  ${props => (props.isMobile ? `width: 90%` : `width: 570px;`)};

  height: 80px;

  background-color: white;

  border: 3px solid #a9a9a9;
  border-radius: 15px;

  font-size: 1.8rem;
  font-weight: bold;
  color: #838383;

  cursor: pointer;
  + span {
    margin: 10px 20px 0 20px;
    font-size: 1.5rem;
    font-weight: bold;
    color: #a9a9a9;
  }
`;
