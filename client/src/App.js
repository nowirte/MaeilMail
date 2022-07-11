import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/sidebar';
import Home from './pages/home';
import Friend from './pages/friend';
import SignUp from './pages/signup';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 사이드바가 보여지는 영역 */}
        <Route element={<SideBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/friend" element={<Friend />} />
        </Route>

        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
