import classes from './redux-form-field.module.css';

import ImagePicker from '../UI/ImagePicker/ImagePicker';

const formControlStyle = {
  position: 'relative',
  zIndex: 102,
};

export const renderReduxField = ({
  input,
  name,
  label,
  placeholder,
  type,
  meta,
  wrapper,
  control,
  options,
}) => {
  const { touched, error } = meta;
  let isError;
  if (touched && error) {
    isError = classes.visible;
  }

  let Field;
  switch (control) {
    case 'checkbox':
      return (
        <div
          className={`field position-relative ${classes.wrapper} ${wrapper}`}>
          <div className='ui checkbox'>
            <input id={input.name} {...input} type={type} />
            {label && <label htmlFor={input.name}>{label}</label>}
          </div>
        </div>
      );
    case 'textarea':
      Field = (
        <textarea
          className='form-control'
          style={formControlStyle}
          placeholder={placeholder ? placeholder : label}
          {...input}
          type={type}></textarea>
      );
      break;
    case 'select':
      Field = (
        <select
          className='form-control'
          style={formControlStyle}
          {...input}
          type={type}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case 'file':
      Field = <ImagePicker {...input} {...meta} />;
      break;
    default:
      Field = (
        <input
          className='form-control'
          style={formControlStyle}
          placeholder={placeholder ? placeholder : label}
          id={input.name}
          {...input}
          type={type}
        />
      );
  }

  return (
    <div className={`field position-relative ${classes.wrapper} ${wrapper}`}>
      {label && <label htmlFor={input.name}>{label}</label>}
      <label
        className={`alert alert-danger small ${classes.liveValidateMessage} ${isError}`}>
        {error}
      </label>
      {Field}
    </div>
  );
};
