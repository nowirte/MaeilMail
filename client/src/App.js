import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/sidebar';
import AdminSideBar from './components/adminSidebar';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Letters from './pages/Friend';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import AdminMain from './pages/AdminMain';
import GoogleSignup from './pages/GoogleSignup';
import UserInfo from './pages/AdminUserInfo';
import Dashboard from './pages/AdminDashboard';

import LoginBackground from './components/loginBackground';
import RecommendDetailPage from './pages/Home/RecommendDetailPage';
import Letter from './pages/Friend/Letter';
import Test from './pages/Friend/Test';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 사이드바가 보여지는 영역 */}
        <Route element={<SideBar />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/:userid/recommenddetail"
            element={<RecommendDetailPage />}
          />
          <Route path="/mypage" element={<MyPage />} />
          <Route element={<Test />}>
            <Route path="/friend/:id" element={<Letters />} />
            <Route path="/friend/:id/:postId" element={<Letter />} />
          </Route>
        </Route>

        <Route element={<AdminSideBar/>}>
          <Route path="/admin/main" element={<AdminMain/>}/>
          <Route path="/admin/userInfo" element={<UserInfo/>}/>
          <Route path="/admin/dashboard" element={<Dashboard/>}/>

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
