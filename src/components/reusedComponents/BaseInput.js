import React from 'react';

const BaseInput = ({
  inputValue,
  errors,
  handleChangeInput,
  inputName,
  inputPlaceholder,
  img,
}) => (
  <div className="input-container">
    {img && <img src={img} alt={inputName} />}
    <input
      autoComplete="off"
      placeholder={inputPlaceholder}
      type="text"
      name={inputName}
      value={inputValue}
      onChange={e =>
        handleChangeInput({
          name: e.target.name,
          value: e.target.value,
        })
      }
    />
    {errors[inputName] && <p className="error-message">{errors[inputName]}</p>}
  </div>
);

export default BaseInput;
