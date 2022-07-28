import React, { useState, useRef, useEffect } from 'react';
import style from './LetterEditor.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { getDistance, getTime } from '../utils';

const LetterEditor = ({ handleWrite, postLetter, user, friend }) => {
  const friendId = useParams().id;
  const contentInput = useRef();
  const [content, setContent] = useState('');
  const [saveTemporarily, setSaveTemporarily] = useState(false);
  const [savedContent, setSavedContent] = useState(null);

  const handleChangeState = e => {
    setContent(e.target.value);
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

  // 보내기 버튼 클릭
  const handleSubmit = e => {
    e.preventDefault();

    if (content.length < 1) {
      // alert('편지 내용을 입력해주세요.');
      contentInput.current.focus();
      return;
    }
    const id = friendId;
    createHandler([content, id]);
    handleWrite();
    setContent('');
  };

  // 임시저장 버튼 클릭
  const handleTemporaryStore = () => {
    setSaveTemporarily(true);
    setTemporaryContent();
    handleWrite(false);
  };

  // 임시저장 유무 확인
  const checkTemporaryContent = async () => {
    const content = await localStorage.getItem(friendId);
    if (content === null) setSaveTemporarily(false);
    else {
      setSavedContent(content);
      setSaveTemporarily(true);
    }
    return;
  };

  // 임시저장 저장하기
  const setTemporaryContent = () => {
    localStorage.setItem(friendId, content);
    return;
  };

  // 임시저장 불러오기
  const getTemporaryContent = () => {
    setContent(savedContent);
    setSaveTemporarily(false);
  };

  useEffect(() => {
    checkTemporaryContent();
  }, []);

  return (
    <div className={style.LetterEditor}>
      <div className={style.FlexBox}>
        <span className={style.Btn}>
          <CloseIcon onClick={handleWrite} style={{ width: '2rem' }} />
        </span>
        <div>
          {saveTemporarily === false ? (
            <span className={style.Btn} onClick={handleTemporaryStore}>
              임시저장
            </span>
          ) : (
            <span className={style.Btn} onClick={getTemporaryContent}>
              불러오기
            </span>
          )}
          <span className={style.Btn} onClick={handleSubmit}>
            보내기
          </span>
        </div>
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={content}
          onChange={handleChangeState}
          placeholder="탭하여 편지 쓰기..."
        />
      </div>
    </div>
  );
};

export default LetterEditor;
