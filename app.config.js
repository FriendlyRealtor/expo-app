import 'dotenv/config';

export default {
  expo: {
    name: 'Expo Firebase Starter',
    slug: 'expo-firebase',
    privacy: 'public',
    platforms: ['ios', 'android'],
    version: '0.15.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true
    },
    extra: {
      apiKey: "AIzaSyCI0IoNQbXn3a0_QAyhPOXwpKM6Wqk1hnQ",
      authDomain: "real-estate-app-9a719.firebaseapp.com",
      projectId:"real-estate-app-9a719",
      storageBucket: "real-estate-app-9a719.appspot.com",
      messagingSenderId:  "154068447777",
      appId: "1:154068447777:web:881b49a540dae817b76960"
    },
		plugins: [
			[
				"expo-av",
				{
					microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone."
				},
			],
			[
				"expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        },
			],
			[
        "expo-image-picker",
        {
          "photosPermission": "Allow $(PRODUCT_NAME) to accesses your photos to let you share them with your friends.",
					"cameraPermission": "Allow $(PRODUCT_NAME) to accesses your camera to let you share them with your friends.",
        }
      ]
		]
  }
};
