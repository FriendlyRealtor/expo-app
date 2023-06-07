import React, { useEffect, useState } from 'react';
import { auth, db, realtimeDb } from '../../config';
import { collection, getDocs, Timestamp, query, where } from 'firebase/firestore';
import { ref, set, push, onValue } from 'firebase/database';

export const useChats = () => {
  const [messageList, setMessageList] = useState([]);
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

  useEffect(() => {
    const userId = auth.currentUser?.uid;

    const messagesRef = ref(realtimeDb, `users/${userId}/messages`);
    const messagesListener = onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();

      if (messagesData) {
        const userIds = Object.keys(messagesData);
        const userRef = collection(db, 'users');
        const q = query(userRef, where('__name__', 'in', userIds));

        getDocs(q)
          .then((querySnapshot) => {
            const combinedData = querySnapshot.docs.map((doc) => {
              const userData = doc.data();
              const userId = doc.id;
              const messages = messagesData[userId];
              const latestMessage = messages
                ? Object.values(messages)[Object.values(messages).length - 1]
                : null;
              return {
                ...userData,
                latestMessage,
              };
            });
            setMessageList(combinedData);
          })
          .catch((error) => {
            console.log('Error querying users:', error);
          });
      }
    });

    return () => {
      // Cleanup listener
      messagesListener();
    };
  }, []);

  const sendUserMsg = async (
    senderId: string,
    recipientId: string,
    msg: string,
    photoUrl: string,
  ) => {
    try {
      const messagesRef = ref(realtimeDb, `users/${senderId}/messages/${recipientId}`);

      const newMessageRef = push(messagesRef);
      const newMessageKey = newMessageRef.key;

      await set(newMessageRef, {
        senderId: senderId,
        content: msg,
        timestamp: Timestamp.now(),
        photo: photoUrl,
      });

      return newMessageKey;
    } catch (error) {
      console.log('Error sending user message:', error);
      return null;
    }
  };

  return {
    messageList,
    searchableUsers,
    sendUserMsg,
  };
};
