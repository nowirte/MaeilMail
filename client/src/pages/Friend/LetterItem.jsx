import React from 'react';
import { useSelector } from 'react-redux';
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

const LetterItem = ({ user, friend, letter }) => {
  const now = new window.Date();
  const receiveDate = new window.Date(letter.receive_date);
  const timeRemaining = new window.Date(receiveDate) - new window.Date(now);

  // 편지 읽음 확인 전송
  const patchReadLetter = async () => {
    const letterId = letter.letter_id;
    const token = useSelector(state => state.auth.token);
    const data = { is_read: 1 };
    try {
      await axios.patch(`api/letters/${letterId}`, data, {
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
    if (letter.sendId === friend.user_id && timeRemaining > 0) {
      e.preventDefault();
    } else {
      if (letter.is_read === 0) {
        await patchReadLetter();
      }
    }
    return;
  };

  return (
    <Letter key={letter.letterId} future={timeRemaining > 0}>
      <StyledLink
        to={`/friend/${friend.user_id}/${letter.letter_id}`}
        onClick={showDetail}
        user={user}
      >
        <LetterHeader>
          <span>{letter.is_read ? <DoneIcon /> : ''}</span>
          {timeRemaining > 0 ? (
            <img src={SendStamp} alt="stamp" />
          ) : (
            <img src={Stamp} alt="stamp" />
          )}
        </LetterHeader>
        <LetterContent>
          {timeRemaining > 0 && letter.sendId === friend.user_id
            ? '✉️ 편지가 오고 있습니다.'
            : letter.content}
        </LetterContent>
        <LetterFooter>
          <Writer>{letter.nickname}</Writer>
          <Date>{formatDate(letter.receive_date)}</Date>
        </LetterFooter>
      </StyledLink>
    </Letter>
  );
};

export default LetterItem;
