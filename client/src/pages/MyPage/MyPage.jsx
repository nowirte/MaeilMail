import React from 'react';
import styled from 'styled-components';
import ProfileInfo from './Profile';
import OngoingStudyInfo from './OngoingStudyInfo';
import ScheduledStudyInfo from './ScheduledStudyInfo';
import FinishedStudyInfo from './FinishedStudyInfo';

const MyPage = () => {
  const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: grid;
    grid-template-columns: 400px 2fr;
    grid-template-rows: 100px 1fr 1fr;
  `;

  const Study = styled.div`
    grid-row: 2 / 4;

    > div {
      margin-bottom: 20px;
    }
  `;

  const StateTitle = styled.p`
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 10px;
  `;

  return (
    <Container>
      <div>nav 임시 | 높이 100px</div>
      <ProfileInfo />
      <Study>
        <StateTitle>진행중인 스터디</StateTitle>
        <OngoingStudyInfo />
        <StateTitle>진행 예정 스터디</StateTitle>
        <ScheduledStudyInfo />
        <StateTitle>종료된 스터디</StateTitle>
        <FinishedStudyInfo />
      </Study>
    </Container>
  );
};

export default MyPage;
