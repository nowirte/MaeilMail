import React from 'react';
import Stamp from '../../assets/stamp.png';
import SendStamp from '../../assets/send-stamp.png';
import {
  LetterWrapper,
  Letter,
  StyledLink,
  LetterHeader,
  LetterContent,
  LetterFooter,
  Writer,
  Date,
} from './LetterStyle';
import { formatDate } from './utils';

const LetterList = props => {
  const { user, friend, letters } = props;
  return (
    <LetterWrapper>
      {letters.length === 0 && <p>아직 편지가 없습니다.</p>}
      {letters.map(letter => (
        <Letter key={letter.letterId} onClick={props.detailHandler}>
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
      ))}
    </LetterWrapper>
  );
};

export default LetterList;
