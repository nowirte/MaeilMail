import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {
  Container,
  CurrentlyComingContainer,
  CurrentlyComingContentContainer,
  LetterContent,
  CurrentlyProfile,
  CurrentlyImageContainer,
  CurrentlyIntroduction,
  CurrentlyFriendName,
  CurrentlyDate,
  CurrentlyLocation,
  CurrentlyTickingTime,
} from './styles/StyledCurrentlyComingLetter';

const CurrentlyComingLetter = () => {
  const [currentlyLetters, setCurrentlyLetters] = useState(undefined);
  useEffect(() => {
    axios
      .get('http://localhost:3333/letter?receiveId=2&status=incoming')
      .then(res => setCurrentlyLetters(res.data));
  }, []);
  return (
    <Container>
      <Swiper navigation spaceBetween={360} slidesPerView={5}>
        {!currentlyLetters ? (
          <div>현재 배송 중인 편지를 로딩중입니다.</div>
        ) : (
          currentlyLetters.map((letter, index) => (
            <SwiperSlide key={`index`}>
              <CurrentlyComingContainer>
                <CurrentlyComingContentContainer>
                  <LetterContent>{letter.content}</LetterContent>
                </CurrentlyComingContentContainer>
                <CurrentlyProfile>
                  <CurrentlyImageContainer>
                    <img src={letter.send_img} alt={letter.sendId} />
                  </CurrentlyImageContainer>
                  <CurrentlyIntroduction>
                    <CurrentlyFriendName>{letter.sendId}</CurrentlyFriendName>
                    <CurrentlyDate>{letter.sendDate}</CurrentlyDate>
                    <CurrentlyLocation>{letter.sendLocation}</CurrentlyLocation>
                    <CurrentlyTickingTime>
                      {letter.deliveryTime}
                    </CurrentlyTickingTime>
                  </CurrentlyIntroduction>
                </CurrentlyProfile>
              </CurrentlyComingContainer>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </Container>
  );
};

export default CurrentlyComingLetter;
