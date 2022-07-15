import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/sidebar';
import Home from './pages/Home';
import Friend from './pages/friend';
import SignUp from './pages/signup';
import MyPage from './pages/MyPage';
import RecommendDetailPage from './pages/Home/RecommendDetailPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 사이드바가 보여지는 영역 */}
        <Route element={<SideBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/:userid/recommenddetail" element={RecommendDetailPage}/>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/friend" element={<Friend />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
