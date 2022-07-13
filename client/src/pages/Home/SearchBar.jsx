import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { StyledSearchbar } from './styles/StyledSearchbar';
import RecommendHeader from './RecommendHeader';
import RecommendFriendsList from './RecommendFriendsList';

const SearchBar = () => {
  const [users, setUsers] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    axios
      .get('/userurl') // 무작위로 추천 10개
      .then(res => {
        return res.data;
      })
      .then(a => {
        return setUsers(a);
      });
  }, []);

  const onSearch = e => {
    e.preventDefault();
    // if (searchField === null || searchField === '') {
    //   axios.get('/users').then(res => {
    //     setFilteredUsers(res.data);
    //   });
    // }
    setFilteredUsers(() => {
      return users.filter(user => {
        return user.name.toLowerCase().includes(searchField.toLowerCase());
      });
    });
  };
  return (
    <>
      <StyledSearchbar>
        <form action="" onSubmit={onSearch}>
          <input
            value={searchField}
            onChange={e => {
              setSearchField(e.target.value);
            }}
            type="text"
            placeholder="당신과 취향이 비슷한 친구를 만나보세요!"
          />
          <button type="submit">
            <SearchIcon />
          </button>
        </form>
      </StyledSearchbar>
      <RecommendHeader />
      <RecommendFriendsList data={filteredUsers} />
    </>
  );
};

export default SearchBar;
