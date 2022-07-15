import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/sidebar';
import Home from './pages/Home';
import Friend from './pages/friend';
import SignUp from './pages/Signup';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import GoogleSignup from './pages/GoogleSignup';
import LoginBackground from './components/loginBackground';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 사이드바가 보여지는 영역 */}
        <Route element={<SideBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/friend" element={<Friend />} />
        </Route>

        <Route element={<LoginBackground />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/googleSignup" element={<GoogleSignup />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
