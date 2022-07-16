import React from 'react';
import { Link } from 'react-router-dom';
import Stamp from '../../assets/stamp.png';
import SendStamp from '../../assets/send-stamp.png';
import {
  LetterWrapper,
  Letter,
  LetterHeader,
  LetterContent,
  LetterFooter,
  Writer,
  Date,
} from './LetterStyle';
import { formatDate } from './module';

const LetterList = ({ user, data, friend }) => {
  return (
    <LetterWrapper>
      {data.length === 0 && <p>아직 편지가 없습니다.</p>}
      {data.map(letter => (
        // <Link to={letter.letterId}>
        <Letter key={letter.letterId}>
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
            <Writer>{letter.receiveId}</Writer>
            <Date>{formatDate(letter.receiveDate)}</Date>
          </LetterFooter>
        </Letter>
        // </Link>
      ))}
    </LetterWrapper>
  );
};

export default LetterList;
