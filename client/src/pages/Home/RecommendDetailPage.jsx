import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDistance, getTime, formatDate } from '../Friend/utils';
import FriendLetterEditor from './FriendLetterEditor';
import {
  Wrapper,
  ProfileImg,
  Title,
  MyProfile,
  GoBackButton,
  StyledWriteButton,
  StyledWriteButtonContainer,
} from './styles/StyledRecoomendDetailPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { RecommendFriendArea } from './RecommendFriendArea';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchUser } from '../../redux/reducers/searchUser';

function RecommendDetailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const searchUser = useSelector(state => state.searchUser.searchUser);
  const searchUserId = useSelector(state => state.searchUser.searchUserId);

  const [writeIsShown, setWriteIsShown] = useState(false);
  const [user, setUser] = useState({});

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get('/api/auth/me', {
        headers: {
          Authorization: token,
        },
      });
      const data = await res.data.user;
      setUser(data);
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const fetchSearchUserDetail = async id => {
    try {
      const res = await axios.get(`/api/users/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      const data = await res.data;
      dispatch(setSearchUser({ searchUser: data.user }));
    } catch (e) {
      console.error(e);
    }
  };
  const postLetter = useCallback(
    async newLetter => {
      try {
        await axios.post(`/api/letters/${searchUserId}`, newLetter, {
          headers: { Authorization: token },
        });
      } catch (e) {
        console.error(e);
      }
    },
    [searchUserId]
  );

  const createHandler = useCallback(
    content => {
      const distance = getDistance(
        user.longitude,
        user.latitude,
        searchUser.longitude,
        searchUser.latitude
      );
      const sendDate = new window.Date().toISOString();
      let receiveDate = new window.Date();
      const deliveryTime = getTime(distance);
      receiveDate = new window.Date(
        receiveDate.setMinutes(receiveDate.getMinutes() + deliveryTime)
      ).toISOString();
      const newLetter = {
        sendId: user.userId,
        receiveId: searchUser.userId,
        sendDate: sendDate,
        receiveDate: receiveDate,
        deliveryTime: deliveryTime,
        content: content[0],
      };

      postLetter(newLetter);
    },
    [writeIsShown]
  );

  const writeHandler = useCallback(() => {
    setWriteIsShown(current => !current), [writeIsShown];
  });

  useEffect(() => {
    fetchSearchUserDetail(searchUserId);
    fetchUser();
  }, []);

  return (
    <>
      <Wrapper>
        <Title>
          <GoBackButton onClick={() => navigate(-1)}>
            <ChevronLeftIcon />
          </GoBackButton>
          {searchUser?.nickname}의 프로필
        </Title>
        <MyProfile>
          <ProfileImg>
            <div className="profileImgArea">
              <img
                className="profileImage"
                src={searchUser.profileImage}
                alt={searchUser.nickname}
              />
            </div>
          </ProfileImg>
          {searchUser && <RecommendFriendArea data={searchUser} />}
        </MyProfile>
        {!writeIsShown ? (
          <StyledWriteButtonContainer>
            <StyledWriteButton onClick={writeHandler}>
              📧 작성
            </StyledWriteButton>
          </StyledWriteButtonContainer>
        ) : (
          <FriendLetterEditor
            handleWrite={writeHandler}
            onCreate={createHandler}
          />
        )}
      </Wrapper>
    </>
  );
}

export default RecommendDetailPage;
