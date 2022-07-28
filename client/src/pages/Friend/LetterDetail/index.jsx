import React, { useState, useEffect } from 'react';
import { formatDate } from '../utils';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import LetterWrapper from '../LetterList/LetterListStyle';
import style from './LetterDetail.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';

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

  useEffect(() => {
    fetchLetter();
  }, []);
  console.log(letter);

  return (
    <LetterWrapper>
      <Link to={`/friend/${friendId}`}>
        <ArrowBackIcon />
      </Link>

      <li className={style.letterContainer}>
        <pre className={style.letterContent}>{letter.content}</pre>
        <p className={style.letterSender}>{letter.nickname}</p>
        <p className={style.receiveDate}>{formatDate(letter.receiveDate)}</p>
      </li>
    </LetterWrapper>
  );
};

export default LetterDetail;
