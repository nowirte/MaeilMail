import styled from 'styled-components';
import React from 'react';

const Searchbar = styled.input`
  outline-style: none;

  width: 50%;
  height: 5%;
  border-radius: 20px;
  border: 6px solid #d9d9d9;

  font-size: 120%;
  color: #474747;

  padding-left: 2%;

  caret-color: #a9a9a9;
`;
const UserSearchbar = () => {
  return <Searchbar />;
};

export default UserSearchbar;
