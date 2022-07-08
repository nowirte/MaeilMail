import * as React from 'react';
import styled from 'styled-components';

// 이미지 조각
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import testImg from './icon/testImg.png';

const OngoingStudy = styled.div`
  border: solid 1px gray;
  width: 60vw;
  height: 180px;
  padding: 20px 10px 10px;

  position: relative;
  & > p {
    margin-bottom: 20px;
    margin-left: 30px;
    font-weight: bold;
  }
`;

const StudyImg = styled.img`
  width: 250px;
  position: absolute;
  left: 40px;
  bottom: 30px;
`;

const StudyInfoWrappers = styled.div`
  margin-top: 30px;
`;

const StudyInfoWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  margin-left: 300px;
  margin-top: 10px;
  & > h5 {
    width: 88px;
    margin-left: 8px;
    margin-right: 10px;

    border-right: 1px gray solid;
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

const EntranceBtn = styled.button`
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
  bottom: 30px;
`;

const OngoingStudyInfo = () => {
  return (
    <OngoingStudy>
      <p>코어 자바스크립트</p>
      <StudyImg src={testImg} />
      <StudyInfoWrappers>
        <StudyInfoWrapper>
          <DiscountOutlinedIcon />
          <h5>카테고리</h5>
          <StudyCategory>it</StudyCategory>
        </StudyInfoWrapper>
        <StudyInfoWrapper>
          <CalendarMonthOutlinedIcon />
          <h5>스터디 기간</h5>
          <StudyExplanation>22/06/20~22/07/19</StudyExplanation>
        </StudyInfoWrapper>
        <StudyInfoWrapper>
          <SupervisorAccountOutlinedIcon />
          <h5>인원 수</h5>
          <StudyExplanation> 6명</StudyExplanation>
        </StudyInfoWrapper>
      </StudyInfoWrappers>
      <EntranceBtn>입장하기</EntranceBtn>
    </OngoingStudy>
  );
};

export default OngoingStudyInfo;
