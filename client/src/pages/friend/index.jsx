import React, { useState } from 'react';
import MainWrapper from '../../components/common';
import FriendInfo from './FriendInfo';
import Modal from '../../components/ui/Modal';
import LetterList from './LetterList';
import { WriteBtn } from './LetterStyle';
import LetterEditor from './LetterEditor';
import { getDistance, getTime, formatDate } from './module';
import CreateIcon from '@mui/icons-material/Create';

const FriendDetail = () => {
  const loginedUser = {
    userId: 1,
    email: 'ouivve@gmail.com',
    password: '1234',
    nickname: 'ouivve',
    gender: '여',
    language: 'string',
    birthday: '2022-03-31T15:03:55.461Z',
    location: 'string',
    latitude: 36.6331787,
    longitude: 126.0423927,
    status: 'string',
    profileText: 'hello, world',
    profileEmoji: 'string',
    createdAt: '2022-07-15T15:03:55.461Z',
    updatedAt: '2022-07-15T15:03:55.461Z',
    favor: {
      userId: 1,
      movie: true,
      language: true,
      reading: false,
      game: false,
      coding: true,
      fantasy: false,
      sports: false,
      entertainment: false,
      music: false,
      fashion: false,
      art: false,
      travel: false,
    },
  };
  const friendInfo = {
    userId: 2,
    email: 'sdc@gmail.com',
    password: '3456',
    nickname: 'chan',
    gender: '남',
    language: {},
    birthday: '1981-05-30T09:03:55.461Z',
    location: 'Korea',
    latitude: 37.6331787,
    longitude: 127.0423927,
    status: 'string',
    profileText: 'hello, world',
    profileEmoji: 'string',
    createdAt: '2022-07-15T15:03:55.461Z',
    updatedAt: '2022-07-15T15:03:55.461Z',
    favor: {
      userId: 1,
      movie: true,
      language: false,
      reading: true,
      game: false,
      coding: false,
      fantasy: false,
      sports: true,
      entertainment: false,
      music: false,
      fashion: false,
      art: false,
      travel: false,
    },
  };
  const letters = [
    {
      letterId: 2,
      sendId: 2,
      receiveId: 1,
      status: 'send',
      sendDate: '2022-07-15T17:23:03.717Z',
      deliveryTime: 71,
      receiveDate: '2022-07-16T17:23:03.717Z',
      sendLocation: 'KR',
      receiveLocation: 'KR',
      content:
        '안녕하세요 아무말입니다. 아무말 대잔치 장인이죠. 텍스트 넘치면 잘리는지 테스트 해봐야 하거등요? 우리 팀장은 배장한 팀원은 지재영 이주혁 위보람 김명균 박재현 총 육명이요!!!! 프로젝트 빨리 끝나서 영화 몰아보기 하고싶습니다',
      isRead: 0,
    },
    {
      letterId: 1,
      sendId: 1,
      receiveId: 2,
      status: 'receive',
      sendDate: '2022-07-14T15:03:55.461Z',
      deliveryTime: 71,
      receiveDate: '2022-07-15T15:03:55.461Z',
      sendLocation: 'KR',
      receiveLocation: 'KR',
      content:
        '안녕하세요 아무말입니다. 아무말 대잔치 장인이죠. 텍스트 넘치면 잘리는지 테스트 해봐야 하거등요? 우리 팀장은 배장한 팀원은 지재영 이주혁 위보람 김명균 박재현 총 육명이요!!!! 프로젝트 빨리 끝나서 영화 몰아보기 하고싶습니다',
      isRead: 1,
    },
  ];

  // 프로필 모달
  const [profileIsShown, setProfileIsShown] = useState(false);
  // 편지 보내기 버튼
  const [writeIsShown, setWriteIsShown] = useState(false);
  // 편지 리스트
  const [data, setData] = useState(letters);
  // 로그인한 유저
  const [user, setUser] = useState(loginedUser);
  // 친구인 유저
  const [friend, setFriend] = useState(friendInfo);

  // 편지 작성
  const createHandler = content => {
    const sendDate = new window.Date();
    const distance = getDistance(
      user.longitude,
      user.latitude,
      friend.longitude,
      friend.latitude
    );
    const deliveryTime = getTime(distance);
    const newLetter = {
      status: 'send',
      sendId: user.userId,
      receiveId: friend.userId,
      status: 'send',
      sendDate: sendDate,
      deliveryTime: deliveryTime,
      receiveDate: sendDate.setMinutes(sendDate.getMinutes() + deliveryTime),
      sendLocation: user.location,
      receiveLocation: friend.location,
      content,
      isRead: 0,
    };
    setData([newLetter, ...data]);
  };

  console.log(data);
  // 프로필 모달
  const profileHandler = () => {
    setProfileIsShown(current => !current);
  };
  // 편지 보내기 버튼
  const writeHandler = () => {
    setWriteIsShown(current => !current);
  };

  return (
    <MainWrapper>
      {/* 친구 프로필 영역 */}
      {profileIsShown && <Modal data={friend} handleChange={profileHandler} />}
      <FriendInfo data={friend} handleChange={profileHandler} />

      {/* 편지 리스트 */}
      <LetterList user={user} friend={friend} data={data} />

      {/* 편지 보내기 버튼, 편지 작성 컴포넌트 */}
      {!writeIsShown ? (
        <WriteBtn onClick={writeHandler}>
          <CreateIcon />
          편지 보내기
        </WriteBtn>
      ) : (
        <LetterEditor handleWrite={writeHandler} onCreate={createHandler} />
      )}
    </MainWrapper>
  );
};

export default FriendDetail;
