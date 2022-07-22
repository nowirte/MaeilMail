import React, { useState, useEffect, useCallback } from 'react';
import LetterList from './LetterList';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

const Letters = () => {
  const friendId = useParams().id;
  const token = useSelector(state => state.auth.token);

  // 로그인한 유저
  // const [user, setUser] = useState([]);
  // 친구인 유저
  // const [friend, setFriend] = useState([]);
  // 편지 리스트
  const [letters, setLetters] = useOutletContext();

  // 로그인한 유저 정보 받아오기
  // const fetchUser = useCallback(async () => {
  //   try {
  //     const res = await axios.get('http://localhost:3001/api/auth/me', {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });
  //     const data = res.data.user;
  //     setUser(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [user]);

  // 선택한 친구 정보 받아오기
  // const fetchFriend = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:3001/api/users/${friendId}`,
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );
  //     const data = res.data.user;
  //     setFriend(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  //   fetchFriend();
  // }, []);

  return (
    <LetterList
      key={Math.random()}
      // user={user}
      // friend={friend}
      letters={letters}
    />
  );
};

export default Letters;
