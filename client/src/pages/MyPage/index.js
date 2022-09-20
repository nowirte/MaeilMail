import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UserArea from './User';
import UserSignOutArea from './UserSignOut';
import UserInfoEditArea from './UserInfoEdit';
import { Wrapper, ProfileImg, Title, MyProfile } from './style';
import axios from 'axios';

const MyPage = () => {
  const [userData, setUserData] = useState({});
  const token = useSelector(state => state.auth.token);

  const fetchUserData = async () => {
    try {
      const res = await axios.get('/api/auth/me', {
        headers: {
          Authorization: token,
        },
      });

      setUserData(res.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const imgInput = useRef();

  const handleImgUpload = async e => {
    const formData = new FormData();

    formData.append('img', e.target.files[0]);

    try {
      await axios.patch(`api/auth/me/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      // for (const keyValue of formData) console.log(keyValue); < formData 확인하는 코드
      location.reload();
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
        <UserArea data={userData} />
        <div className="setting">
          <UserInfoEditArea data={userData} />
          <UserSignOutArea />
        </div>
      </MyProfile>
    </Wrapper>
  );
};

export default MyPage;
