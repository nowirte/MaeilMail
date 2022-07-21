import React from 'react';
import {
  Letter,
  StyledLink,
  LetterHeader,
  LetterContent,
  LetterFooter,
  Writer,
  Date,
} from './LetterStyle';
import Stamp from '../../assets/stamp.png';
import SendStamp from '../../assets/send-stamp.png';
import { formatDate } from './utils';
import axios from 'axios';

const LetterItem = ({ user, friend, letter, handleClick }) => {
  // 편지 읽음 확인 전송
  const patchReadLetter = async () => {
    const letterId = letter.letter_id;
    const token = localStorage.getItem('token');
    const data = { isRead: true };
    try {
      await axios.patch(`http://localhost:3001/api/letters/${letterId}`, data, {
        headers: {
          Authorization: token,
        },
      });
      console.log('patch 요청');
    } catch (error) {
      console.error(error);
    }
  };

  // 도착시간에 따른 편지 읽기, 읽음 유무 확인 처리
  const showDetail = async e => {
    e.preventDefault();
    const now = new window.Date();
    const receiveDate = new window.Date(letter.receive_date);
    const timeRemaining = new window.Date(now) - new window.Date(receiveDate);
    if (timeRemaining <= 0) {
      console.log('아직 못 읽음');
    } else {
      await patchReadLetter();
      console.log('읽음 요청 보내기');
    }
    // handleClick();
  };
  return (
    <Letter key={letter.letterId} onClick={showDetail}>
      {/* <StyledLink
        to={`/friend/${friend.user_id}/${letter.letter_id}`}
        key={letter.letterId}
      > */}
      <LetterHeader>
        {letter.is_arrived === 0 ? (
          <img src={SendStamp} alt="stamp" />
        ) : (
          <img src={Stamp} alt="stamp" />
        )}
      </LetterHeader>
      <LetterContent>
        {friend.user_Id === letter.sendId
          ? '✉️ 편지가 오고 있습니다.'
          : letter.content}
      </LetterContent>
      <LetterFooter>
        <Writer>{letter.nickname}</Writer>
        <Date>{formatDate(letter.receive_date)}</Date>
      </LetterFooter>
      {/* </StyledLink> */}
    </Letter>
  );
};

export default LetterItem;
