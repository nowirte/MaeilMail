import React, { useState, useEffect, useCallback } from 'react';
import MainWrapper from '../../components/common';
import FriendInfo from './FriendInfo';
import LetterList from './LetterList';
import { WriteBtn } from './LetterStyle';
import LetterEditor from './LetterEditor';
import { getDistance, getTime, formatDate } from './utils';
import CreateIcon from '@mui/icons-material/Create';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import LetterDetail from './LetterDetail';
import { LetterWrapper } from './LetterStyle';
import style from './LetterDetail.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Detail = () => {
  const friendId = useParams().id;
  const postId = useParams().postId;

  const [writeIsShown, setWriteIsShown] = useState(false);
  const [friend, setFriend] = useState({
    favor: [],
    language: [],
    info: {},
  });
  const [letter, setLetter] = useState({});

  const fetchFriend = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `http://localhost:3001/api/users/${friendId}`,
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
  const userId = friend.info.user_id;

  const fetchLetter = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `http://localhost:3001/api/letters/${friendId}/${postId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = res.data;
      setLetter(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFriend();
    fetchLetter();
  }, []);

  const writeHandler = () => {
    setWriteIsShown(current => !current);
  };

  return (
    <MainWrapper>
      {/* 친구 프로필 영역 */}
      <FriendInfo
        friend={friend.info}
        favor={friend.favor}
        language={friend.language}
      />

      <LetterWrapper>
        <Link to={`/friend/${friendId}`}>
          <ArrowBackIcon />
        </Link>

        <li className={style.letterContainer}>
          <p>{letter.nickname}</p>
          <p className={style.letterContent}>{letter.content}</p>
          <p>{formatDate(letter.receive_date)}</p>
        </li>
      </LetterWrapper>

      {/* 편지 보내기 버튼, 편지 작성 컴포넌트 */}
      {!writeIsShown ? (
        <WriteBtn onClick={writeHandler}>
          <CreateIcon />
          편지 보내기
        </WriteBtn>
      ) : (
        <LetterEditor handleWrite={writeHandler} />
      )}
    </MainWrapper>
  );
};

export default Detail;
