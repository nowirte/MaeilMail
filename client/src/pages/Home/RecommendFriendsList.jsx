import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {
  RecommendFriendsListContainer,
  RecommendationFriendBox,
  RecommendFriend,
  RecommendFriendName,
} from './styles/StyledRecommendFriendList';

const RecommendFriendsList = ({ data }) => {
  return (
    <RecommendFriendsListContainer>
      <Swiper navigation spaceBetween={180} slidesPerView={6}>
        {data &&
          data.map(item => (
            <SwiperSlide>
              <RecommendationFriendBox>
                <RecommendFriend>
                  <img src={item.image} alt={item.nickname} />
                </RecommendFriend>
                <RecommendFriendName>
                  <span>{item.nickname}</span>
                </RecommendFriendName>
              </RecommendationFriendBox>
            </SwiperSlide>
          ))}
      </Swiper>
    </RecommendFriendsListContainer>
  );
};

export default RecommendFriendsList;
