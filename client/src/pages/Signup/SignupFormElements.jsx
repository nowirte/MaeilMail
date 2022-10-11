import styled from 'styled-components';

export const GenderContainer = styled.div`
  display: flex;
  border-radius: 20px;
`;

export const Male = styled.input`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border: 4px solid #a9a9a9;

  display: none;

  width: 110px;
  font-size: 2rem;

  + label {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 60px;
    width: 110px;

    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border: 4px solid #a9a9a9;
    background: white;
    color: #a9a9a9;

    cursor: pointer;

    font-size: 2rem;
  }

  &:checked + label {
    background: #59b1fc;
    color: white;
  }
`;

export const Female = styled.input`
  display: none;

  + label {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 60px;
    width: 110px;

    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border: 4px solid #a9a9a9;
    background: white;
    color: #a9a9a9;
    cursor: pointer;

    font-size: 2rem;
  }
  &:checked + label {
    background: #59b1fc;
    color: white;
  }
`;

export const LocationContainer = styled.div`
  height: 50px;
  width: 330px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 5px;

  border-radius: 20px;
  border: 4px solid #a9a9a9;

  font-size: 1.5rem;
`;

export const Location = styled.img`
  width: 40px;
  height: 40px;

  border: none;
`;

export const Refresh = styled.img`
  width: 40px;
  height: 40px;

  border: none;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 670px;
  margin: 40px 0;
`;

export const SignupCard = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 900px;
  height: 1100px;

  border-radius: 48px;

  background-color: white;
`;

export const LoginInput = styled.input`
  width: 650px;
  height: 70px;
  margin: 10px;
  padding: 0 0 0 20px;

  border: 4px solid #a9a9a9;
  border-radius: 20px;

  font-size: 2rem;
`;

export const LoginButton = styled.button`
  width: 670px;
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
  &:disabled {
    background-color: #dddddd;
  }
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
  width: 300px;
`;
