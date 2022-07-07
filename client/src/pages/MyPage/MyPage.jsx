import React from 'react';
import styled from 'styled-components';
import defaultUserIcon from './icon/defaultUserIcon.png';
import settingIcon from './icon/settingIcon.png';
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

  const Profile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    grid-row: 2/3;

    > img {
      width: 100px;
      height: 100px;
      background-color: #ffe5b8;
      border-radius: 50%;

      margin: 20px 0;
    }

    .nickName {
      font-weight: bold;
      font-size: x-large;

      padding: 10px 0;
    }

    .introduction {
      font-size: large;
      padding: 0 0 20px 0;
    }

    .profileEdit,
    .userEdit {
      display: flex;
      align-items: center;

      font-size: small;
      color: gray;

      padding-bottom: 5px;

      > img {
        width: 15px;
        height: 15px;
        margin-right: 5px;
      }

      > p {
        ${'' /* 텍스트와 톱니바퀴 중앙 정렬 필요! */}
      }
    }
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
      <Profile>
        <img src={defaultUserIcon} alt="profileImg" />
        <div className="nickName">갓생살자</div>
        <div className="introduction">스터디 100%참여 목표!</div>
        <div className="profileEdit">
          <img src={settingIcon} alt="settingImg" />
          <div>프로필 수정</div>
        </div>
        <div className="userEdit">
          <img src={settingIcon} alt="settingImg" />
          <div>회원정보 변경</div>
        </div>
      </Profile>
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
