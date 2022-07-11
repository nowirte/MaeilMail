import React from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Setting = styled.button`
  display: flex;
  align-items: center;
  font-size: 1rem;

  margin-left: 20px;

  border: none;
  background-color: white;

  > p {
    margin-left: 5px;
  }
`;

const SettingArea = () => {
  return (
    <div className="setting">
      <Setting className="userInfoEdit">
        <EditIcon />
        <p>회원정보 수정</p>
      </Setting>
      <Setting className="userSignOut">
        <DeleteForeverIcon />
        <p>회원 탈퇴</p>
      </Setting>
    </div>
  );
};

export default SettingArea;
