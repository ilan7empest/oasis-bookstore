import * as validator from '../../components/Form/redux-form-validation';
export const AUTH_FILEDS = {
  username: {
    label: 'Enter Username',
    name: 'username',
    component: 'input',
    type: 'text',
    validate: [
      validator.required,
      validator.alphaNumeric,
      // validator.minLength(6),
      validator.maxLength(30),
    ],
  },
  email: {
    label: 'Enter Email',
    name: 'email',
    component: 'input',
    type: 'email',
    placeholder: 'example@domain.com',
    validate: [validator.required, validator.email],
  },
  password: {
    label: 'Enter Password',
    name: 'password',
    component: 'input',
    type: 'password',
    validate: [],
  },
  isAdmin: {
    label: 'Admin',
    name: 'isAdmin',
    component: 'checkbox',
    type: 'checkbox',
  },
};
