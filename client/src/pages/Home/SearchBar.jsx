import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import StyledSearchbar from './styles/StyledSearchbar';

const SearchBar = () => {
  return (
    <StyledSearchbar>
      <form action="">
        <input
          type="text"
          placeholder="당신과 취향이 비슷한 친구를 만나보세요!"
        />
        <button type="submit">
          <SearchIcon />
        </button>
      </form>
    </StyledSearchbar>
  );
};

export default SearchBar;
