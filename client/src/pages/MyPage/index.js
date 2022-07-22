import React, { useRef, useEffect, useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UserArea from './User';
import UserSignOutArea from './UserSignOut';
import UserInfoEditArea from './UserInfoEdit';
import { Wrapper, ProfileImg, Title, MyProfile } from './style';
import axios from 'axios';

const MyPage = () => {
  const [userData, setUserData] = useState({});
  const [favor, setFavor] = useState([]);
  const [language, setLanguage] = useState([]);
  const [profilImg, setProfilImg] = useState();

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
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('img', e.target.files[0]);

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
      // for (const keyValue of formData) console.log(keyValue); < formData 확인하는 코드
      setProfilImg(res.data.url);
    } catch (err) {
      alert(err);
    }
  };

  const handleUploadBtn = e => {
    imgInput.current.click();
  };

  return (
    <Wrapper>
      <Title>나의 프로필</Title>
      <MyProfile>
        <ProfileImg>
          <div className="profileImgArea">
            <img className="profileImage" src={userData.profileImage} alt="" />
            <input
              type="file"
              style={{ display: 'none' }}
              ref={imgInput}
              accept="image/jpg, image/png, image/jpeg"
              onChange={handleImgUpload}
            />
            <button
              className="imgUploadBtn"
              onClick={handleUploadBtn}
              type="button"
            >
              <AddPhotoAlternateIcon />
            </button>
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
