import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';

import AuthComponentWrapper from './AuthComponentWrapper';
import { handleChangeEmail, startLoginUser } from '../../actions/auth';
import { handleShowNotification } from '../../actions/notifications';
import { errorMessages } from '../../utils/constants';
import { useEnterListener } from '../../customHooks/useBtnListener';
import { generateUser } from '../../utils/utilFunctions';
import Mail from '../../assets/images/mail.svg';
import PasswordInput from '../reusedComponents/PasswordInput';

const LoginPage = props => {
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.auth.userEmail);
  const enterPressed = useEnterListener();

  const [credentials, setCredentials] = useState({
    email: userEmail,
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [useFirebase, setUseFirebase] = useState(false);

  useEffect(() => {
    if (enterPressed) {
      handleValidate();
    }
  }, [enterPressed]);

  const handleChangeInput = val => {
    const newCredentials = { ...credentials };
    const name = val.name;
    newCredentials[name] = val.value;
    setCredentials(newCredentials);
    if (name === 'email') {
      dispatch(handleChangeEmail(val.value));
    }
    if (errors[name]) {
      const newErrors = { ...errors, [name]: '' };
      setErrors(newErrors);
    }
  };

  const handleValidate = () => {
    let errorIsPresent;
    const newErrors = { ...errors };
    for (const el in credentials) {
      if (credentials[el].length === 0) {
        errorIsPresent = 1;
        newErrors[el] = errorMessages.notEmptyField;
      }
    }
    setErrors(newErrors);
    if (!errorIsPresent) {
      if (useFirebase) {
        dispatch(startLoginUser(credentials.email, credentials.password))();
      } else
        dispatch(
          handleShowNotification('Provided email and password is/are incorrect')
        );
    }
  };

  const switchToSignUp = () => {
    props.history.push('/register');
  };

  const handleGenerateUser = async () => {
    const generatedData = await generateUser();

    if (generatedData && generatedData.results) {
      const userName = generatedData.results[0].login.username;
      const email = generatedData.results[0].email;
      const password =
        generatedData.results[0].login.password +
        generatedData.results[0].login.username;
      const config = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      };
      const secondaryApp = initializeApp(config, 'Secondary');
      const auth = getAuth(secondaryApp);
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          console.log('success', userCredential);
          dispatch(handleShowNotification('Signed up successfully'));

          return updateProfile(auth.currentUser, {
            displayName: userName,
          });
        })
        .then(() => {
          console.log('User profile successfully updated');
          const newCredentials = {
            email: email,
            password: password,
          };
          setCredentials(newCredentials);
        })
        .catch(error => {
          console.log(error.message);
          dispatch(handleShowNotification(error.message));
        });
    }
  };

  return (
    <AuthComponentWrapper title="LOGIN" history={props.history}>
      <form
        onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
        onSubmit={e => {
          e.preventDefault();
          handleValidate();
        }}
      >
        <div className="input-container">
          <img src={Mail} alt="mail" />
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
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <PasswordInput
          handleChangeInput={handleChangeInput}
          credentials={credentials}
          errors={errors}
          inputName="password"
          inputPlaceholder="Password"
        />
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="useFirebase"
            name="useFirebase"
            checked={useFirebase}
            onChange={() => setUseFirebase(prevState => !prevState)}
          />
          <label htmlFor="useFirebase">
            I would like to use Firebase for login
          </label>
        </div>
        <div className="parall-styled-btn-container">
          <div onClick={handleValidate} className="parall-styled-btn">
            <button type="submit">LOGIN</button>
          </div>
        </div>
      </form>
      <div className="auth-container-bottom-text">
        <p>
          Don't have an account yet?{' '}
          <span onClick={switchToSignUp}>Signup</span>
        </p>
        <p>Don't remember your password? Recover my Password</p>
        <p>
          <span
            style={{ color: '#F8D126' }}
            onClick={!useFirebase ? null : handleGenerateUser}
          >
            Generate a custom user.
          </span>{' '}
          Works with Firebase. See FAQ for more details
        </p>
      </div>
    </AuthComponentWrapper>
  );
};

export default LoginPage;
