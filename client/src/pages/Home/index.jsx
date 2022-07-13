import React from 'react';
import MainWrapper from '../../components/common';
import SearchBar from './SearchBar';

import RecentlyArrivedHeader from './RecentlyArrivedHeader';
import RecentlyArrivedLetter from './RecentlyArrivedLetter';

const Home = () => {
  return (
    <MainWrapper>
      <SearchBar />

      <RecentlyArrivedHeader />
      <RecentlyArrivedLetter />
    </MainWrapper>
  );
};

export default Home;
