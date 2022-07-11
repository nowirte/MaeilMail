import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;

  display: inline-flex;
  flex-direction: column;
  justify-content: center;
`;

const MyProfile = styled.div`
  display: flex;
  margin: 100px auto;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 1.75rem;

  margin-left: 140px;
`;

const ProfileImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.25rem;
  padding: 5px 0;

  > span {
    font-weight: bold;
    color: white;
  }

  & .profileImgArea {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 10px;

    width: 170px;
    height: 170px;
    border-radius: 100%;
    background-color: white;

    box-shadow: 1px 1px 3px grey;

    & span {
      font-size: 8rem;
      padding-bottom: 20px;
    }
  }
`;

export { Wrapper, ProfileImg, Title, MyProfile };
