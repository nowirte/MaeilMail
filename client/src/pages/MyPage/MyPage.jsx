import React from 'react';
import styled from 'styled-components';
import Nav from '../../components/Nav';
import ProfileInfo from './Profile';
import OngoingStudyInfo from './OngoingStudyInfo';
import ScheduledStudyInfo from './ScheduledStudyInfo';
import FinishedStudyInfo from './FinishedStudyInfo';

const MyPage = () => {
  const Container = styled.div`
    width: 100vw;
    height: 100vh;

    margin-top: 50px;

    display: flex;
    justify-content: center;
  `;

  const Study = styled.div`
    margin: 0 50px;
    > div {
      margin-bottom: 40px;
    }
  `;

  const StateTitle = styled.p`
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 10px;
  `;

  return (
    <div>
      <Nav>nav 임시 | 높이 100px</Nav>
      <Container>
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
    </div>
  );
};

export default MyPage;
