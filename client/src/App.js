import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/sidebar';
import Home from './pages/Home';
import FriendDetail from './pages/Friend';
import SignUp from './pages/signup';
import MyPage from './pages/MyPage';
import Login from './pages/login';
import LoginBackground from './components/loginBackground';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 사이드바가 보여지는 영역 */}
        <Route element={<SideBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/friend/:id" element={<FriendDetail />} />
        </Route>

        <Route element={<LoginBackground />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
