/* eslint-disable react/prop-types */
import * as React from 'react';
import styled from 'styled-components';

const OngoingStudy = styled.div`
  border: solid 1px gray;
  width: 70vw;
  padding: 20px 10px;
`;

const FinishedStudyName = styled.span`
  font-weight: bold;
  font-size: 0.9rem;
  color: black;

  position: relative;

  padding: 4px 6px;
  margin-right: 10px;

  :first-child {
    margin-left: 30px;
  }

  ::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    opacity: 0.2;
    border-radius: 2px;
  }
`;

const FinishedStudyInfo = () => {
  return (
    <OngoingStudy>
      <FinishedStudyName>코어 자바스크립트</FinishedStudyName>
      <FinishedStudyName>자바스크립트</FinishedStudyName>
    </OngoingStudy>
  );
};

export default FinishedStudyInfo;
