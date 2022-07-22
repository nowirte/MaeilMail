import React, { useState, useEffect, useCallback } from 'react';
import LetterList from './LetterList';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LetterDetail from './LetterDetail';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

const FriendDetail = () => {
  const friendId = useParams().id;
  const token = useSelector(state => state.auth.token);

  // 편지 리스트
  const [letters, setLetters] = useState([]);
  // 로그인한 유저
  const [user, setUser] = useOutletContext();
  // 친구인 유저
  const [friend, setFriend] = useOutletContext();

  const fetchLetters = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/letters/${friendId}`,
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

  useEffect(() => {
    fetchLetters();
  }, [fetchLetters]);

  return <LetterList user={user} friend={friend} letters={letters} />;
};

export default FriendDetail;
