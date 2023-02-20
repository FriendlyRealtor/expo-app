import firestore from '@react-native-firebase/firestore';
import {getUnixTimeStamp} from '../../../../helper/utils/DatetimeUtils';

export const updateUser = async (userID, newData) => {
  const dataWithOnlineStatus = {
    ...newData,
    lastOnlineTimestamp: getUnixTimeStamp(),
  };
  try {
		if (firestore().collection('users')) {
			await firestore().collection('users').doc(userID).set({...dataWithOnlineStatus}, {merge: true});
			return {success: true};
		}
  } catch (error) {
    return error;
  }
};

export const getUserByID = async userID => {
  try {
		if (firestore().collection('users')) {
			const document = await firestore().collection('users').doc(userID).get();
			if (document) {
				return document.data();
			}
			return null;
		}
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateProfilePhoto = async (userID, profilePictureURL) => {
  try {
		if (firestore().collection('users')) {
			await firestore().collection('users').doc(userID).update({profilePictureURL: profilePictureURL});
			return {success: true};
		}
  } catch (error) {
    console.log(error);
    return {error: error};
  }
};
