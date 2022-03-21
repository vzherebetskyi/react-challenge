import React, { useState } from 'react';

import Lock from '../../assets/images/lock.svg';
import Eye from '../../assets/images/eye.svg';

const PasswordInput = ({
  inputValue,
  errors,
  handleChangeInput,
  inputName,
  inputPlaceholder,
}) => {
  const [showPassw, setShowPassw] = useState(false);
  return (
    <div className="input-container">
      <img src={Lock} alt="lock" />
      <img
        onClick={() => setShowPassw(prevState => !prevState)}
        className="input-container__eye"
        src={Eye}
        alt="eye"
      />
      <input
        autoComplete="off"
        placeholder={inputPlaceholder}
        type={showPassw ? 'text' : 'password'}
        name={inputName}
        value={inputValue}
        onChange={e =>
          handleChangeInput({
            name: e.target.name,
            value: e.target.value,
          })
        }
      />
      {errors[inputName] && (
        <p className="error-message">{errors[inputName]}</p>
      )}
    </div>
  );
};

export default PasswordInput;
