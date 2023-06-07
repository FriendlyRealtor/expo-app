import React, { useEffect, useState } from 'react';
import { db } from '../../config';
import { collection, getDocs } from 'firebase/firestore';

export const useChats = () => {
  const [messages, setMessages] = useState([]);
  const [searchableUsers, setSearchableUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users = querySnapshot.docs.map((doc) => doc.data());
        setSearchableUsers(users);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return {
    messages,
    searchableUsers,
  };
};
