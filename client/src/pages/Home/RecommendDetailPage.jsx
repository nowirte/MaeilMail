import axios from 'axios';
import styled from 'styled-components';
import FemaleIcon from '@mui/icons-material/Female';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Wrapper,
  ProfileImg,
  Title,
  MyProfile,
} from './styles/StyledRecoomendDetailPage';

const AdditionalFriendInfoArea = () => {
  return (
    <AdditionalInfo>
      <InterestInfo>
        <p className="title">관심사</p>
        <p className="tag">스포츠</p>
      </InterestInfo>
      <LanguageInfo>
        <p className="title">언어</p>
        <p className="tag">한국어</p>
      </LanguageInfo>
    </AdditionalInfo>
  );
};

const FriendArea = props => {
  const { gender, birthday, location, profileText, email, nickname } =
    props.data;
  return (
    <Friend>
      <Account>
        <span className="userName">{nickname}</span>
        <span className="userEmail">{email}</span>
      </Account>
      <Info>
        <div className="gender">
          <p>
            <FemaleIcon />
            {gender}
          </p>
        </div>
        <div className="birthday">
          <p>
            <CakeOutlinedIcon />
            {birthday}
          </p>
        </div>
        <div className="location">
          <p>
            <LocationOnIcon />
            {location}
          </p>
        </div>
      </Info>
      <Introduction>
        <span>{profileText}</span>
      </Introduction>
      <AdditionalFriendInfoArea />
    </Friend>
  );
};

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
          <FriendArea data={friendData} />
        </MyProfile>
      </Wrapper>
    </>
  );
}

const Friend = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-left: 80px;
`;

const Account = styled.div`
  margin-bottom: 20px;

  & .userName {
    font-size: 1.75rem;
    font-weight: bold;

    margin-right: 10px;
  }

  & .userEmail {
    font-size: 1rem;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 15px;

  & p {
    display: flex;
    align-items: center;

    width: fit-content;
    padding: 5px 8px;
    margin-right: 10px;

    background-color: #40577a;
    color: white;
    font-size: 1rem;
    border-radius: 5px;
  }

  & .birthday {
    margin-right: 4px;
  }
`;

const Introduction = styled.div`
  border: 1px #ff6f91 solid;
  border-radius: 15px;

  width: fit-content;
  padding: 11px 20px;
  > span {
    font-size: 1.25rem;
  }
`;

const AdditionalInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  margin-top: 50px;
`;

const LanguageInfo = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 10px;

  & .title {
    font-size: 1.25rem;
    font-weight: bold;
    text-align: end;

    margin-right: 20px;

    width: 60px;
  }

  & .tag {
    width: fit-content;
    padding: 10px 8px;
    margin-right: 10px;

    background-color: #40577a;
    color: white;
    font-size: 1rem;
    border-radius: 5px;

    line-height: 12px;
  }
`;

const InterestInfo = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 10px;

  & .title {
    font-size: 1.25rem;
    font-weight: bold;
    text-align: end;

    margin-right: 20px;

    width: 60px;
  }

  & .tag {
    width: fit-content;
    padding: 10px 8px;
    margin-right: 10px;

    background-color: #40577a;
    color: white;
    font-size: 1rem;
    border-radius: 5px;

    line-height: 12px;
  }
`;

export default RecommendDetailPage;
