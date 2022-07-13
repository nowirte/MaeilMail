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

const FriendInfo = () => {
  return (
    <User>
      <UserInfo>
        <UserName>Arae Boram</UserName>
        <UserDetail>
          <DetailItem>
            <PinDropIcon style={{ fontSize: '1rem' }} />
            브라질
          </DetailItem>
          <DetailItem>3월 31일 (50)</DetailItem>
        </UserDetail>
        <UserBio>Hey, sorry I didn&apos;t get back to you sooner. 🥲</UserBio>
        <BadgeWrapper>
          <Badge>영화</Badge>
          <Badge>음악</Badge>
          <Badge>예술</Badge>
          <Badge>한국어</Badge>
          <Badge>영어</Badge>
        </BadgeWrapper>
      </UserInfo>
      <UserEmoji>🐮</UserEmoji>
    </User>
  );
};

export default FriendInfo;
