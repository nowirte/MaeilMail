import React from 'react';
import PinDropIcon from '@mui/icons-material/PinDrop';
import {
  User,
  UserInfo,
  UserEmoji,
  UserDetail,
  DetailItem,
  UserName,
  UserBio,
  BadgeWrapper,
  Badge,
} from './FriendInfoStyle';
import { getBirth, getAge } from './utils';

const FriendInfo = ({ friend, favor, language }) => {
  const favorites = Object.keys(favor).reduce((acc, k) => {
    if (favor[k]) {
      acc.push(k);
    }
    return acc;
  }, []);

  const languages = Object.keys(favor).reduce((acc, k) => {
    if (favor[k]) {
      acc.push(k);
    }
    return acc;
  }, []);

  return (
    <User>
      <UserInfo>
        <UserName>{friend.nickname}</UserName>
        <UserDetail>
          <DetailItem>
            <PinDropIcon style={{ fontSize: '1rem' }} />
            {friend.location}
          </DetailItem>
          <DetailItem>
            {friend.birthday && getBirth(friend.birthday)}
            {friend.birthday ? '(' + getAge(friend.birthday) + ')' : ''}
          </DetailItem>
        </UserDetail>
        <UserBio>{friend.profileText}</UserBio>
        <BadgeWrapper>
          {favorites.map(item => (
            <Badge key={Math.random().toString()}>{item}</Badge>
          ))}
          {languages.length > 0 &&
            languages.map(item => (
              <Badge key={Math.random().toString()} language>
                {item}
              </Badge>
            ))}
        </BadgeWrapper>
      </UserInfo>
      <UserEmoji>
        <img src={friend.profileImage} alt="friendImg" />
      </UserEmoji>
    </User>
  );
};

export default React.memo(FriendInfo);
