import React from 'react';
import styled from 'styled-components';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const LogoutArea = () => {
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <IconButton aria-label="delete" color="neutral">
          <LogoutIcon />
        </IconButton>
      </ThemeProvider>
    </Container>
  );
};

export default LogoutArea;
