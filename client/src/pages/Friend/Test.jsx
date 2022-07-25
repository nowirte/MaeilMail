import React, { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router';
import MainWrapper from '../../components/common';
import FriendInfo from './FriendInfo';
import { WriteBtn } from './LetterStyle';
import LetterEditor from './LetterEditor';
import { getDistance, getTime } from './utils';
import CreateIcon from '@mui/icons-material/Create';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FriendDetail = () => {
  const friendId = useParams().id;
  const token = useSelector(state => state.auth.token);

  // 편지 보내기 버튼
  const [writeIsShown, setWriteIsShown] = useState(false);
  // 편지 리스트
  const [letters, setLetters] = useState([]);
  // 로그인한 유저
  const [user, setUser] = useState({});
  // 친구인 유저
  const [friend, setFriend] = useState({
    favor: [],
    language: [],
    info: {},
  });

  // 로그인한 유저 정보 받아오기
  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get('/api/auth/me', {
        headers: {
          Authorization: token,
        },
      });
      const data = res.data.user;
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  // 선택한 친구 정보 받아오기
  const fetchFriend = async () => {
    try {
      const res = await axios.get(
        `/api/users/${friendId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = res.data;
      setFriend({
        favor: data.user.Favor,
        language: data.user.Language,
        info: data.user,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 편지 리스트 받아오기
  const fetchLetters = useCallback(async () => {
    try {
      const res = await axios.get(
        `/api/letters/${friendId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = res.data;
      setLetters(data);
    } catch (error) {
      console.error(error);
    }
  }, [friendId]);

  // 편지 작성하기
  const postLetter = async newLetter => {
    try {
      await axios.post(
        `/api/letters/${friendId}`,
        newLetter,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
    await fetchLetters();
  };

  // 편지 작성
  const createHandler = content => {
    const letter = content[0];
    const friend_id = content[1];
    console.log(letter, friend_id);
    const distance = getDistance(
      user.longitude,
      user.latitude,
      friend.info.longitude,
      friend.info.latitude
    );
    const sendDate = new window.Date().toISOString();
    let receiveDate = new window.Date();
    const deliveryTime = getTime(distance);
    receiveDate = new window.Date(
      receiveDate.setMinutes(receiveDate.getMinutes() + deliveryTime)
    ).toISOString();
    const newLetter = {
      sendId: user.user_id,
      receiveId: friend_id,
      sendDate: sendDate,
      receiveDate: receiveDate,
      deliveryTime: deliveryTime,
      content: letter,
    };

    postLetter(newLetter);
  };

  // 편지 보내기 버튼
  const writeHandler = useCallback(() => {
    setWriteIsShown(current => !current);
  }, [writeIsShown]);

  useEffect(() => {
    // 유저 정보 받아오기
    fetchUser();
    // 친구 정보 받아오기
    fetchFriend();
    // 편지 리스트 받아오기
    fetchLetters();
  }, [fetchLetters]);

  return (
    <MainWrapper>
      {/* 친구 프로필 영역 */}
      <FriendInfo
        friend={friend.info}
        favor={friend.favor}
        language={friend.language}
      />

      {/* 하위 컴포넌트가 들어올 자리 */}
      <Outlet context={[letters, setLetters]} />

      {/* 편지 보내기 버튼, 편지 작성 컴포넌트 */}
      {!writeIsShown ? (
        <WriteBtn onClick={writeHandler}>
          <CreateIcon />
          편지 보내기
        </WriteBtn>
      ) : (
        <LetterEditor handleWrite={writeHandler} onCreate={createHandler} />
      )}
    </MainWrapper>
  );
};

export default FriendDetail;
