import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Wrapper,
  ProfileImg,
  Title,
  MyProfile,
} from './styles/StyledRecoomendDetailPage';
import { RecommendFriendArea } from './RecommendFriendArea';

function RecommendDetailPage() {
  let params = useParams();
  let userid = Number(params.userid);

  const [friendData, setFriendData] = useState({});
  const fetchFriendData = async () => {
    try {
      const res = await axios.get('http://localhost:3333/user');
      const data = res.data.find(e => e.userid === userid);
      setFriendData(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchFriendData();
  }, []);

  return (
    <>
      <Wrapper>
        <Title>{friendData.nickname}의 프로필</Title>
        <MyProfile>
          <ProfileImg>
            <div className="profileImgArea">
              <img
                className="profileEmoji"
                src={friendData.image}
                alt={friendData.nickname}
              />
            </div>
          </ProfileImg>
          <RecommendFriendArea data={friendData} />
        </MyProfile>
      </Wrapper>
    </>
  );
}

export default RecommendDetailPage;
