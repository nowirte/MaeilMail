import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SettingBtn, ModalStyle } from './style';
import axios from 'axios';

const favor = {
  userId: 0,
  movie: true,
  language: true,
  reading: true,
  game: true,
  coding: true,
  fantasy: true,
  sports: true,
  entertainment: true,
  music: true,
  fashion: true,
  art: true,
  travel: true,
};

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

const UserInfoEditArea = props => {
  const userData = props.data;

  const [inputData, setInputData] = useState({});
  const [currentPassword, setCurrentPassword] = useState('');
  const [changedPassword, setChangedPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    setInputData(userData);
  }, []);

  const handleOnChange = e => {
    const { value, name } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (userData.password !== currentPassword) {
        alert('현재 비밀번호를 확인해주세요.');
        return;
      }
      if (checkPassword !== changedPassword) {
        alert('새로운 비밀번호를 다시 확인해주세요.');
        return;
      }
      if (changedPassword === '') {
        setChangedPassword(userData.password);
      }

      await axios.patch(`http://localhost:3333/user/1`, {
        nickname: inputData.nickname,
        profileText: inputData.profileText,
        birthday: inputData.birthday,
        password: changedPassword,
      });
      console.log('현재 비번', currentPassword);
      console.log('바뀐 비번', changedPassword);
      handleModal();
      alert('회원 정보가 변경되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="setting">
      <SettingBtn className="userInfoEdit" onClick={handleModal}>
        <EditIcon />
        <p>회원정보 수정</p>
      </SettingBtn>
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="userInfoEdit-title"
        aria-describedby="userInfoEdit-description"
      >
        <ModalStyle>
          {/* 모달 스타일 박스 쉐도우 값 설정 필요 */}
          <Title id="userInfoEdit-title">회원정보 수정</Title>
          <div id="userInfoEdit-description">
            <Form className="userInfoEditForm" onSubmit={handleSubmit}>
              <label htmlFor="nickname">
                닉네임
                <input
                  id="nickname"
                  type="text"
                  placeholder={userData.nickname}
                  name="nickname"
                  onChange={handleOnChange}
                />
              </label>
              <label htmlFor="profileText">
                한 줄 소개
                <input
                  id="profileText"
                  type="text"
                  placeholder={userData.profileText}
                  name="profileText"
                  onChange={handleOnChange}
                />
              </label>
              <label htmlFor="birthday">
                생일
                <input
                  id="birthday"
                  type="date"
                  name="birthday"
                  value={userData.birthday || ''}
                  onChange={handleOnChange}
                />
              </label>
              <p>관심사를 선택해주세요.</p>

              <p id="favoriteTopic">
                {/* {Object.keys(favor).map(e => {
                  console.log(e); */}
                {/* return (
                    <span key={e}>
                      <input
                        type="checkbox"
                        name={e}
                        value={e || ''}
                        // checked={e[1]}
                      />
                      <label htmlFor="favoriteTopic">{e}</label>
                    </span> */}
                {/* ); */}
                {/* })} */}
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
              <label htmlFor="changedPassowrd">
                변경 할 비밀번호를 입력해주세요.
                <input
                  id="changedPassowrd"
                  type="password"
                  placeholder="새로운 비밀번호"
                  name="changedPassowrd"
                  value={changedPassword || ''}
                  onChange={e => {
                    setChangedPassword(e.target.value);
                  }}
                />
              </label>
              <label htmlFor="checkPassowrd">
                변경 할 비밀번호를 다시 입력해주세요.
                <input
                  id="checkPassowrd"
                  type="password"
                  placeholder="새로운 비밀번호 확인"
                  name="checkPassowrd"
                  value={checkPassword || ''}
                  onChange={e => {
                    setCheckPassword(e.target.value);
                  }}
                />
                {changedPassword !== checkPassword && (
                  <p
                    className="changedPasswordChecked"
                    style={{ fontSize: '0.75rem', color: 'red' }}
                  >
                    새로운 비밀번호가 일치하지 않습니다.
                  </p>
                )}
              </label>
              <label htmlFor="currentPassowrd">
                현재 비밀번호를 입력해주세요.
                <input
                  id="currentPassowrd"
                  type="password"
                  placeholder="현재 비밀번호"
                  name="currentPassword"
                  value={currentPassword || ''}
                  onChange={e => {
                    setCurrentPassword(e.target.value);
                  }}
                />
                {userData.password !== currentPassword && (
                  <p
                    className="currentPasswordChecked"
                    style={{ fontSize: '0.75rem', color: 'red' }}
                  >
                    현재 비밀번호가 일치하지 않습니다.
                  </p>
                )}
              </label>
              <ThemeProvider theme={theme}>
                <Button
                  type="submit"
                  variant="contained"
                  color="neutral"
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
                  onClick={handleModal}
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
