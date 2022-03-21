import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuthComponentWrapper from './AuthComponentWrapper';
import { handleChangeEmail, startUserSignup } from '../../actions/auth';
import { handleShowNotification } from '../../actions/notifications';
import {
  errorMessages,
  validEmailRegexp,
  validStrongPassword,
} from '../../utils/constants';
import { useEnterListener } from '../../customHooks/useBtnListener';
import Mail from '../../assets/images/mail.svg';
import UserImg from '../../assets/images/user.svg';
import PasswordInput from '../reusedComponents/PasswordInput';
import BaseInput from '../reusedComponents/BaseInput';

const RegisterPage = props => {
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.auth.userEmail);
  const enterPressed = useEnterListener();

  const [credentials, setCredentials] = useState({
    username: '',
    email: userEmail,
    password: '',
    confirmpassw: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassw: '',
  });
  const [useFirebase, setUseFirebase] = useState(false);
  const [termsOfServiceAgreed, setTermsOfServiceAgreed] = useState(false);

  useEffect(() => {
    if (enterPressed && termsOfServiceAgreed) {
      handleValidate();
    }
  }, [enterPressed]);

  useEffect(() => {
    if (credentials.confirmpassw.length > 0) {
      if (
        credentials['password'] !== credentials['confirmpassw'] &&
        errors['confirmpassw'] !== errorMessages.passwordsEquality
      ) {
        const newErrors = { ...errors };
        newErrors['confirmpassw'] = errorMessages.passwordsEquality;
        setErrors(newErrors);
      } else if (credentials['password'] === credentials['confirmpassw']) {
        const newErrors = { ...errors };
        newErrors['confirmpassw'] = '';
        setErrors(newErrors);
      }
    }
  }, [credentials.password, credentials.confirmpassw]);

  const handleChangeInput = val => {
    const newCredentials = { ...credentials };
    const name = val.name;
    newCredentials[name] = val.value;
    setCredentials(newCredentials);
    if (name === 'email') {
      dispatch(handleChangeEmail(val.value));
    }
    if (errors[name] && name !== 'confirmpassw') {
      const newErrors = { ...errors, [name]: '' };
      setErrors(newErrors);
    }
  };

  const switchToLogin = () => {
    props.history.push('/');
  };

  const handleValidate = () => {
    let errorIsPresent;
    const newErrors = { ...errors };
    for (const el in credentials) {
      if (credentials[el].length === 0) {
        errorIsPresent = 1;
        newErrors[el] = errorMessages.notEmptyField;
      } else if (credentials[el].length !== 0) {
        if (el === 'username' && credentials[el].length < 4) {
          errorIsPresent = 1;
          newErrors[el] = errorMessages.usernameLength;
        }
        if (el === 'email') {
          const result = credentials[el].match(validEmailRegexp);
          if (!result) {
            errorIsPresent = 1;
            newErrors[el] = errorMessages.emailValidity;
          }
        }
        if (el === 'password' || el === 'confirmpassw') {
          const result = credentials[el].match(validStrongPassword);
          if (!result) {
            errorIsPresent = 1;
            newErrors[el] = errorMessages.passwStrengthRequirements;
          }
        }
        if (
          el === 'confirmpassw' &&
          credentials[el] !== credentials['password']
        ) {
          errorIsPresent = 1;
          newErrors[el] = errorMessages.passwordsEquality;
        }
      }
    }
    setErrors(newErrors);
    if (!errorIsPresent) {
      if (useFirebase) {
        dispatch(
          startUserSignup(
            credentials.username,
            credentials.email,
            credentials.password
          )
        )();
      } else
        dispatch(
          handleShowNotification(
            'The in app registration is currently not possible'
          )
        );
    }
  };

  return (
    <AuthComponentWrapper title="SIGN UP" history={props.history}>
      <form
        onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
        onSubmit={e => {
          e.preventDefault();
          handleValidate();
        }}
      >
        <BaseInput
          handleChangeInput={handleChangeInput}
          inputValue={credentials['username']}
          errors={errors}
          inputName="username"
          inputPlaceholder="Username"
          img={UserImg}
        />
        <BaseInput
          handleChangeInput={handleChangeInput}
          inputValue={credentials['email']}
          errors={errors}
          inputName="email"
          inputPlaceholder="E-Mail Address"
          img={Mail}
        />
        <PasswordInput
          handleChangeInput={handleChangeInput}
          credentials={credentials}
          errors={errors}
          inputName="password"
          inputPlaceholder="Password"
        />
        <PasswordInput
          handleChangeInput={handleChangeInput}
          credentials={credentials}
          errors={errors}
          inputName="confirmpassw"
          inputPlaceholder="Confirm password"
        />
        <div className="checkbox-container" style={{ marginBottom: 0 }}>
          <input
            type="checkbox"
            id="termsOfService"
            name="termsOfService"
            checked={termsOfServiceAgreed}
            onChange={() => setTermsOfServiceAgreed(prevState => !prevState)}
          />
          <label htmlFor="termsOfService">
            I have read and agree with{' '}
            <a target="_blank" href="/terms_of_service">
              Terms of Service
            </a>
          </label>
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="useFirebase"
            name="useFirebase"
            checked={useFirebase}
            onChange={() => setUseFirebase(prevState => !prevState)}
          />
          <label htmlFor="useFirebase">
            I would like to use Firebase for registration
          </label>
        </div>
        <div className="parall-styled-btn-container">
          <button
            type="submit"
            disabled={!termsOfServiceAgreed}
            className={`parall-styled-btn ${
              !termsOfServiceAgreed ? 'pntr-events-none' : ''
            }`}
          >
            <div>Sign Up</div>
          </button>
        </div>
      </form>
      <div className="auth-container-bottom-text">
        <p onClick={switchToLogin}>
          <span>Back to Login</span>
        </p>
      </div>
    </AuthComponentWrapper>
  );
};

export default RegisterPage;
