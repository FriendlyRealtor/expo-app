import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const usePermissions = (user) => {
  const [locationStatus, setLocationStatus] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setLocationStatus(status);
    };

    checkPermissions();
  }, [user]);

  return {
    locationStatus,
  };
};
