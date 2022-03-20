import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { auth } from '../firebase/firebase';
import { handleChangeEmail } from '../actions/auth';
import { handleUpdateUserProfile } from '../actions/userProfile';
import { handleShowNotification } from '../actions/notifications';
import {
  errorMessages,
  validEmailRegexp,
  validStrongPassword,
} from '../utils/constants';
import { useEnterListener } from '../customHooks/useBtnListener';

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

  const handleSignUp = () => {
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then(userCredential => {
        console.log('success', userCredential);
        dispatch(handleShowNotification('Signed up successfully'));

        return updateProfile(auth.currentUser, {
          displayName: credentials.username,
        });
      })
      .then(() => {
        console.log('User profile successfully updated');
        dispatch(
          handleUpdateUserProfile('username', auth.currentUser.displayName)
        );
      })
      .catch(error => {
        console.log(error.message);
        dispatch(handleShowNotification(error.message));
      });
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
        handleSignUp();
      } else
        dispatch(
          handleShowNotification(
            'The in app registration is currently not possible'
          )
        );
    }
  };

  return (
    <form
      onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
      onSubmit={e => {
        e.preventDefault();
        handleValidate();
      }}
    >
      <input
        autoComplete="off"
        placeholder="Username"
        type="text"
        name="username"
        value={credentials.username}
        onChange={e =>
          handleChangeInput({ name: e.target.name, value: e.target.value })
        }
      />
      {errors.username && <p>{errors.username}</p>}
      <input
        autoComplete="off"
        placeholder="E-Mail Address"
        type="text"
        name="email"
        value={credentials.email}
        onChange={e =>
          handleChangeInput({ name: e.target.name, value: e.target.value })
        }
      />
      {errors.email && <p>{errors.email}</p>}
      <input
        autoComplete="off"
        placeholder="Password"
        type="text"
        name="password"
        value={credentials.password}
        onChange={e =>
          handleChangeInput({ name: e.target.name, value: e.target.value })
        }
      />
      {errors.password && <p>{errors.password}</p>}
      <input
        autoComplete="off"
        placeholder="Confirm password"
        type="text"
        name="confirmpassw"
        value={credentials.confirmpassw}
        onChange={e =>
          handleChangeInput({ name: e.target.name, value: e.target.value })
        }
      />
      {errors.confirmpassw && <p>{errors.confirmpassw}</p>}
      <div>
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
      <div>
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
      <button type="submit" disabled={!termsOfServiceAgreed}>
        Sign Up
      </button>
      <button type="button" onClick={switchToLogin}>
        Back to Login
      </button>
    </form>
  );
};

export default RegisterPage;
