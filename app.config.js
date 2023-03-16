import 'dotenv/config';

export default {
  expo: {
    name: 'Friendly Realtor',
    slug: 'friendlyrealtor',
    privacy: 'unlisted',
    platforms: ['ios'],
    version: '0.15.0',
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
      buildNumber: '2',
    },
    extra: {
      eas: {
        projectId: '367e8c43-826e-4fbb-9a0c-fdb79080a072',
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
