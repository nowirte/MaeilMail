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

const FriendInfo = ({ friend }) => {
  return (
    <User>
      <UserInfo>
        <UserName>{friend.info.nickname}</UserName>
        <UserDetail>
          <DetailItem>
            <PinDropIcon style={{ fontSize: '1rem' }} />
            {friend.info.location}
          </DetailItem>
          <DetailItem>
            {friend.info.birthday && getBirth(friend.info.birthday)}
            {friend.info.birthday
              ? '(' + getAge(friend.info.birthday) + ')'
              : ''}
          </DetailItem>
        </UserDetail>
        <UserBio>{friend.info.profileText}</UserBio>
        <BadgeWrapper>
          <Badge>한국어</Badge>
          <Badge>영화</Badge>
        </BadgeWrapper>
      </UserInfo>
      <UserEmoji>{friend.profileImage ? profile.profileImage : '✉️'}</UserEmoji>
    </User>
  );
};

export default React.memo(FriendInfo);
