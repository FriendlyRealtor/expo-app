import { observable, action, makeObservable } from 'mobx';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../config';
import Constants from 'expo-constants';
import Purchases from 'react-native-purchases';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { getDocs, query, collection, where } from 'firebase/firestore';

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
      return this.getUser();
    } catch (error) {
      console.log(error);
    }
  };

  signOut = () => {
    signOut(auth)
      .then(() => {
        this.setUser(null);
      })
      .catch((error) => console.log('Error logging out: ', error));
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
