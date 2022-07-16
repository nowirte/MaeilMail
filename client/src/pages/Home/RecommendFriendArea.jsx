import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
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
  const {
    gender,
    birthday,
    location,
    profileText,
    email,
    nickname,
    favor,
    language,
  } = props.data;

  // console.log(favor, 'favor');

  const selectedFavor = favor.filter(e => e.selected === true);
  const selectedLanguage = language.filter(e => e.selected === true);

  // console.log(selectedFavor);
  return (
    <Friend>
      <Account>
        <span className="userName">{nickname}</span>
        <span className="userEmail">{email}</span>
      </Account>
      <Info>
        <div className="gender">
          <p>{gender === 'men' ? <MaleIcon /> : <FemaleIcon />}</p>
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
          <p className="tag">축구</p>
        </InterestInfo>
        <LanguageInfo>
          <p className="title">언어</p>
          <p className="tag">한국어</p>
        </LanguageInfo>
      </AdditionalInfo>
    </Friend>
  );
};
