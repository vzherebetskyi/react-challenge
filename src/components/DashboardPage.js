import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startLogoutUser } from '../actions/auth';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.userProf);

  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Username:</h3>
      <h3>{userProfile.username}</h3>
      <h3>User email:</h3>
      <h3>{userProfile.email}</h3>
      <button onClick={dispatch(startLogoutUser())}>Logout</button>
    </div>
  );
};

export default DashboardPage;
