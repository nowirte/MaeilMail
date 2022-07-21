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

const LetterItem = ({ friend, letter, handleClick }) => {
  const { content, is_arrived, letter_id, nickname, receiveId, receive_date } =
    letter;
  return (
    <Letter key={letter.letterId} onClick={handleClick}>
      <StyledLink
        to={`/friend/${friend.user_id}/${letter.letter_id}`}
        key={letter.letterId}
      >
        <LetterHeader>
          {friend.userId === letter.sendId && letter.status === 'send' ? (
            <img src={SendStamp} alt="stamp" />
          ) : (
            <img src={Stamp} alt="stamp" />
          )}
        </LetterHeader>
        <LetterContent>
          {friend.userId === letter.sendId && letter.status === 'send'
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
