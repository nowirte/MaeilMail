import * as React from 'react';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';

// 이미지 조각
import userMinsize from '../../assets/userMinsize.png';
import studyCategoryIcon from '../../assets/studyCategoryIcon.png';
import studyPeriodIcon from '../../assets/studyPeriodIcon.png';
import testImg from '../../assets/testImg.png';

const Container = styled.div`
  width: 90%;
`;

const Item = styled.div`
  border: solid 1px gray;
  padding: 5px;
  .studyName {
    font-weight: bold;
  }
  > div {
    padding: 8px;
  }

  .studyInfo {
    display: grid;
    grid-template-columns: 300px 90px 1fr 1fr;
    grid-template-rows: repeat(5, 30px);
    place-items: center;

    & > div {
      display: flex;
      height: 25px;
    }

    & > img {
      grid-column: 1 / 2;
      grid-row: 1 / 6;
    }

    .category {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }

    .period {
      grid-column: 2 / 3;
      grid-row: 3 / 4;
    }

    .people {
      grid-column: 2 / 3;
      grid-row: 4 / 5;
    }
  }
`;

const StudyState = styled.div`
  font-size: x-large;
  font-weight: bold;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
`;

const BasicStack = () => {
  return (
    <Container>
      <Stack spacing={2}>
        <StudyState>진행중인 스터디</StudyState>
        <Item>
          <div className="studyName">스터디 이름</div>
          <div className="studyInfo">
            <img src={testImg} alt="studyInfoIcon" style={{ width: 250 }} />
            <div className="category">
              <Icon src={studyCategoryIcon} alt="studyInfoIcon" />
              <div>카테고리</div>
            </div>
            <div className="period">
              <Icon src={studyPeriodIcon} alt="studyInfoIcon" />
              <div>기간</div>
            </div>
            <div className="people">
              <Icon src={userMinsize} alt="studyInfoIcon" />
              <div>인원 수</div>
            </div>
          </div>
        </Item>
        <StudyState>진행 예정 스터디</StudyState>
        <Item>
          <div className="studyName">스터디 이름</div>
        </Item>
        <StudyState>종료된 스터디</StudyState>
        <Item>
          <div className="studyName">스터디 이름</div>
        </Item>
      </Stack>
    </Container>
  );
};

export default BasicStack;
