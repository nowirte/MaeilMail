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

const FriendDetail = () => {
  const [profileIsShown, setProfileIsShown] = useState(false);
  const [writeIsShown, setWriteIsShown] = useState(false);

  const showProfileHandler = () => {
    setProfileIsShown(true);
  };

  const hideProfileHandler = () => {
    console.log(profileIsShown);
    setProfileIsShown(false);
  };

  const showWriteHandler = () => {
    setWriteIsShown(true);
  };

  return (
    <MainWrapper>
      {profileIsShown && <Modal onClose={hideProfileHandler} />}
      <FriendInfo onShowProfile={showProfileHandler} />
      <LetterWrapper>
        <Letter future>
          <LetterHeader>
            <img src={Stamp} alt="" />
          </LetterHeader>
          <LetterContent future>
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
      {!writeIsShown && (
        <WriteBtn onClick={showWriteHandler}>편지 보내기</WriteBtn>
      )}
    </MainWrapper>
  );
};

export default FriendDetail;
