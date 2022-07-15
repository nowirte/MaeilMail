import React, { useRef, useEffect, useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UserArea from './User';
import UserSignOutArea from './UserSignOut';
import UserInfoEditArea from './UserInfoEdit';
import { Wrapper, ProfileImg, Title, MyProfile } from './style';
import axios from 'axios';

const MyPage = () => {
  const [userData, setUserData] = useState({});
  const fetchUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:3333/user`);
      const data = res.data[0];
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const imgInput = useRef();

  const handleImgUpload = () => {
    imgInput.current.click();
  };
  return (
    <Wrapper>
      <Title>나의 프로필</Title>
      <MyProfile>
        <ProfileImg>
          <div className="profileImgArea">
            <img className="profileEmoji" src="/img/뚱이.png" alt="뚱이" />
            <input
              type="file"
              style={{ display: 'none' }}
              ref={imgInput}
              accept="image/jpg, image/png, image/jpeg"
            />
            <button
              className="imgUploadBtn"
              onClick={handleImgUpload}
              type="button"
            >
              <AddPhotoAlternateIcon />
            </button>
          </div>
        </ProfileImg>
        <UserArea data={userData} />
        <div className="setting">
          <UserInfoEditArea data={userData} />
          <UserSignOutArea data={userData} />
        </div>
      </MyProfile>
    </Wrapper>
  );
};

export default MyPage;
