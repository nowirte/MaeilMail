import React, { useState, useRef } from 'react';
import style from './LetterEditor.module.css';

const LetterEditor = ({ handleWrite, onCreate }) => {
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

  const handleSubmit = e => {
    e.preventDefault();
    if (state.content.length < 1) {
      alert('편지 내용을 입력해주세요.');
      contentInput.current.focus();
      return;
    }
    onCreate(state.content);
    setState({
      content: '',
    });
    handleWrite();
  };

  return (
    <div className={style.LetterEditor}>
      <h2>상대방 프로필</h2>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <button onClick={handleSubmit}>보내기</button>
        <button onClick={handleWrite}>취소하기</button>
      </div>
    </div>
  );
};

export default LetterEditor;
