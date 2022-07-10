const ERROR_MESSAGES = {
  email: 'Please enter a valid email address',
  required: 'This field is required.',
  min: 'value too small',
  max: 'value too large',
  minlength: 'Value is too short',
  maxlength: 'Value is too big',
  passwordNotMatch: 'Password does not match',
  invalidPassword: 'Invalid Password'
};

const BATHROOMS_OPTIONS = [
  {label: '0', value: 0},
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
]

const BEDROOMS_OPTIONS = [
  {label: '0', value: 0},
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
]


export {
  ERROR_MESSAGES,
  BATHROOMS_OPTIONS,
  BEDROOMS_OPTIONS
};
