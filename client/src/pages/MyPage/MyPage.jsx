import React from 'react';
import styled from 'styled-components';
import defaultUserIcon from '../../assets/defaultUserIcon.png';
import settingIcon from '../../assets/settingIcon.png';
import studyCategoryIcon from '../../assets/studyCategoryIcon.png';
import studyPeriodIcon from '../../assets/studyPeriodIcon.png';
import userMinsize from '../../assets/userMinsize.png';

const MyPage = () => {
  const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: grid;
    grid-template-columns: 300px 2fr;
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
    background-color: blue;

    grid-row: 2 / 4;

    > div {
      margin-bottom: 20px;
    }
  `;

  const CurrentStudy = styled.div`
    font-size: large;
    font-weight: bold;
    > div {
      font-weight: normal;
    }
  `;

  const ScheduledStudy = styled.div`
    font-size: large;
    font-weight: bold;

    .scheduled {
      display: felx;
      > div {
        font-weight: normal;
        margin-right: 10px;
      }
    }
  `;

  const FinishedStudy = styled.div`
    font-size: large;
    font-weight: bold;
  `;

  const StudyArea = styled.div`
    border: solid gray 1px;
    margin: 10px;
    padding: 10px;

    font-size: medium;

    .studyName {
      font-weight: bold;
    }

    .studyCategory,
    .studyPeriod,
    .studyPeople {
      font-size: small;
    }
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
        <CurrentStudy>
          <p>진행중인 스터디</p>
          <StudyArea className="current">
            <div className="studyName">코어 자바스크립트</div>
            <div className="studyCategory">
              <img src={studyCategoryIcon} alt="categoryIcon" />
              카테고리
            </div>
            <div className="studyPeriod">
              <img src={studyPeriodIcon} alt="periodIcon" />
              진행 기간
            </div>
            <div className="studyPeople">
              <img src={userMinsize} alt="peopleIcon" />
              인원 수
            </div>
            <input type="button" value="입장하기" />
          </StudyArea>
        </CurrentStudy>
        <ScheduledStudy>
          <p>진행 예정 스터디</p>
          <StudyArea className="scheduled">
            <div className="studyName">코어 자바스크립트</div>
            <div className="studyCategory">
              <img src={studyCategoryIcon} alt="categoryIcon" />
            </div>
            <div className="studyPeriod">
              <img src={studyPeriodIcon} alt="periodIcon" />
            </div>
            <div className="studyPeople">
              <img src={userMinsize} alt="peopleIcon" />
            </div>
            <input type="button" value="취소하기" />
          </StudyArea>
        </ScheduledStudy>
        <FinishedStudy>
          <p>종료된 스터디</p>
          <StudyArea className="finish">
            <div className="studyName">코어 자바스크립트</div>
          </StudyArea>
        </FinishedStudy>
      </Study>
    </Container>
  );
};

export default MyPage;
