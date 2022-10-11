import React from 'react';
import styled from 'styled-components';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { persistor } from '../../redux/store';

const LogoutArea = () => {
  const purge = async () => {
    await persistor.purge();
  };
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <IconButton
          aria-label="delete"
          color="neutral"
          onClick={async e => {
            e.preventDefault();
            try {
              purge();
              location.reload();
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <LogoutIcon />
        </IconButton>
      </ThemeProvider>
    </Container>
  );
};

export default LogoutArea;

const theme = createTheme({
  palette: {
    neutral: {
      main: '#fff',
      contrastText: '#fff',
    },
  },
});

const Container = styled.div`
  display: flex;

  position: fixed;
  bottom: 10px;
  left: 10px;

  > button {
    border: none;
  }
`;
