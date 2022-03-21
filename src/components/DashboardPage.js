import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { auth } from '../firebase/firebase';
import { startLogoutUser } from '../actions/auth';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.userProf);

  const handleLogout = () => {
    dispatch(startLogoutUser(auth))();
  };

  return (
    <div className="page-container">
      <div className="page-wrapper" style={{ alignItems: 'center' }}>
        <div>
          <h1 className="base-title">Dashboard</h1>
          <div style={{ display: 'flex' }}>
            <h3 style={{ marginRight: '1rem' }}>Username:</h3>
            <h3>{userProfile ? userProfile.username : ''}</h3>
          </div>
          <div style={{ display: 'flex' }}>
            <h3 style={{ marginRight: '1rem' }}>User email:</h3>
            <h3>{userProfile ? userProfile.email : ''}</h3>
          </div>
          <div className="parall-styled-btn-container">
            <button
              style={{ marginTop: '2rem', left: 0 }}
              className="parall-styled-btn"
              onClick={handleLogout}
            >
              <div>Logout</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
