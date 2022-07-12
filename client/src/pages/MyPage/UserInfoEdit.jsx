import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SettingBtn, ModalStyle } from './style';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#59B1FC',
      contrastText: '#fff',
    },
  },
});

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
`;

const UserInfoEditArea = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  return (
    <div className="setting">
      <SettingBtn className="userInfoEdit" onClick={handleOpen}>
        <EditIcon />
        <p>회원정보 수정</p>
      </SettingBtn>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="userInfoEdit-title"
        aria-describedby="userInfoEdit-description"
      >
        <ModalStyle>
          {/* 모달 스타일 박스 쉐도우 값 설정 필요 */}
          <Title id="userInfoEdit-title">회원정보 수정</Title>
          <div id="userInfoEdit-description">
            <form className="userInfoEditForm">
              <label htmlFor="nickName">
                닉네임
                <input id="nickName" type="text" placeholder="닉네임" />
              </label>
              <label htmlFor="introduction">
                한 줄 소개
                <input id="introduction" type="text" placeholder="한 줄 소개" />
              </label>
              <label htmlFor="emoji">
                프로필을 선택해주세요.
                <select name="emoji" id="emoji">
                  <option value="">선택해주세요.</option>
                  <option value="angel">😇</option>
                  <option value="lovely">😍</option>
                  <option value="smile">😁</option>
                </select>
              </label>
              <label htmlFor="topic">
                관심사를 선택해주세요.
                <select name="topic" id="topic">
                  <option value="">선택해주세요.</option>
                  <option value="movie">영화</option>
                  <option value="language">언어</option>
                  <option value="reading">독서</option>
                </select>
              </label>
              <label htmlFor="language">
                사용할 수 있는 언어를 선택해주세요.
                <select name="language" id="language">
                  <option value="">선택해주세요.</option>
                  <option value="korean">한국어</option>
                  <option value="english">영어</option>
                  <option value="chinese">중국어</option>
                </select>
              </label>
              <label htmlFor="currentPassowrd">
                현재 비밀번호를 입력해주세요.
                <input
                  id="currentPassowrd"
                  type="password"
                  placeholder="현재 비밀번호"
                />
              </label>
              <label htmlFor="changedPassowrd">
                변경 할 비밀번호를 입력해주세요.
                <input
                  id="changedPassowrd"
                  type="password"
                  placeholder="새로운 비밀번호"
                />
              </label>
              <ThemeProvider theme={theme}>
                <Button
                  type="submit"
                  variant="contained"
                  color="neutral"
                  disabled={false}
                  sx={{ mr: 1 }}
                >
                  변경하기
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={theme}>
                <Button
                  type="button"
                  variant="outlined"
                  color="neutral"
                  onClick={handleClose}
                >
                  닫기
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="neutral"
                  onClick={() => {
                    dispatch({ type: 'EDITNICKNAME' });
                    handleClose();
                  }}
                >
                  닉네임 변경
                </Button>
              </ThemeProvider>
            </form>
          </div>
          {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
        </ModalStyle>
      </Modal>
    </div>
  );
};

export default UserInfoEditArea;

// 닉네임, 한줄소개, 프로필 이모지, 관심사, 언어, 비밀번호
