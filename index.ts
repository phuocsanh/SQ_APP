import {registerRootComponent} from 'expo';
import {configureReanimatedLogger, ReanimatedLogLevel} from 'react-native-reanimated';
import {LogBox} from 'react-native';
import App from './App';
import {handleBackgroundMessage} from './src/hooks/useNotificationListener';

LogBox.ignoreLogs([/Require cycle.*/]);
// LogBox.ignoreAllLogs();

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

handleBackgroundMessage();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
