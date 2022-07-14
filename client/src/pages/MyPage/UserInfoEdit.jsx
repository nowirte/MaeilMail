/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SettingBtn, ModalStyle } from './style';

const favor = [
  { movie: true },
  { language: false },
  { reading: false },
  { game: false },
  { coding: false },
  { fantasy: false },
  { sports: false },
  { entertainment: false },
  { music: false },
  { fashion: false },
  { art: false },
  { travel: false },
];

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
  margin-bottom: 13px;
`;

const Form = styled.form`
  & #favoriteTopic {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    align-items: center;
    margin-bottom: 13px;

    > span {
      display: flex;
      align-items: center;
      margin-right: 10px;
      > label {
        margin-left: 0 0 0 5px;
      }
    }
  }
`;

const UserInfoEditArea = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
            <Form className="userInfoEditForm">
              <label htmlFor="nickname">
                닉네임
                <input
                  id="nickname"
                  type="text"
                  placeholder="{user.nickname}"
                  name="nickname"
                />
              </label>
              <label htmlFor="profileText">
                한 줄 소개
                <input
                  id="profileText"
                  type="text"
                  placeholder="{user.profileText}"
                  name="profileText"
                />
              </label>
              <label htmlFor="birthday">
                생일
                <input id="birthday" type="date" name="birthday" />
              </label>
              <p>관심사를 선택해주세요.</p>

              <p id="favoriteTopic">
                {favor.map(e => {
                  return (
                    <span key={e}>
                      <input
                        type="checkbox"
                        name={e}
                        value={e || ''}
                        // checked={e[1]}
                      />
                      <label htmlFor="favoriteTopic">{e}</label>
                    </span>
                  );
                })}
              </p>
              <label htmlFor="language">
                <p>사용할 수 있는 언어를 선택해주세요.</p>
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
              </ThemeProvider>
            </Form>
          </div>
          {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
        </ModalStyle>
      </Modal>
    </div>
  );
};

export default UserInfoEditArea;

// 닉네임, 한줄소개, 프로필 이모지, 관심사, 언어, 비밀번호
