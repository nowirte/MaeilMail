import FemaleIcon from '@mui/icons-material/Female';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React from 'react';
import {
  Friend,
  Account,
  Info,
  Introduction,
  InterestInfo,
  LanguageInfo,
  AdditionalInfo,
} from './styles/StyledRecommendFriendArea';

export const RecommendFriendArea = props => {
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
    </Friend>
  );
};
