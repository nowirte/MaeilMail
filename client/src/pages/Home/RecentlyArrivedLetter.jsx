import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import { styled } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setArrivedLetter } from '../../redux/reducers/mainLetters';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StyledCurrentlyContent = styled(Typography)({
  marginTop: 10,
  textDecoration: 'underline',
});

export default function RecentlyArrivedLetter() {
  const token = useSelector(state => state.auth.token);
  const [isConfirmed, setIsConfirmed] = useState(false);
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
      const res = await axios.get('/api/letters/recent', {
        headers: {
          Authorization: token,
        },
      });
      console.log('data', res.data);
      const data = await res.data[res.data.length - 1];
      dispatch(setArrivedLetter({ mainArrivedLetter: data }));
      setLetterId(mainArrivedLetter.letter_id);
      console.log(mainArrivedLetter);
    } catch (e) {
      console.error(e);
    }
  };

  const patchIsRead = async () => {
    try {
      const data = { ...mainArrivedLetter, isRead: 1 };
      const response = await axios.patch(`/api/letters/${letterId}`, data, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(setArrivedLetter({ mainArrivedLetter: response.data }));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRecentlyLetter();
  }, []);

  // useEffect(() => {
  //   // const id = mainArrivedLetter.letter_Id
  //   patchIsRead(letterId);
  // }, [isConfirmed]);

  return (
    <div style={{ marginTop: 45 }}>
      <Button variant="contained" onClick={handleOpen}>
        최근에 온 편지
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {mainArrivedLetter.length === 1 ? (
            <Typography onClick={handleClose}>
              아직 안 읽은 편지가 없습니다.
            </Typography>
          ) : (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                From. {mainArrivedLetter?.nickname}
              </Typography>
              <StyledCurrentlyContent>
                {mainArrivedLetter?.content}
              </StyledCurrentlyContent>
              <Button
                style={{ marginTop: 15 }}
                variant="contained"
                onClick={() => {
                  patchIsRead();
                  handleClose();
                  // setIsConfirmed(true);
                  console.log(mainArrivedLetter);
                }}
              >
                ✔ 확인
              </Button>
              <div>{mainArrivedLetter.is_read}</div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
