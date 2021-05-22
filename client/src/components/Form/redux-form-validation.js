const emailRegex =
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

const passwordLowercase = /^(?=.*[a-z])/g;
const passwordUppercase = /^(?=.*[A-Z])/g;
const passwordNumber = /^(?=.*[0-9])/g;
// const passwordSpecialChar = /^(?=.*[@$!%*?&])/g;

export const required = (value) =>
  value || typeof value === 'number' ? undefined : 'Required';
export const maxLength = (max) => (value) =>
  value && value.trim().length > max
    ? `Must be ${max} characters or less`
    : undefined;
export const minLength = (min) => (value) =>
  value && value.trim().length < min
    ? `Must be ${min} characters or more`
    : undefined;
export const email = (value) =>
  value && !emailRegex.test(value) ? 'Invalid email address' : undefined;
export const password = (value) =>
  value && !passwordLowercase.test(value)
    ? 'Password must contain at least one lowercase letter'
    : value && !passwordUppercase.test(value)
    ? 'Password must contain at least one uppercase letter'
    : value && !passwordNumber.test(value)
    ? 'Password must contain at least one numer'
    : undefined;
export const alphaNumeric = (value) =>
  value && /[^a-zA-Z0-9_@&;, ]/i.test(value)
    ? 'Only alphanumeric characters and_@&;,'
    : undefined;
export const number = (value) =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const rating = (value) =>
  value && (value < 0 || value > 10) ? 'Rating must be 0-10' : undefined;
