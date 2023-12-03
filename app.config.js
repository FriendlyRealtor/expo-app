import 'dotenv/config';

export default {
  expo: {
    name: 'Friendly Realtor',
    slug: 'friendlyrealtor',
    privacy: 'unlisted',
    platforms: ['ios'],
    version: '1.0.36',
    orientation: 'portrait',
    owner: 'jubileeinvestments',
    icon: './assets/icon.png',
    jsEngine: 'hermes',
    updates: {
      fallbackToCacheTimeout: 0,
    },
    entryPoint: './index.ts',
    runtimeVersion: {
      policy: 'sdkVersion',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'jubileeinvestments.Real-Estate-App',
      buildNumber: '1',
      config: {
        usesNonExemptEncryption: false,
      },
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          "Grant $(PRODUCT_NAME) access to your device's location, you'll be able to receive a list of nearby restaurants within a 5-mile radius. You can then select a restaurant from the list to get more information and directions",
        NSLocationAlwaysUsageDescription:
          "Grant $(PRODUCT_NAME) access to your device's location, you'll be able to receive a list of nearby restaurants within a 5-mile radius. You can then select a restaurant from the list to get more information and directions",
        NSLocationAlwaysAndWhenInUseUsageDescription:
          "Grant $(PRODUCT_NAME) access to your device's location, you'll be able to receive a list of nearby restaurants within a 5-mile radius. You can then select a restaurant from the list to get more information and directions",
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
      googleApiKey: process.env.GOOGLE_API_KEY,
      realTimeDbUrl: process.env.FIREBASE_REAL_TIME_DATABASE_URL,
      bugSnagApiKey: process.env.BUGSNAG_API_KEY,
      vexoApiKey: process.env.VEXO_API_KEY,
      fbBaseUrl: process.env.FB_BASE_URL,
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
    },
    plugins: [
      [
        'expo-contacts',
        {
          contactsPermission: 'Allow $(PRODUCT_NAME) to access your contacts.',
        },
      ],
      [
        'expo-tracking-transparency',
        {
          userTrackingPermission:
            '${PRODUCT_NAME} will display ads tailored to your interests and preferences.',
        },
      ],
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission:
            "Grant $(PRODUCT_NAME) access to your device's location, you'll be able to receive a list of nearby restaurants within a 5-mile radius. You can then select a restaurant from the list to get more information and directions",
          locationAlwaysPermission:
            "Grant $(PRODUCT_NAME) access to your device's location, you'll be able to receive a list of nearby restaurants within a 5-mile radius. You can then select a restaurant from the list to get more information and directions",
          isIosBackgroundLocationEnabled:
            "Grant $(PRODUCT_NAME) access to your device's location, you'll be able to receive a list of nearby restaurants within a 5-mile radius. You can then select a restaurant from the list to get more information and directions",
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
      ['@config-plugins/react-native-blob-util'],
      [
        'react-native-fbsdk-next',
        {
          appID: '1339976196848860',
          clientToken: 'b95fc35e1b5d307b7f270c60ab423ac0',
          displayName: 'Friendly Realtor',
          advertiserIDCollectionEnabled: false,
          autoLogAppEventsEnabled: false,
          isAutoInitEnabled: true,
          iosUserTrackingPermission:
            'This identifier will be used to deliver personalized ads to you.',
        },
      ],
    ],
  },
};
