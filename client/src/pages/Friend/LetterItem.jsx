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
          <pre>
            {friend.userId === letter.sendId && letter.status === 'send'
              ? '✉️ 편지가 오고 있습니다.'
              : letter.content}
          </pre>
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
