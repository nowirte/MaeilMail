import React, { useState, useEffect } from 'react';
import { formatDate } from '../utils';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import LetterWrapper from '../LetterList/LetterListStyle';
import style from './LetterDetail.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const LetterDetail = () => {
  const friendId = useParams().id;
  const postId = useParams().postId;
  const token = useSelector(state => state.auth.token);
  const [letter, setLetter] = useState({});

  const fetchLetter = async () => {
    try {
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

  const handleCopyClipBoard = async text => {
    try {
      await navigator.clipboard.writeText(text);

      alert('복사 성공!');
    } catch (error) {
      alert('복사 실패!');
    }
  };

  useEffect(() => {
    fetchLetter();
  }, []);

  return (
    <LetterWrapper>
      <Link to={`/friend/${friendId}`}>
        <ArrowBackIcon />
      </Link>

      <li className={style.letterContainer}>
        <div className={style.letterHeader}>
          <span
            className={style.letterCopyIcon}
            title="복사"
            onClick={() => handleCopyClipBoard(letter.content)}
          >
            <ContentCopyIcon />
          </span>
        </div>
        <pre className={style.letterContent}>{letter.content}</pre>
        <p className={style.letterSender}>{letter.nickname}</p>
        <p className={style.receiveDate}>{formatDate(letter.receiveDate)}</p>
      </li>
    </LetterWrapper>
  );
};

export default LetterDetail;
