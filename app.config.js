import 'dotenv/config';

export default {
  expo: {
    name: 'Friendly Realtor',
    slug: 'friendlyrealtor',
    privacy: 'unlisted',
    platforms: ['ios'],
    version: '1.0.0',
    orientation: 'portrait',
    owner: 'jubileeinvestments',
    icon: './assets/logo.png',
    updates: {
      fallbackToCacheTimeout: 0,
			url: `https://u.expo.dev/${process.env.EAS_PROJECT_ID}`,
    },
		runtimeVersion: {
			policy: 'sdkVersion',
		},
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'jubileeinvestments.Real-Estate-App',
      buildNumber: '16',
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
			purchaseApiKey: process.env.PURCHASE_API_KEY,
      serverUrl: process.env.SERVER_URL,
      cloudFunctionUrl: process.env.FIREBASE_CLOUD_FUNCTION_URL,
			openAiKey: process.env.OPENAI_API_KEY,
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
    },
    plugins: [
			[
				'expo-tracking-transparency',
        {
          'userTrackingPermission': 'This identifier will be used to deliver personalized ads to you.',
        },
			],
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
			[
				'@config-plugins/react-native-pdf',
			],
			[
				'@config-plugins/react-native-blob-util',
			],
    ],
  },
};
