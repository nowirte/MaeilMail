/* eslint-disable import/no-unresolved */

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {
  RecommendFriendsListContainer,
  RecommendationFriendBox,
  RecommendFriend,
  RecommendFriendName,
} from './styles/StyledRecommendFriendList';

const RecommendFriendsList = () => {
  return (
    <RecommendFriendsListContainer>
      <Swiper
        navigation
        spaceBetween={180}
        slidesPerView={5}
        breakpoints={{
          640: {
            width: 640,
            slidesPerView: 5,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 6,
          },
          // when window width is >= 991px
          991: {
            width: 991,
            slidesPerView: 7,
          },
          // when window width is >= 1024px
          1024: {
            width: 1024,
            slidesPerView: 7,
          },
        }}
      >
        <SwiperSlide>
          <RecommendationFriendBox>
            <RecommendFriend>
              <img src="/img/뚱이.png" alt="추천 친구 이미지" />
            </RecommendFriend>
            <RecommendFriendName>
              <span>뚱이</span>
            </RecommendFriendName>
          </RecommendationFriendBox>
        </SwiperSlide>
      </Swiper>
    </RecommendFriendsListContainer>
  );
};

export default RecommendFriendsList;
