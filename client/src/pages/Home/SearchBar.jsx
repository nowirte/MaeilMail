import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import axios from 'axios';
import StyledSearchbar from './styles/StyledSearchbar';
import RecommendHeader from './RecommendHeader';
import RecommendFriendsList from './RecommendFriendsList';

const SearchBar = () => {
  const token = localStorage.getItem('token');

  const [users, setUsers] = useState([]);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/users', {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        setUsers(res.data);
        // console.log('users', users);
      });
  }, []);

  const onSearch = e => {
    e.preventDefault();
    if (searchField === null || searchField === '') {
      axios
        .get(`http://localhost:3001/api/users?search=${searchField}`, {
          headers: {
            Authorization: token,
          },
        })
        .then(res => {
          setUsers(res.data);
        });
    }
    setUsers(() => {
      return users.filter(user => {
        return user.nickname.toLowerCase().includes(searchField.toLowerCase());
      });
    });
  };
  return (
    <>
      <StyledSearchbar>
        <form onSubmit={onSearch}>
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
      <RecommendFriendsList data={users} />
    </>
  );
};

export default SearchBar;
