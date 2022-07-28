import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LetterWrapper } from './LetterStyle';
import LetterItem from './LetterItem';
import { useOutletContext } from 'react-router-dom';

const LetterList = () => {
  const friendId = useParams().id;
  const token = useSelector(state => state.auth.token);

  // 로그인한 유저
  const [user, setUser] = useState([]);
  // 친구인 유저
  const [friend, setFriend] = useState([]);
  // 편지 리스트
  const [letters] = useOutletContext();

  // 로그인한 유저 정보 받아오기
  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/auth/me', {
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
        `http://localhost:3001/api/users/${friendId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = res.data.user;
      setFriend(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchFriend();
  }, [friendId, token]);
  return (
    <LetterWrapper>
      {letters.length === 0 && <p>아직 편지가 없습니다.</p>}
      {letters.map(letter => (
        <LetterItem
          key={letter.letterId}
          letter={letter}
          friend={friend}
          user={user}
          token={token}
        />
      ))}
    </LetterWrapper>
  );
};

export default React.memo(LetterList);
