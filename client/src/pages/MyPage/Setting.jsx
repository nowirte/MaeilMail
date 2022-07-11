import React, { useState } from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const Setting = styled.button`
  display: flex;
  align-items: center;
  font-size: 1rem;

  margin-left: 20px;

  border: none;
  background-color: white;

  cursor: pointer;
  > p {
    margin-left: 5px;
  }
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SettingArea = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="setting">
      <Setting className="userInfoEdit" onClick={handleOpen}>
        <EditIcon />
        <p>회원정보 수정</p>
      </Setting>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="userInfoEdit-title"
        aria-describedby="userInfoEdit-description"
      >
        <Box sx={style}>
          <h2 id="userInfoEdit-title">회원정보 수정</h2>
          <p id="userInfoEdit-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
      <Setting className="userSignOut" onClick={handleOpen}>
        <DeleteForeverIcon />
        <p>회원 탈퇴</p>
      </Setting>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="userSignOut-title"
        aria-describedby="userSignOut-description"
      >
        <Box sx={style}>
          <h2 id="userSignOut-title">정말 탈퇴하시겠습니까?</h2>
          <div id="userSignOut-description">
            탈퇴하시려면 현재 비밀번호를 입력해주세요.
            <input type="password" />
          </div>
          <Button onClick={handleClose}>아니요</Button>
          <Button type="submit" value="탈퇴하기">
            탈퇴하기
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SettingArea;
