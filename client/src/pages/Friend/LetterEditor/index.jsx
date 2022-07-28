import React, { useState, useRef } from 'react';
import style from './LetterEditor.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { getDistance, getTime } from '../utils';

const LetterEditor = ({ handleWrite, postLetter, user, friend }) => {
  const friendId = useParams().id;
  const contentInput = useRef();
  const [state, setState] = useState({
    content: '',
  });

  const handleChangeState = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // 편지 작성
  const createHandler = content => {
    const letter = content[0];
    const friend_id = content[1];
    const distance = getDistance(
      user.longitude,
      user.latitude,
      friend.longitude,
      friend.latitude
    );
    const sendDate = new window.Date().toISOString();
    let receiveDate = new window.Date();
    const deliveryTime = getTime(distance);
    receiveDate = new window.Date(
      receiveDate.setMinutes(receiveDate.getMinutes() + deliveryTime)
    ).toISOString();
    const newLetter = {
      sendId: user.userId,
      receiveId: friend_id,
      sendDate: sendDate,
      receiveDate: receiveDate,
      deliveryTime: deliveryTime,
      content: letter,
    };

    postLetter(newLetter);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (state.content.length < 1) {
      // alert('편지 내용을 입력해주세요.');
      contentInput.current.focus();
      return;
    }
    const id = friendId;
    // onCreate([state.content, id]);
    createHandler([state.content, id]);
    handleWrite();
    setState({
      content: '',
    });
  };
  console.log(friend);
  return (
    <div className={style.LetterEditor}>
      <div className={style.FlexBox}>
        <CloseIcon
          onClick={handleWrite}
          style={{ width: '2rem', padding: '1rem .5rem', cursor: 'pointer' }}
        />
        <div className="btn" onClick={handleSubmit}>
          보내기
        </div>
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
          placeholder="탭하여 편지 쓰기..."
        />
      </div>
    </div>
  );
};

export default LetterEditor;
