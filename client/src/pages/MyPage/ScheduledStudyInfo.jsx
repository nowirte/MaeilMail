/* eslint-disable react/prop-types */
import * as React from 'react';
import styled from 'styled-components';

// 이미지 조각
import studyCategoryIcon from './icon/studyCategoryIcon.png';
import studyPeriodIcon from './icon/studyPeriodIcon.png';
import userMinsize from './icon/userMinsize.png';

const ScheduledStudy = styled.div`
  display: flex;
  align-items: center;

  border: solid 1px gray;
  width: 70vw;
  padding: 20px 10px;

  position: relative;
  & > p {
    margin-left: 30px;
    font-weight: bold;
  }
`;

const StudyIcon = styled.img`
  width: 25px;
  height: 25px;
`;

const StudyInfoWrappers = styled.div`
  display: flex;
`;

const StudyInfoWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  margin-left: 60px;
  & > h5 {
    margin-left: 8px;
    margin-right: 8px;
  }
`;

const StudyCategory = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
  position: relative;
  padding: 4px 6px;
  color: red;

  ::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: red;
    opacity: 0.2;
    border-radius: 2px;
  }
`;

const StudyExplanation = styled.p`
  font-size: 0.9rem;
`;

const CancleBtn = styled.button`
  background-color: #ff8303;
  color: white;
  border: none;
  border-radius: 13px;
  padding: 14px 12px;
  text-align: center;

  width: 114px;
  height: 39px;

  position: absolute;
  right: 50px;
`;

const ScheduledStudyInfo = () => {
  return (
    <ScheduledStudy>
      <p>코어 자바스크립트</p>
      <StudyInfoWrappers>
        <StudyInfoWrapper>
          <StudyIcon src={studyCategoryIcon} />
          <h5>카테고리</h5>
          <StudyCategory>it</StudyCategory>
        </StudyInfoWrapper>
        <StudyInfoWrapper>
          <StudyIcon src={studyPeriodIcon} />
          <h5>스터디 기간</h5>
          <StudyExplanation>22/06/20~22/07/19</StudyExplanation>
        </StudyInfoWrapper>
        <StudyInfoWrapper>
          <StudyIcon src={userMinsize} />
          <h5>인원 수</h5>
          <StudyExplanation> 6명</StudyExplanation>
        </StudyInfoWrapper>
      </StudyInfoWrappers>
      <CancleBtn>취소하기</CancleBtn>
    </ScheduledStudy>
  );
};

export default ScheduledStudyInfo;
