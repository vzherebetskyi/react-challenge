import React from 'react';

const FAQPage = props => {
  const switchToLogin = () => {
    props.history.push('/');
  };

  return (
    <div className="page-container">
      <div className="page-wrapper">
        <div style={{ paddingLeft: '1rem' }}>
          <h1 className="base-title">Frequently Asked Questions</h1>
          <div className="text-container">
            <p>Question 1</p>
            <p>Answer 1</p>
            <p>Question 2</p>
            <p>Answer 2</p>
          </div>
          <p className="btn-styled" onClick={switchToLogin}>
            Back to Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
