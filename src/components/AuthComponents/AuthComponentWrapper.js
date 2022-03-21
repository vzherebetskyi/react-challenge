import React from 'react';

import { MainLogoImg } from '../../assets/images/images';
import QuestionImg from '../../assets/images/question.svg';

const AuthComponentWrapper = ({ children, title, history }) => (
  <div className="auth-container">
    <div className="auth-title-panel">
      <img src={MainLogoImg} alt="main-logo" />
    </div>
    <div onClick={() => history.push('/faq')} className="auth-faq-button">
      <img src={QuestionImg} alt="question" />
    </div>
    <div className="form-container">
      <h1 className="base-title">{title}</h1>
      {children}
    </div>
  </div>
);

export default AuthComponentWrapper;
