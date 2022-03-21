// Regular expressions

export const validEmailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// ensure that password has at least 1 digit, 1 uppercase letter, 1 lowercase letter and 1 special character from these !@#$&*
export const validStrongPassword = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;

export const errorMessages = {
  emailValidity: 'Please enter valid email',
  notEmptyField: 'This field should not be empty',
  passwStrengthRequirements:
    'Password should contain at least 8 chars, at least 1 uppercase, 1 lowercase, 1 digit, 1 special char !@#$&*',
  passwordsEquality: 'Password confirmation should be equal to password',
  usernameLength: 'Username should be at least 4 characters length',
};
