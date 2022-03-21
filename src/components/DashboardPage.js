import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startLogoutUser } from '../actions/auth';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.userProf);

  return (
    <div className="page-container">
      <div className="page-wrapper" style={{ alignItems: 'center' }}>
        <div>
          <h1 className="base-title">Dashboard</h1>
          <div style={{ display: 'flex' }}>
            <h3 style={{ marginRight: '1rem' }}>Username:</h3>
            <h3>{userProfile.username}</h3>
          </div>
          <div style={{ display: 'flex' }}>
            <h3 style={{ marginRight: '1rem' }}>User email:</h3>
            <h3>{userProfile.email}</h3>
          </div>
          <div className="parall-styled-btn-container">
            <div style={{ marginTop: '2rem' }} className="parall-styled-btn">
              <button onClick={dispatch(startLogoutUser())}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
