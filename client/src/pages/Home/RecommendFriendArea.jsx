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

export const RecommendFriendArea = ({ data }) => {
  const favor = data.Favor;
  const favorites = Object.keys(favor).reduce((acc, k) => {
    if (favor[k]) {
      acc.push(k);
    }
    return acc;
  }, []);
  const language = data.Language;
  const languages = Object.keys(language).reduce((acc, k) => {
    if (language[k]) {
      acc.push(k);
    }
    return acc;
  }, []);

  return (
    <Friend>
      <Account>
        <span className="userName">{data.nickname}</span>
        <span className="userEmail">{data.email}</span>
      </Account>
      <Info>
        <div className="gender">
          {data.gender === 'male' ? (
            <p>
              <MaleIcon />
              male
            </p>
          ) : (
            <p>
              <FemaleIcon />
              female
            </p>
          )}
        </div>
        <div className="birthday">
          <p>
            <CakeOutlinedIcon />
            {data.birthday}
          </p>
        </div>
        <div className="location">
          <p>
            <LocationOnIcon />
            {data.location}
          </p>
        </div>
      </Info>
      <Introduction>
        <span>{data.profileText}</span>
      </Introduction>
      <AdditionalInfo>
        <InterestInfo>
          <p className="title">관심사</p>
          {favorites.map((e, i) => {
            return (
              <p className="tag" key={`${i}-${e}`}>
                {e}
              </p>
            );
          })}
        </InterestInfo>
        <LanguageInfo>
          <p className="title">언어</p>
          {languages.map((e, i) => {
            return (
              <p className="tag" key={`${i}-${e}`}>
                {e}
              </p>
            );
          })}
        </LanguageInfo>
      </AdditionalInfo>
    </Friend>
  );
};
