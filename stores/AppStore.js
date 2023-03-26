/*** src/Store.js ***/

import {observable, action, computed, makeObservable} from 'mobx';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../config';

export class App {
  constructor() {
    this.cmaRows = [];

    makeObservable(this, {
      cmaFromDatabase: action,
      retrievedRows: computed,
      deleteCMAItem: action,
      cmaRows: observable,
    });
  }
}

export class AppStore {
  deleteCMAItem = async (userAuth, user, index) => {
    const {uid} = userAuth.currentUser;
    const docRef = doc(db, 'users', uid);
    const updatedItems = user.cmaEvaluations.filter(
      (item, idx) => idx !== index,
    );

    this.cmaRows = updatedItems;
    const data = {cmaEvaluations: updatedItems};
    if (docRef) {
      await updateDoc(docRef, data);
    }
  };

  cmaFromDatabase = async userAuth => {
    const {uid} = userAuth.currentUser;
    const docSnap = await getDoc(doc(db, 'users', uid));

    if (docSnap.exists()) {
      const data = docSnap.data();
      this.cmaRows = data.cmaEvaluations;
    }
  };

  get retrievedRows() {
    return this.cmaRows;
  }
}
