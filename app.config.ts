import {ExpoConfig, ConfigContext} from 'expo/config';

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'SQ',
  slug: 'sq',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './src/assets/icons/logo_trimmed.png',
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  ios: {
    icon: './src/assets/icons/logo_trimmed.png',
    appleTeamId: '9CNPV9JMJ9',
    supportsTablet: false,
    bundleIdentifier: 'com.ims.asher',
    googleServicesFile: './GoogleService-Info.plist',
    infoPlist: {
      NSAppTransportSecurity: {
        NSExceptionDomains: {
          localhost: {
            NSExceptionAllowsInsecureHTTPLoads: true,
          },
          'app24h.net': {
            NSExceptionAllowsInsecureHTTPLoads: true,
            NSIncludesSubdomains: true,
          },
        },
      },
      UIBackgroundModes: ['fetch', 'remote-notification'],
      ITSAppUsesNonExemptEncryption: false,
    },
    entitlements: {
      'aps-environment': 'production',
    },
  },
  android: {
    icon: './src/assets/icons/logo_padding.png',
    adaptiveIcon: {
      foregroundImage: './src/assets/icons/logo_padding.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.ims.asher',
    googleServicesFile: './google-services.json',
  },
  web: {
    favicon: './src/assets/icons/favicon.png',
  },
  extra: {
    eas: {
      projectId: 'a41c2b67-aff5-446c-85c0-71caa11801bc',
    },
  },
  owner: 'ims_vietnamese',
  updates: {
    url: 'https://u.expo.dev/a41c2b67-aff5-446c-85c0-71caa11801bc',
    requestHeaders: {
      // 'expo-channel-name': 'development',
      // 'expo-channel-name': 'preview',
      'expo-channel-name': 'production',
    },
  },
  runtimeVersion: '1.0.0',
  plugins: [
    [
      'expo-font',
      {
        fonts: [
          './src/assets/fonts/Nunito-Black.ttf',
          './src/assets/fonts/Nunito-BlackItalic.ttf',
          './src/assets/fonts/Nunito-Bold.ttf',
          './src/assets/fonts/Nunito-BoldItalic.ttf',
          './src/assets/fonts/Nunito-ExtraBold.ttf',
          './src/assets/fonts/Nunito-ExtraBoldItalic.ttf',
          './src/assets/fonts/Nunito-ExtraLight.ttf',
          './src/assets/fonts/Nunito-ExtraLightItalic.ttf',
          './src/assets/fonts/Nunito-Light.ttf',
          './src/assets/fonts/Nunito-LightItalic.ttf',
          './src/assets/fonts/Nunito-Medium.ttf',
          './src/assets/fonts/Nunito-MediumItalic.ttf',
          './src/assets/fonts/Nunito-Regular.ttf',
          './src/assets/fonts/Nunito-Italic.ttf',
          './src/assets/fonts/Nunito-SemiBold.ttf',
          './src/assets/fonts/Nunito-SemiBoldItalic.ttf',
        ],
      },
    ],
    ['@react-native-firebase/app'],
    ['@react-native-firebase/messaging'],
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
        android: {
          extraMavenRepos: ['$rootDir/../../../node_modules/@notifee/react-native/android/libs'],
        },
      },
    ],
    [
      'react-native-vision-camera',
      {
        cameraPermissionText: 'Cho phép $(PRODUCT_NAME) truy cập camera để quét mã QR',
        enableCodeScanner: true,
        enableLocation: false,
      },
    ],
  ],
});
