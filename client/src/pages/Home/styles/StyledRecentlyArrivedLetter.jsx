import styled from 'styled-components';

export const RecentlyContainer = styled.div`
  margin: 60px 0;
  width: 360px;
  height: 480px;
  border: 1px solid black;
  border-radius: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export const RecentlyContentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;
export const LetterContent = styled.div`
  width: 300px;
  height: 180px;
  border: 1px solid black;
  font-size: 24px;
  line-height: 36px;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  overflow: hidden;
`;
export const RecentlyProfile = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const RecentlyImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  img {
    width: 60%;
  }
`;
export const RecentlyIntroduction = styled.div``;
export const RecentlyFriendName = styled.div`
  font-size: 32px;
  line-height: 48px;
`;
export const RecentlyDate = styled.div`
  font-size: 20px;
  line-height: 30px;
`;
export const RecentlyLocation = styled.div`
  font-size: 20px;
  line-height: 30px;
`;
