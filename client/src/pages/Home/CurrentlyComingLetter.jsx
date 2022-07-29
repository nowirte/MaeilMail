import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initComingLetters } from '../../redux/reducers/mainLetters';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { formatDate } from '../Friend/utils';
import {
  Letter,
  LetterHeader,
  LetterContent,
  LetterFooter,
  Writer,
  Date,
} from '../Friend/LetterItem/LetterItemStyle';
import Stamp from '../../assets/stamp.png';
import DoneIcon from '@mui/icons-material/Done';
import styled from 'styled-components';

const CurrentlyComingLetter = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const mainComingLetters = useSelector(
    state => state.mainLetters.mainComingLetters
  );
  const fetchCurrentlyComingLetter = async () => {
    try {
      const res = await axios.get(
        'http://localhost:3001/api/letters/my/incoming',
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await res.data;
      dispatch(initComingLetters({ mainComingLetters: data }));
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchCurrentlyComingLetter();
  }, []);
  return (
    <Container>
      <Swiper spaceBetween={360} slidesPerView={5}>
        {!mainComingLetters ? (
          <div>현재 배송 중인 편지를 로딩중입니다.</div>
        ) : (
          mainComingLetters.map((letter, index) => (
            <SwiperSlide key={index}>
              <Letter key={letter.letterId}>
                <LetterHeader>
                  <span>{letter.isRead ? <DoneIcon /> : ''}</span>
                  <img src={Stamp} alt="stamp" />
                </LetterHeader>
                <LetterContent>✉️ 편지가 오고 있습니다.</LetterContent>
                <LetterFooter>
                  <Writer>{letter.nickname}</Writer>
                  <Date>{formatDate(letter.receiveDate)}</Date>
                </LetterFooter>
              </Letter>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 45px;
  margin-left: 10px;
`;
export default CurrentlyComingLetter;
