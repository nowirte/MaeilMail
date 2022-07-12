import React, { useState } from 'react';
// import styled from 'styled-components';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { SettingBtn, ModalStyle } from './style';

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
          <h2 id="userSignOut-title">정말 탈퇴하시겠습니까?</h2>
          <div id="userSignOut-description">
            탈퇴하시려면 현재 비밀번호를 입력해주세요.
            <input type="password" />
          </div>
          <Button onClick={handleClose}>아니요</Button>
          <Button type="submit" value="탈퇴하기">
            탈퇴하기
          </Button>
        </ModalStyle>
      </Modal>
    </div>
  );
};

export default UserSignOutArea;
