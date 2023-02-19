import Authentication from '../api/Authentication';

export const sendDeliveryAddress = (
  email,
  username,
  phone,
  location,
  houseNo,
) => {
  let e = {};
  let isSubmit = true;
  let check = Authentication.check({email: email, phone: phone});
  if (check.errorEmail != '') {
    e.email = check.errorEmail;
    isSubmit = false;
  }
  if (check.errorPhone != '') {
    e.phone = check.errorPhone;
    isSubmit = false;
  }
  if (location == '') {
    e.location = 'You need enter your location.';
    isSubmit = false;
  }
  if (username == '') {
    e.username = 'You need enter your username.';
    isSubmit = false;
  }
  if (houseNo == '') {
    e.houseNo = 'This field cannot be left blank.';
    isSubmit = false;
  }
  return function (callback = (isSubmit, e) => {}) {
    callback(isSubmit, e);
  };
};
