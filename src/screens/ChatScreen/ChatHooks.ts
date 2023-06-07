import React, { useEffect, useCallback, useState } from 'react';
import { auth, db, realtimeDb } from '../../config';
import { collection, getDocs, Timestamp, query, where } from 'firebase/firestore';
import { ref, set, push, onValue } from 'firebase/database';

export const useChats = () => {
  const [messageList, setMessageList] = useState([]);
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
                id: doc.id,
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

  const retrieveUserChats = useCallback((receiptId: string) => {
    const userId = auth.currentUser?.uid;

    const messagesRef = ref(realtimeDb, `users/${userId}/messages/${receiptId}`);
    const messagesListener = onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const senderIds = Object.values(messagesData).map((message) => message.senderId);

        // Query Firestore for users with matching senderIds
        const userRef = collection(db, 'users');
        const q = query(userRef, where('__name__', 'in', senderIds));

        getDocs(q)
          .then((querySnapshot) => {
            const usersData = querySnapshot.docs.reduce((users, doc) => {
              const userData = doc.data();
              const userId = doc.id;
              users[userId] = userData;
              return users;
            }, {});

            // Combine messagesData and usersData
            const flattenedArray = Object.entries(messagesData).map(([key, value]) => ({
              id: key,
              ...value,
              user: usersData[value.senderId],
            }));

            const sortedMessages = flattenedArray.sort((a, b) => {
              const timestampA = a.timestamp.seconds;
              const timestampB = b.timestamp.seconds;

              if (timestampA < timestampB) {
                return -1;
              }
              if (timestampA > timestampB) {
                return 1;
              }
              return 0;
            });

            // Update the state with the combined data
            setMessages(sortedMessages);
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

  const sendUserMsg = async (senderId: string, recipientId: string, msg: string) => {
    try {
      const senderMessagesRef = ref(realtimeDb, `users/${senderId}/messages/${recipientId}`);
      const recipientMessagesRef = ref(realtimeDb, `users/${recipientId}/messages/${senderId}`);

      const newMessageRef = push(senderMessagesRef);
      const newMessageKey = newMessageRef.key;

      const timestamp = Timestamp.now();

      const messageData = {
        senderId: senderId,
        content: msg,
        timestamp: timestamp,
      };

      await set(newMessageRef, messageData);
      await set(recipientMessagesRef, messageData);

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
    retrieveUserChats,
    messages,
  };
};
