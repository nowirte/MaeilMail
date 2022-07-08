import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyPage from './pages/MyPage/MyPage';
import AdminManageAccount from './pages/AdminManageAccount';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/AdminManageAccount" element={<AdminManageAccount />} />
      </Routes>
    </Router>
  );
};

export default App;
