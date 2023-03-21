import 'dotenv/config';

export default {
  expo: {
    name: 'Friendly Realtor',
    slug: 'friendlyrealtor',
    privacy: 'unlisted',
    platforms: ['ios'],
    version: '0.15.2',
    orientation: 'portrait',
    owner: 'jubileeinvestments',
    icon: './assets/icon.png',
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'jubileeinvestments.Real-Estate-App',
      buildNumber: '10',
      config: {
        usesNonExemptEncryption: false,
      },
    },
    extra: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      serverUrl: process.env.SERVER_URL,
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
    },
    plugins: [
      [
        'expo-av',
        {
          microphonePermission:
            'Allow $(PRODUCT_NAME) to access your microphone.',
        },
      ],
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission:
            'Allow $(PRODUCT_NAME) to use your location.',
        },
      ],
      [
        'expo-image-picker',
        {
          photosPermission:
            'Allow $(PRODUCT_NAME) to accesses your photos to let you share them with your friends.',
          cameraPermission:
            'Allow $(PRODUCT_NAME) to accesses your camera to let you share them with your friends.',
        },
      ],
    ],
  },
};
