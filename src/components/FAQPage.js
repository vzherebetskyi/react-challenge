import React from 'react';

const FAQPage = props => {
  const switchToLogin = () => {
    props.history.push('/');
  };

  return (
    <div>
      <h1>Frequently Asked Questions Page</h1>
      <button onClick={switchToLogin}>Back to Login</button>
    </div>
  );
};

export default FAQPage;
