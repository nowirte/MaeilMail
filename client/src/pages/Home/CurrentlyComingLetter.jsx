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
  const [currentlyLetters, setCurrentlyLetters] = useState([]);
  const fetchCurrentlyComingLetter = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        'http://localhost:3001/api/letters/?isArrived=false',
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await res.data;
      setCurrentlyLetters(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchCurrentlyComingLetter();
  }, []);

  console.log(currentlyLetters);

  return (
    <Container>
      <Swiper spaceBetween={360} slidesPerView={5}>
        {!currentlyLetters ? (
          <div>현재 배송 중인 편지를 로딩중입니다.</div>
        ) : (
          currentlyLetters.map((letter, index) => (
            <SwiperSlide key={index}>
              <CurrentlyComingContainer>
                <CurrentlyComingContentContainer>
                  <LetterContent>✉️ 편지가 오고 있습니다.</LetterContent>
                </CurrentlyComingContentContainer>
                <CurrentlyProfile>
                  <CurrentlyImageContainer>
                    <img src={letter.send_img} alt={letter.sendId} />
                  </CurrentlyImageContainer>
                  <CurrentlyIntroduction>
                    <CurrentlyFriendName>{letter.nickname}</CurrentlyFriendName>
                    <CurrentlyDate>{letter.user_id}</CurrentlyDate>
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
