/* eslint-disable import/no-unresolved */

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {
  RecentlyContainer,
  RecentlyContentContainer,
  LetterContent,
  RecentlyProfile,
  RecentlyImageContainer,
  RecentlyIntroduction,
  RecentlyFriendName,
  RecentlyDate,
  RecentlyLocation,
  Container,
} from './styles/StyledRecentlyArrivedLetter';

const RecentlyArrivedLetter = () => {
  return (
    <Container>
      <Swiper navigation spaceBetween={360} slidesPerView={5}>
        <SwiperSlide>
          <RecentlyContainer>
            <RecentlyContentContainer>
              <LetterContent>
                안녕하세요! 가나다라마바사 아자차카타파하 abcdefghijklmnop
                qrstuvwxyz 어쩌구 저쩌구
                블라블라블라블라블라블랄블라ㅁㄴㅇㄻㄴㅇㄹ
              </LetterContent>
            </RecentlyContentContainer>
            <RecentlyProfile>
              <RecentlyImageContainer>
                <img src="/img/뚱이.png" alt="뚱이" />
              </RecentlyImageContainer>
              <RecentlyIntroduction>
                <RecentlyFriendName>뚱이</RecentlyFriendName>
                <RecentlyDate>2022년 7월 8일</RecentlyDate>
                <RecentlyLocation>대한민국</RecentlyLocation>
              </RecentlyIntroduction>
            </RecentlyProfile>
          </RecentlyContainer>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default RecentlyArrivedLetter;
