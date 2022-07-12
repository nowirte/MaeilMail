import React from 'react';
import MainWrapper from '../../components/common';
import SearchBar from './SearchBar';
import RecommendFriendsList from './RecommendFriendsList';
import RecommendHeader from './RecommendHeader';
import RecentlyArrivedHeader from './RecentlyArrivedHeader';
import RecentlyArrivedLetter from './RecentlyArrivedLetter';

const Home = () => {
  return (
    <MainWrapper>
      <SearchBar />
      <RecommendHeader />
      <RecommendFriendsList />
      <RecentlyArrivedHeader />
      <RecentlyArrivedLetter />
    </MainWrapper>
  );
};

export default Home;
