import React, { useState } from 'react';
import MainWrapper from '../../components/common';
import FriendInfo from './FriendInfo';
import Modal from '../../components/ui/Modal';
import Stamp from '../../assets/stamp.png';
import {
  LetterWrapper,
  Letter,
  LetterHeader,
  LetterContent,
  LetterFooter,
  Writer,
  Date,
  WriteBtn,
} from './style';
import LetterEditor from './LetterEditor';
import { getDistance, getTime, formatDate } from './module';

const FriendDetail = () => {
  const user = {
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
  const friend = {
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
      letterId: 1,
      sendId: 1,
      receiveId: 2,
      status: 'receive',
      sendDate: '2022-07-14T15:03:55.461Z',
      deliveryTime: 71,
      receiveDate: '2022-07-15T15:03:55.461Z',
      sendLocation: 'KR',
      receiveLocation: 'KR',
      content: 'dummy text content',
      isRead: 1,
    },
    {
      letterId: 2,
      sendId: 2,
      receiveId: 1,
      status: 'send',
      sendDate: '2022-07-16T15:03:55.461Z',
      deliveryTime: 71,
      receiveDate: '2022-07-17T15:03:55.461Z',
      sendLocation: 'KR',
      receiveLocation: 'KR',
      content: 'dummy text content',
      isRead: 0,
    },
  ];

  // 프로필 모달
  const [profileIsShown, setProfileIsShown] = useState(false);
  // 편지 보내기 버튼
  const [writeIsShown, setWriteIsShown] = useState(false);
  // 편지 리스트
  const [data, setData] = useState(letters);

  // 편지 작성
  const createHandler = content => {
    const sendDate = new window.Date();
    // const distance = getDistance(user.lat, user.lng, friend.lat, friend.lng)
    const newLetter = {
      // receiveId: 'friend.id'
      status: 'send',
      sendDate: sendDate,
      deliveryTime: getTime(100), // getTime(distance)
      receiveDate: sendDate.setMinutes(sendDate.getMinutes() + deliveryTime),
      // recieveLocation,
      content,
    };
    setData([newLetter, ...data]);
  };
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
      {profileIsShown && <Modal handleChange={profileHandler} />}
      <FriendInfo data={friend} handleChange={profileHandler} />

      <LetterWrapper>
        {data.length === 0 && <p>아직 편지가 없습니다.</p>}
        {data.map(letter => (
          <Letter key={letter.letterId}>
            <LetterHeader>
              <img src={Stamp} alt="" />
            </LetterHeader>
            <LetterContent>{letter.content}</LetterContent>
            <LetterFooter>
              <Writer>{letter.receiveId}</Writer>
              <Date>{letter.receiveDate}</Date>
            </LetterFooter>
          </Letter>
        ))}
      </LetterWrapper>

      {!writeIsShown ? (
        <WriteBtn onClick={writeHandler}>편지 보내기</WriteBtn>
      ) : (
        <LetterEditor handleWrite={writeHandler} onCreate={createHandler} />
      )}
    </MainWrapper>
  );
};

export default FriendDetail;
