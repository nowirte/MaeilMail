import React from 'react';
import { AdminUserInfoContainer } from './style';
import UserSearchbar from './UserSearchbar';

const AdminUserInfo = () => {
  return (
    <AdminUserInfoContainer>
      <UserSearchbar />
    </AdminUserInfoContainer>
  );
};

export default AdminUserInfo;
