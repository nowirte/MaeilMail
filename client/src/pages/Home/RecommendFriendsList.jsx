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

const RecommendFriendsList = props => {
  return (
    <RecommendFriendsListContainer>
      {props.data && (
        <Swiper navigation spaceBetween={180} slidesPerView={6}>
          <SwiperSlide>
            <RecommendationFriendBox>
              <RecommendFriend>
                <img src={props.data.img} alt={props.data.name} />
              </RecommendFriend>
              <RecommendFriendName>
                <span>{props.data.name}</span>
              </RecommendFriendName>
            </RecommendationFriendBox>
          </SwiperSlide>
        </Swiper>
      )}
    </RecommendFriendsListContainer>
  );
};

export default RecommendFriendsList;
