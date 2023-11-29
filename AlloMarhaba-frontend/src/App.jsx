import React from 'react';
import Header from './components/Header.jsx';
import { Outlet } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* Normalize CSS */}
        <CssBaseline />
        <Header />
        <ToastContainer />
        {/* <Container className="my-3"> */}
          <Outlet />
        {/* </Container> */}
      </ThemeProvider>
    </>
  );
};


export default App;