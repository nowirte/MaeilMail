import React, { useState, useEffect, useCallback } from 'react';
import LetterList from './LetterList';
import { useOutletContext } from 'react-router-dom';

const Letters = () => {
  const [letters, setLetters] = useOutletContext();

  return <LetterList key={Math.random()} letters={letters} />;
};

export default Letters;
