import * as validator from '../../Form/redux-form-validation';

export const BOOK_FIELDS = [
  {
    label: 'Book Title',
    name: 'title',
    control: 'input',
    type: 'text',
    validate: [
      validator.required,
      validator.minLength(1),
      validator.alphaNumeric,
    ],
  },
  {
    label: 'Book Description',
    name: 'description',
    control: 'textarea',
    type: 'text',
    validate: [validator.required, validator.minLength(20)],
  },
  {
    label: 'Price',
    name: 'price',
    control: 'input',
    type: 'number',
    validate: [validator.required, validator.number],
  },
  {
    label: 'Upload Book Cover',
    name: 'cover',
    control: 'file',
    validate: [validator.required],
  },
];
