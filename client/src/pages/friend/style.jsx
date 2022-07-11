import styled from 'styled-components';

const User = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 9;
  padding: 2rem 1rem;
  width: calc(100% - 380px);
  align-items: center;
  background: #fff;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const UserEmoji = styled.div`
  background: gray;
  width: 100px;
  height: 100px;
`;

const UserDetail = styled.div`
  font-size: 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
`;
const DetailItem = styled.span`
  color: #828282;
`;
const UserName = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
`;

const UserBio = styled.p`
  font-size: 1rem;
  color: #4f4f4f;
`;
const BadgeWrapper = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.5rem;
`;
const Badge = styled.span`
  font-size: 1rem;
  color: #4f4f4f;
`;
const LetterWrapper = styled.ul`
  overflow: hidden;
  position: relative;
  margin: 200px 1rem 0 1rem;
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  gap: 1rem;
`;

const Letter = styled.li`
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 1rem;
  box-sizing: border-box;
  padding: 1rem;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
`;

const LetterHeader = styled.p`
  width: 100%;
`;

export {
  User,
  UserInfo,
  UserEmoji,
  UserDetail,
  DetailItem,
  UserName,
  UserBio,
  BadgeWrapper,
  Badge,
  LetterWrapper,
  Letter,
  LetterHeader,
};
