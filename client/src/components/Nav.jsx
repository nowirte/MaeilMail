import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100vw;
  height: 100px;

  .logo {
    margin-left: 200px;
  }

  .login {
    margin-right: 200px;

    input {
      background-color: #ff8303;
      color: white;
      border: none;
      border-radius: 13px;
      padding: 14px 12px;
      margin-left: 8px;
      width: 85px;
      height: 39px;
    }
  }
`;

const Navbar = () => {
  return (
    <header>
      <Nav>
        <span className="logo">logo영역</span>
        {/* 로그인/로그아웃 상태를 받아 && 이용하여 화면 구성 할 예정. 일단 로그아웃 상태만 디자인 */}
        <div className="login">
          <input type="button" value="로그인" />
          <input type="button" value="회원가입" />
        </div>
      </Nav>
    </header>
  );
};

export default Navbar;
