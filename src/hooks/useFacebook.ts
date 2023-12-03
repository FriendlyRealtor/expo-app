import { useEffect } from 'react';
import { Facebook } from 'expo';

export const useFacebook = () => {
  useEffect(() => {
    if (expo) {
      console.log(expo.facebook);
    }
  }, []);
};
