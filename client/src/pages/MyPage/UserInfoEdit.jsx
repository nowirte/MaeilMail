import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SettingBtn, ModalStyle } from './style';
import Select from 'react-select';
import axios from 'axios';

const UserInfoEditArea = props => {
  const userData = props.data;

  const [inputData, setInputData] = useState({});
  const [checkFavor, setCheckFavor] = useState([]);
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

  const favorSelectList = (userData.favor || []).filter(
    e => e.selected === true
  );
  const languageSelectList = (userData.language || []).filter(
    e => e.selected === true
  );

  const handlecheckedfavor = e => {
    // const checked = e.map(el => el.value);
    e.forEach(el => (el.selected = true));
    setCheckFavor(e);
  };

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
      // if (changedPassword === '') {
      //   setChangedPassword(userData.password);
      // }

      console.log(checkFavor);

      // const test = userData.favor.
      const index = (userData.favor || []).findIndex(
        data => data.value === e.value
      );

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
        <ModalStyle style={{ width: 600 }}>
          {/* 모달 스타일 박스 쉐도우 값 설정 필요 */}
          <Title id="userInfoEdit-title">회원정보 수정</Title>
          <div id="userInfoEdit-description">
            <Form className="userInfoEditForm" onSubmit={handleSubmit}>
              <EditTitle className="nickname">
                닉네임
                <input
                  id="nickname"
                  type="text"
                  placeholder={userData.nickname}
                  name="nickname"
                  onChange={handleOnChange}
                />
              </EditTitle>
              <EditTitle className="profileText">
                한 줄 소개
                <input
                  id="profileText"
                  type="text"
                  placeholder={userData.profileText}
                  name="profileText"
                  onChange={handleOnChange}
                />
              </EditTitle>
              <EditTitle className="location">
                위치
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={userData.location || ''}
                  onChange={handleOnChange}
                />
              </EditTitle>
              <EditTitle className="birthday">
                생일
                <input
                  id="birthday"
                  type="date"
                  name="birthday"
                  value={userData.birthday || ''}
                  onChange={handleOnChange}
                />
              </EditTitle>
              <EditTitle className="favor">
                관심사
                <StyledSelect
                  defaultValue={favorSelectList}
                  isMulti
                  name="favor"
                  options={userData.favor}
                  className="favorSelect"
                  placeholder="관심사 선택"
                  onChange={handlecheckedfavor}
                />
              </EditTitle>
              <EditTitle className="language">
                사용 언어
                <StyledSelect
                  defaultValue={languageSelectList}
                  isMulti
                  name="language"
                  options={userData.language}
                  className="languageSelect"
                  classNamePrefix="language"
                  placeholder="언어 선택"
                />
              </EditTitle>
              <EditTitle className="changedPassowrd">
                변경 할 비밀번호
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
              </EditTitle>
              <EditTitle className="checkPassowrd">
                비밀번호 확인
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
                    style={{ fontSize: '0.75rem', color: 'red', marginTop: 0 }}
                  >
                    새로운 비밀번호가 일치하지 않습니다.
                  </p>
                )}
              </EditTitle>
              <EditTitle className="currentPassowrd">
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
                    style={{ fontSize: '0.75rem', color: 'red', marginTop: 0 }}
                  >
                    현재 비밀번호가 일치해야 정보를 변경할 수 있습니다.
                  </p>
                )}
              </EditTitle>
              <div className="editBtn">
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
              </div>
            </Form>
          </div>
        </ModalStyle>
      </Modal>
    </div>
  );
};

export default UserInfoEditArea;

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
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(6, 0.5fr);
  justify-items: center;

  & input {
    height: 25px;
  }

  & #profileText {
    width: 200px;
  }

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

  .currentPassowrd {
    margin-top: 30px;
    margin-bottom: 20px;
  }
  > .currentPassowrd {
    grid-column: 1/3;
  }
  > .editBtn {
    grid-column: 1/3;
  }
`;

const EditTitle = styled.h3`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 7px 0;

  font-size: 1rem;
`;

const StyledSelect = styled(Select)`
  width: 250px;
  padding: 3px 0;
`;
