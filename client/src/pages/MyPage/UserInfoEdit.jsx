import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Select from 'react-select';
import axios from 'axios';
//mui
import EditIcon from '@mui/icons-material/Edit';
import CachedIcon from '@mui/icons-material/Cached';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//style
import { SettingBtn, ModalStyle } from './style';
//function
import useLoc from '../../utils/userLocationFunction';
import objChangedarr from './util';

const UserInfoEditArea = props => {
  const token = useSelector(state => state.auth.token);
  const userData = props.data;

  const [favor, setFavor] = useState([]);
  const [google, setGoogle] = useState(true);
  const [language, setLanguage] = useState([]);
  const [inputData, setInputData] = useState({});
  const [currentPassword, setCurrentPassword] = useState('');
  const [changedPassword, setChangedPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setGoogle(() => (userData.oauth === 'google' ? true : false));
    setFavor(() => {
      const favObj = userData.Favor;
      const favArr = favObj ? objChangedarr(favObj) : null;
      return favArr;
    });
    setLanguage(() => {
      const langObj = userData.Language;
      const langArr = langObj ? objChangedarr(langObj) : null;
      return langArr;
    });
  }, [userData]);

  const handleModal = () => {
    setOpen(!open);
  };

  const handleCheckedFavor = e => {
    // 유저가 선택한 관심사의 value값 가져오는 코드
    const checkedFavor = e.map(el => el.value);

    const checkedFavorArray = favor.map(el => {
      if (checkedFavor.includes(el.value)) {
        return { ...el, selected: true };
      } else if (!checkedFavor.includes(el.value)) {
        return { ...el, selected: false };
      }

      return el;
    });

    setFavor([...checkedFavorArray]);
  };

  const handleCheckedLanguage = e => {
    // 유저가 선택한 사용 언어의 value값 가져오는 코드
    const checkedLanguage = e.map(el => el.value);

    const checkedLanguageArray = language.map(el => {
      if (checkedLanguage.includes(el.value)) {
        return { ...el, selected: true };
      } else if (!checkedLanguage.includes(el.value)) {
        return { ...el, selected: false };
      }

      return el;
    });

    setLanguage([...checkedLanguageArray]);
  };

  const handleLocation = async e => {
    e.preventDefault();
    const data = await useLoc();
    setInputData({
      ...inputData,
      location: data.location,
    });
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
      if (checkPassword !== changedPassword) {
        alert('새로운 비밀번호를 다시 확인해주세요.');
      }

      const data = {
        nickname: inputData.nickname,
        profileText: inputData.profileText,
        birthday: inputData.birthday,
        newPassword: changedPassword ? changedPassword : currentPassword,
        currentPassword: google
          ? process.env.REACT_APP_GOOGLEPW
          : currentPassword,
        // currentPassword: currentPassword,
        favor: favor,
        language: language,
        location: inputData.location,
      };

      const bodyData = JSON.stringify(data);

      await axios.patch('api/auth/me', bodyData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      handleModal();
      document.location.href = '/mypage';
      alert('회원 정보가 수정되었습니다.');
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.reason);
      document.location.href = '/mypage';
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
                <p>닉네임</p>
                <input
                  id="nickname"
                  type="text"
                  placeholder={userData.nickname}
                  name="nickname"
                  onChange={handleOnChange}
                />
              </EditTitle>
              <EditTitle className="profileText">
                <p>한 줄 소개</p>
                <input
                  id="profileText"
                  type="text"
                  placeholder={userData.profileText}
                  name="profileText"
                  onChange={handleOnChange}
                />
              </EditTitle>
              <EditTitle className="location">
                <p>위치</p>
                <div className="locationBtn">
                  <input
                    id="location"
                    type="text"
                    name="location"
                    placeholder={userData.location}
                    value={inputData.location || ''}
                    readOnly
                  />
                  <button type="button" onClick={handleLocation}>
                    <CachedIcon />
                  </button>
                </div>
              </EditTitle>
              <EditTitle className="birthday">
                <p>생일</p>
                <input
                  id="birthday"
                  type="date"
                  name="birthday"
                  value={userData.birthday || inputData.birthday || ''}
                  onChange={handleOnChange}
                />
              </EditTitle>
              <EditTitle className="favor">
                <p>관심사</p>
                <StyledSelect
                  defaultValue={(favor || []).filter(e => e.selected)}
                  isMulti
                  name="favor"
                  options={favor}
                  className="favorSelect"
                  placeholder="관심사 선택"
                  onChange={handleCheckedFavor}
                />
              </EditTitle>
              <EditTitle className="language">
                <p>사용 언어</p>
                <StyledSelect
                  defaultValue={(language || []).filter(e => e.selected)}
                  isMulti
                  name="language"
                  options={language}
                  className="languageSelect"
                  placeholder="언어 선택"
                  onChange={handleCheckedLanguage}
                />
              </EditTitle>
              {!google && (
                <div>
                  <EditTitle className="changedPassowrd">
                    <p>변경 할 비밀번호</p>
                    <input
                      id="changedPassowrd"
                      type="password"
                      placeholder="새로운 비밀번호"
                      name="changedPassowrd"
                      value={changedPassword}
                      onChange={e => {
                        setChangedPassword(e.target.value);
                      }}
                    />
                  </EditTitle>
                  <EditTitle className="checkPassowrd">
                    <p>비밀번호 확인</p>
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
                        style={{
                          fontSize: '0.75rem',
                          color: 'red',
                          marginTop: '0.5rem',
                        }}
                      >
                        새로운 비밀번호가 일치하지 않습니다.
                      </p>
                    )}
                  </EditTitle>
                  <EditTitle className="currentPassowrd">
                    <p>
                      현재 비밀번호를 입력해주세요.
                      <span style={{ fontSize: '0.75rem', color: 'red' }}>
                        *필수
                      </span>
                    </p>
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
                  </EditTitle>
                </div>
              )}

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
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 240px;
  }

  & #favoriteTopic {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    align-items: center;
    margin-bottom: 8px;

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
    margin-bottom: 1rem;
  }
`;

const EditTitle = styled.h3`
  display: flex;
  flex-direction: column;

  margin: 7px 0;

  font-size: 0.8rem;
  > p {
    margin-bottom: 0.5rem;
  }
  > .locationBtn {
    display: flex;

    > button {
      position: absolute;
      right: 30%;
      background-color: #fff0;
      border: none;
      cursor: pointer;
    }
  }
`;

const StyledSelect = styled(Select)`
  width: 250px;
  padding: 3px 0;
`;
