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

const FriendInfo = ({ handleChange, data }) => {
  return (
    <User>
      <UserInfo>
        <UserName>{data.nickname}</UserName>
        <UserDetail>
          <DetailItem>
            <PinDropIcon style={{ fontSize: '1rem' }} />
            {data.location}
          </DetailItem>
          <DetailItem>
            {getBirth(data.birthday)} ({getAge(data.birthday)})
          </DetailItem>
        </UserDetail>
        <UserBio>{data.profileText}</UserBio>
        <BadgeWrapper>
          <Badge>영화</Badge>
          <Badge>음악</Badge>
          <Badge>예술</Badge>
          <Badge>한국어</Badge>
          <Badge>영어</Badge>
        </BadgeWrapper>
      </UserInfo>
      <UserEmoji onClick={handleChange}>🐮</UserEmoji>
    </User>
  );
};

export default FriendInfo;
