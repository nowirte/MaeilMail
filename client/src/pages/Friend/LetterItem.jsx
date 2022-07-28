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
import DoneIcon from '@mui/icons-material/Done';
import { formatDate } from './utils';
import axios from 'axios';

const LetterItem = ({ user, friend, letter, token }) => {
  // 편지 읽음 확인 전송
  const patchReadLetter = async () => {
    const letterId = letter.letterId;
    const data = { isRead: 1 };
    try {
      await axios.patch(`http://localhost:3001/api/letters/${letterId}`, data, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 도착시간에 따른 편지 읽기, 읽음 유무 확인 처리
  const showDetail = async e => {
    // 친구가 보낸 편지, 도착시간이 남음
    if (letter.sendId === friend.userId && letter.isArrived === 0) {
      e.preventDefault();
    } else if (letter.isRead === 0) {
      await patchReadLetter();
    }
    return;
  };

  return (
    <Letter key={letter.letterId} future={letter.isArrived === 0}>
      <StyledLink
        to={`/friend/${friend.userId}/${letter.letterId}`}
        onClick={showDetail}
        user={user}
      >
        <LetterHeader>
          <span>{letter.isRead ? <DoneIcon /> : ''}</span>
          {letter.isArrived === 0 ? (
            <img src={SendStamp} alt="stamp" />
          ) : (
            <img src={Stamp} alt="stamp" />
          )}
        </LetterHeader>
        <LetterContent>
          {letter.isArrived === 0 && letter.send_id === friend.userId
            ? '✉️ 편지가 오고 있습니다.'
            : letter.content}
        </LetterContent>
        <LetterFooter>
          <Writer>{letter.nickname}</Writer>
          <Date>{formatDate(letter.receiveDate)}</Date>
        </LetterFooter>
      </StyledLink>
    </Letter>
  );
};

export default React.memo(LetterItem);
