import React, { useEffect, useState } from 'react';
import MainWrapper from '../../components/common';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import style from './LetterDetail.module.css';

const LetterDetail = () => {
  const userId = useParams().id;
  const postId = useParams().postId;

  const [letter, setLetter] = useState({});

  const fetchLetter = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `http://localhost:3001/api/letters/${userId}/${postId}`,
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

  return (
    <MainWrapper>
      <div className={style.letterHeader}>
        <h5 className="nickname">{letter.letter_id}</h5>
      </div>

      <p>{letter.nickname}</p>
      <p>{letter.content}</p>
      <p>{letter.receive_date}</p>
    </MainWrapper>
  );
};

export default LetterDetail;
