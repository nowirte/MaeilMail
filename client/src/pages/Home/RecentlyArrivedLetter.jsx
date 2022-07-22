import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import { styled } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { initArrivedLetter } from '../../redux/reducers/mainLetters';

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const mainArrivedLetter = useSelector(
    state => state.mainLetters.mainArrivedLetter
  );
  console.log('token', token);

  const fetchRecentlyLetter = async () => {
    try {
      const res = await axios.get('/api/letters/recent', {
        headers: {
          Authorization: token,
        },
      });
      const data = await res.data[0];
      dispatch(initArrivedLetter({ mainArrivedLetter: data }));
      console.log('mainArrivedLetter', mainArrivedLetter);
    } catch (e) {
      console.error(e);
    }
  };

  const patchIsRead = async id => {
    try {
      await axios.patch(
        `/api/letters/${id}`,
        {
          is_read: 1,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log('mainArrivdLetterPatch', mainArrivedLetter);
    } catch (e) {
      console.error(e);
    }
  };
  // console.log('mainArrivedLetter', mainArrivedLetter);

  useEffect(() => {
    fetchRecentlyLetter();
  }, []);

  useEffect(() => {
    patchIsRead(mainArrivedLetter?.letter_id);
  }, [isConfirmed]);

  return (
    <div style={{ marginTop: 45 }}>
      <Button variant="contained" onClick={handleOpen}>
        최근에 온 편지
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
              setIsConfirmed(true);
            }}
          >
            ✔ 확인
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
