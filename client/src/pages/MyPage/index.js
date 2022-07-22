import React, { useRef, useEffect, useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UserArea from './User';
import UserSignOutArea from './UserSignOut';
import UserInfoEditArea from './UserInfoEdit';
import {
  Wrapper,
  ProfileImg,
  Title,
  MyProfile,
  ImageSubmitBtn,
  ImageCancleBtn,
} from './style';
import axios from 'axios';

const MyPage = () => {
  const [userData, setUserData] = useState({});
  const [favor, setFavor] = useState([]);
  const [language, setLanguage] = useState([]);
  const [img, setImg] = useState('');

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3001/api/auth/me', {
        headers: {
          Authorization: token,
        },
      });

      const { favorArray, languageArray, user } = res.data;
      setFavor(favorArray);
      setLanguage(languageArray);
      setUserData(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const imgInput = useRef();

  const handleImgUpload = async e => {
    setImg(e.target.files[0]);
  };

  const handleImgSubmit = async e => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('img', img);

    try {
      const res = await axios.patch(
        `http://localhost:3001/api/auth/me/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        }
      );
      console.log(res);
      setImg('');
    } catch (err) {
      alert(err);
    }
  };

  const handleUploadBtn = e => {
    e.preventDefault();
    imgInput.current.click();
  };
  return (
    <Wrapper>
      <Title>나의 프로필</Title>
      <MyProfile>
        <ProfileImg>
          <div className="profileImgArea">
            <img
              className="profileEmoji"
              src={
                userData.profileImage
                  ? userData.profileImage
                  : '/img/defaultImg.png'
              }
              alt="뚱이"
            />
            <input
              type="file"
              style={{ display: 'none' }}
              ref={imgInput}
              accept="image/jpg, image/png, image/jpeg"
              onClick={handleImgUpload}
            />
            <button
              className="imgUploadBtn"
              onClick={handleUploadBtn}
              type="button"
            >
              <AddPhotoAlternateIcon />
            </button>
            {img ?? (
              <>
                <ImageSubmitBtn onClick={handleImgSubmit}>
                  적용하기
                </ImageSubmitBtn>
                <ImageCancleBtn onClick={() => setImg('')}>닫기</ImageCancleBtn>
              </>
            )}
          </div>
        </ProfileImg>
        <UserArea data={userData} favor={favor} language={language} />
        <div className="setting">
          <UserInfoEditArea data={userData} favor={favor} language={language} />
          <UserSignOutArea data={userData} />
        </div>
      </MyProfile>
    </Wrapper>
  );
};

export default MyPage;
