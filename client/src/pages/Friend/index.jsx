import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Outlet } from 'react-router';
import MainWrapper from '../../components/common';
import FriendInfo from './FriendInfo';
import { WriteBtn } from '../Friend/LetterItem/LetterItemStyle';
import LetterEditor from './LetterEditor';
import CreateIcon from '@mui/icons-material/Create';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Friend = () => {
  const friendId = useParams().id;
  const token = useSelector(state => state.auth.token);

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

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

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
  const fetchFriend = useCallback(async () => {
    try {
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
  }, [friendId]);

  // 편지 리스트 받아오기
  const fetchLetters = useCallback(
    async page => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/letters/${friendId}?page=${page}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const data = res.data;
        setLetters(...letters, data.findedLetter);
        setTotalPage(data.totalPage);
      } catch (error) {
        console.error(error);
      }
    },
    [friendId]
  );

  // 편지 작성 요청
  const postLetter = async newLetter => {
    try {
      await axios.post(
        `http://localhost:3001/api/letters/${friendId}`,
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
    await fetchLetters(page);
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
  }, []);

  const [bottom, setBottom] = useState(null);
  const bottomObserver = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1);
          fetchLetters(page);
          console.log(page, totalPage, letters);
        }
      },
      { threshold: 1 }
    );
    bottomObserver.current = observer;
  }, []);

  useEffect(() => {
    const observer = bottomObserver.current;
    if (bottom) {
      observer.observe(bottom);
    }
    return () => {
      if (bottom) {
        observer.unobserve(bottom);
      }
    };
  }, [bottom]);

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
      <div ref={setBottom}>observer</div>

      {/* 편지 보내기 버튼, 편지 작성 컴포넌트 */}
      {!writeIsShown ? (
        <WriteBtn onClick={writeHandler}>
          <CreateIcon />
          편지 보내기
        </WriteBtn>
      ) : (
        <LetterEditor
          handleWrite={writeHandler}
          postLetter={postLetter}
          user={user}
          friend={friend.info}
        />
      )}
    </MainWrapper>
  );
};

export default Friend;
