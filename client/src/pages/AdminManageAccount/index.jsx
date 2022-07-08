import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bolder;
  margin: 50px;
`;

const UserInfoTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  align-items: center;
  text-align: center;

  background-color: #ff8303;

  width: 1200px;
  height: 80px;

  font-size: 1.5rem;
  color: whitesmoke;
  font-weight: bold;
  border-radius: 5px;
`;

const UserInfoContents = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  align-items: center;
  text-align: center;

  width: 1200px;
  height: 80px;

  border-bottom: 1px solid #ff8303;
  color: #000000a2;

  font-size: 1.5rem;
`;

const UserInfoItems = styled.div`
  margin: 20px;
`;

const UserState = styled.select`
  width: 120px;
  height: 50px;

  border-radius: 5px;
  text-align: center;

  appearance: none;
`;

const AdminManageAccount = () => {
  return (
    <Container>
      <Title>유저 관리</Title>
      <UserInfoTitle>
        <UserInfoItems>이름</UserInfoItems>
        <UserInfoItems>이메일</UserInfoItems>
        <UserInfoItems>닉네임</UserInfoItems>
        <UserInfoItems>계정</UserInfoItems>
      </UserInfoTitle>
      <UserInfoContents>
        <UserInfoItems>이주혁</UserInfoItems>
        <UserInfoItems>e-mail@email.com</UserInfoItems>
        <UserInfoItems>NickName</UserInfoItems>
        <UserInfoItems>
          <UserState>
            <option value="normal">일반</option>
            <option value="admin">관리자</option>
            <option value="stop">제제</option>
          </UserState>
        </UserInfoItems>
      </UserInfoContents>
      <div>pagination space</div>
    </Container>
  );
};

export default AdminManageAccount;
