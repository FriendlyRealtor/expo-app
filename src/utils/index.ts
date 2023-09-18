import * as Yup from 'yup';
import { analytics } from '../config/firebase';
import { logEvent } from 'expo-firebase-analytics';

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
  userName: Yup.string().max(25).required('User name is required'),
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

export const agentContactFormSchema = Yup.object().shape({
  name: Yup.string().required('Please enter a name').label('Name'),
  phoneNumber: Yup.string().required('Please enter a phone number').label('Phone Number'),
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

/**
 * Track a button click event.
 * @param {string} buttonName - The name or identifier of the clicked button.
 * @param {string} screenName - The name or identifier of the current screen.
 */
export const trackButtonClick = async (buttonName, screenName) => {
  await logEvent('button_click', {
    screen: screenName,
    button_name: buttonName,
  });
};

/**
 * Track a page view event.
 * @param {string} screenName - The name or identifier of the viewed screen.
 */
export const trackPageView = async (screenName) => {
  await logEvent('page_view', {
    screen: screenName,
  });
};
