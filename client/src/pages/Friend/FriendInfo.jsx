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

const FriendInfo = ({ handleChange, friend }) => {
  const favorite = friend.Favor;
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
          <Badge>한국어</Badge>
          <Badge>영어</Badge>
        </BadgeWrapper>
      </UserInfo>
      <UserEmoji onClick={handleChange}>
        {friend.profileImage ? profile.profileImage : '✉️'}
      </UserEmoji>
    </User>
  );
};

export default React.memo(FriendInfo);
