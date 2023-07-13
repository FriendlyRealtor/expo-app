import { action, makeObservable, observable } from 'mobx';
import { auth, db } from '../config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import Bugsnag from '@bugsnag/expo';
import Constants from 'expo-constants';
import Purchases from 'react-native-purchases';

class AppStore {
  cmaRows = [];
  user = null;

  constructor() {
    makeObservable(this, {
      cmaFromDatabase: action,
      retrievedRows: action,
      deleteCMAItem: action,
      cmaRows: observable,
      user: observable,
      setUser: action,
      getUser: action,
      signOut: action,
      retrieveLoggedInUser: action,
      deleteUserAccount: action,
    });
  }

  retrievedRows() {
    return this.cmaRows;
  }

  setCmaRows(rows) {
    this.cmaRows = rows;
  }

  getUser() {
    return this.user;
  }

  setUser(user) {
    this.user = user;
  }

  deleteCMAItem = async (userAuth, user, index) => {
    const { uid } = userAuth.currentUser;
    const docRef = doc(db, 'users', uid);
    user.cmaEvaluations.splice(index, 1);
    this.setCmaRows(user.cmaEvaluations);
    const data = { cmaEvaluations: user.cmaEvaluations };
    if (docRef) {
      await updateDoc(docRef, data);
    }
  };

  cmaFromDatabase = async (userAuth) => {
    const { uid } = userAuth.currentUser;
    const docSnap = await getDoc(doc(db, 'users', uid));

    if (docSnap.exists()) {
      const data = docSnap.data();
      this.setCmaRows(data.cmaEvaluations);
    }
  };

  retrieveLoggedInUser = async () => {
    try {
      onAuthStateChanged(auth, async (authenticatedUser) => {
        if (authenticatedUser) {
          const { uid } = authenticatedUser;
          const docSnap = await getDoc(doc(db, 'users', uid));
          if (docSnap.exists()) {
            this.setUser(docSnap.data());
            await Purchases.configure({
              apiKey: Constants.manifest?.extra?.purchaseApiKey,
              appUserID: uid,
            });
          }
          // const customerInfo = await Purchases.getCustomerInfo();

          /*if (customerInfo) {
						const updatedObj = {
							...this.user,
							customerInfo,
						};
						this.setUser(updatedObj);
					}*/
        }
      });
      return this.user;
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  signOut = () => {
    signOut(auth)
      .then(() => {
        this.setUser(null);
      })
      .catch((error) => Bugsnag.notify(error));
  };

  deleteUserAccount = async () => {
    const userAuth = getAuth();

    if (userAuth.currentUser && userAuth.currentUser.uid) {
      await deleteDoc(doc(db, 'users', userAuth.currentUser.uid));
      await userAuth.currentUser?.delete();
      this.setUser(null);
    }
  };

  checkUsernameExists = async (username: string) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    const querySnapshot = await getDocs(q);
    return !!querySnapshot.docs.length;
  };
}

export default new AppStore();
