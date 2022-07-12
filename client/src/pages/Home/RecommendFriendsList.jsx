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
      <Swiper navigation spaceBetween={180} slidesPerView={6}>
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
