import * as Yup from 'yup';

export const continueEducationCourse = [
  {
    url: '"http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"',
  },
];

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

export const locationValidationSchema = Yup.object().shape({
  location: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

export const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string().max(255).required('First name is required'),
  lastName: Yup.string().max(255).required('Last name is required'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string()
    .required()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must match password.')
    .required('Confirm Password is required.'),
});

export const passwordResetSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter a registered email')
    .label('Email')
    .email('Enter a valid email'),
});

export const numberWithCommas = (num) => {
  if (num) {
    num = num.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(num)) {
      num = num.replace(pattern, '$1,$2');
    }
    return num;
  }

  return 0;
};
