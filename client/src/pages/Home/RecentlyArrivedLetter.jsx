import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import { styled } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setArrivedLetter } from '../../redux/reducers/mainLetters';
import { formatDate } from '../Friend/utils';
import Stamp from '../../assets/stamp.png';

import {
  StyledRecentButton,
  StyledRecentlyArrivedLetterHeader,
  StampImage,
  StyledSendInfo,
  StyledButtonContainer,
} from './styles/StyledRecentLetter';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '5px solid grey',
  borderRadius: '24px',
  boxShadow: 24,
  p: 4,
};

const StyledCurrentlyContent = styled(Typography)({
  marginTop: 10,
  textDecoration: 'underline',
});

export default function RecentlyArrivedLetter() {
  const token = useSelector(state => state.auth.token);
  const [letterId, setLetterId] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const mainArrivedLetter = useSelector(
    state => state.mainLetters.mainArrivedLetter
  );

  const fetchRecentlyLetter = async () => {
    try {
      const res = await axios.get('/api/letters/my/recent', {
        headers: {
          Authorization: token,
        },
      });
      const data = await res.data[0];
      dispatch(setArrivedLetter({ mainArrivedLetter: data }));
      setLetterId(mainArrivedLetter?.letterId);
    } catch (e) {
      console.error(e);
    }
  };

  const patchIsRead = async () => {
    try {
      const data = { isRead: 1 };
      await axios.patch(`/api/letters/${letterId}`, data, {
        headers: {
          Authorization: token,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <StyledRecentButton>
      <Button
        variant="contained"
        onClick={() => {
          handleOpen();
          fetchRecentlyLetter();
        }}
      >
        최근에 온 편지
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClick={handleClose}
      >
        <Box sx={style}>
          {!mainArrivedLetter ? (
            <Typography>아직 안 읽은 편지가 없습니다.</Typography>
          ) : (
            <>
              <StyledRecentlyArrivedLetterHeader>
                <Typography style={{ fontSize: '24px', fontWeight: '700' }}>
                  To. me
                </Typography>
                <StampImage>
                  <img src={Stamp} alt="stamp" />
                </StampImage>
              </StyledRecentlyArrivedLetterHeader>
              <Typography
                id="modal-modal-title"
                style={{
                  textDecoration: 'dashed underline 1px',
                  textUnderlinePosition: 'under',
                  fontSize: '20px',
                  margin: '35px 0',
                  lineHeight: '32px',
                }}
              >
                {mainArrivedLetter?.content}
              </Typography>

              <StyledSendInfo>
                <div style={{ lineHeight: '32px' }}>
                  <p>{formatDate(mainArrivedLetter?.receiveDate)}</p>
                  <p>{mainArrivedLetter?.sendLocation}</p>
                </div>
                <div>From. {mainArrivedLetter?.nickname}</div>
              </StyledSendInfo>
              <StyledButtonContainer>
                <Button
                  style={{ marginTop: 15 }}
                  variant="contained"
                  onClick={() => {
                    patchIsRead();
                  }}
                >
                  ✔ 확인
                </Button>
              </StyledButtonContainer>
            </>
          )}
        </Box>
      </Modal>
    </StyledRecentButton>
  );
}
