import React from 'react';
import MainWrapper from '../../components/common';
import FriendInfo from './FriendInfo';
import Stamp from '../../assets/stamp.png';

import {
  LetterWrapper,
  Letter,
  LetterHeader,
  LetterContent,
  LetterFooter,
  Writer,
  Date,
} from './style';

const Friend = () => {
  return (
    <MainWrapper>
      <FriendInfo />
      <LetterWrapper>
        <Letter>
          <LetterHeader>
            <img src={Stamp} alt="" />
          </LetterHeader>
          <LetterContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            eum ipsa animi, amet labore consectetur aspernatur facilis
            doloremque nesciunt iure deleniti dolorum, quos, optio nostrum hic
            quam deserunt laboriosam doloribus.
          </LetterContent>
          <LetterFooter>
            <Writer>Arae Boram</Writer>
            <Date>2시간 후 도착</Date>
          </LetterFooter>
        </Letter>
        <Letter>
          <LetterHeader>
            <img src={Stamp} alt="" />
          </LetterHeader>
          <LetterContent>...</LetterContent>
          <LetterFooter>
            <Writer>Marco</Writer>
            <Date>1시간 후 도착</Date>
          </LetterFooter>
        </Letter>
        <Letter>
          <LetterHeader>
            <img src={Stamp} alt="" />
          </LetterHeader>
          <LetterContent>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti,
            temporibus a! A saepe amet dolore soluta nam repellat quia aliquam
            incidunt commodi necessitatibus consequuntur, reiciendis voluptas
            nemo officia molestias nobis.
          </LetterContent>
          <LetterFooter>
            <Writer>Marco</Writer>
            <Date>2030.12.05</Date>
          </LetterFooter>
        </Letter>
      </LetterWrapper>
    </MainWrapper>
  );
};

export default Friend;
