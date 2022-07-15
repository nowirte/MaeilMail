import React from 'react';
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
} from './styles/StyledCurrentlyComingLetter';

const CurrentlyComingLetter = () => {
  return (
    <Container>
      <Swiper navigation spaceBetween={360} slidesPerView={5}>
        <SwiperSlide>
          <CurrentlyComingContainer>
            <CurrentlyComingContentContainer>
              <LetterContent>
                Hi, How is it going? Let me talk about myself. I am 뚱이 from
                United States and 18 yrs old and I graduated High school this
                year.
              </LetterContent>
            </CurrentlyComingContentContainer>
            <CurrentlyProfile>
              <CurrentlyImageContainer>
                <img src="/img/뚱이.png" alt="뚱이" />
              </CurrentlyImageContainer>
              <CurrentlyIntroduction>
                <CurrentlyFriendName>뚱이</CurrentlyFriendName>
                <CurrentlyDate>2022년 7월 8일</CurrentlyDate>
                <CurrentlyLocation>대한민국</CurrentlyLocation>
              </CurrentlyIntroduction>
            </CurrentlyProfile>
          </CurrentlyComingContainer>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default CurrentlyComingLetter;
