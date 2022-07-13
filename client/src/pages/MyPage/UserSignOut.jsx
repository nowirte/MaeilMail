import React, { useState } from 'react';
import styled from 'styled-components';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { SettingBtn, ModalStyle } from './style';

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 13px;
`;

const Input = styled.input`
  padding: 5px 5px;
`;

const UserSignOutArea = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="setting">
      <SettingBtn className="userSignOut" onClick={handleOpen}>
        <DeleteForeverIcon />
        <p>회원 탈퇴</p>
      </SettingBtn>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="userSignOut-title"
        aria-describedby="userSignOut-description"
      >
        <ModalStyle>
          <Title id="userSignOut-title">정말 탈퇴하시겠습니까?</Title>
          <div id="userSignOut-description">
            탈퇴하시려면 현재 비밀번호를 입력해주세요.
          </div>
          <Input style={{ display: 'block' }} type="password" />
          <Button
            variant="outlined"
            onClick={handleClose}
            color="error"
            sx={{ mr: 1 }}
          >
            취소하기
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="error"
            disabled={false}
          >
            탈퇴하기
          </Button>
        </ModalStyle>
      </Modal>
    </div>
  );
};

export default UserSignOutArea;
