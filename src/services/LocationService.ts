// LocationService.ts

import { LocationData } from '../utils/utils';

const fetchCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      reject("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => {
        console.error("Error getting location", error);
        reject(error);
      }
    );
  });
};

export { fetchCurrentLocation };


