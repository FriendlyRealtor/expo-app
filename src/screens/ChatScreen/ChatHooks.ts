import React, { useEffect, useState } from 'react';
import { db, realtimeDb } from '../../config';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { ref, set, push } from 'firebase/database';

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

  const sendUserMsg = async (senderId: string, recipientId: string, msg: string) => {
    try {
      const messagesRef = ref(realtimeDb, `users/${senderId}/messages/${recipientId}`);

      const newMessageRef = push(messagesRef);
      const newMessageKey = newMessageRef.key;

      await set(newMessageRef, {
        senderId: senderId,
        content: msg,
        timestamp: Timestamp.now(),
      });

      return newMessageKey;
    } catch (error) {
      console.log('Error sending user message:', error);
      return null;
    }
  };

  return {
    messages,
    searchableUsers,
    sendUserMsg,
  };
};
