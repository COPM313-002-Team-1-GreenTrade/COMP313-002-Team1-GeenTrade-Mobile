  
import { YellowBox } from 'react-native';


YellowBox.ignoreWarnings(['Setting a timer', 'Accessing view manager']);

// Your web app's Firebase configuration
const firebaseConfig = {
  staging: {
  FIREBASE_API_KEY: "AIzaSyDOtbNG7wrYY_fhJmIxfXPy_421wGeR-iM",
  FIREBASE_AUTH_DOMAIN: "green-trade-comp313.firebaseapp.com",
  FIREBASE_DATABASE_URL: "https://green-trade-comp313.firebaseio.com",
  FIREBASE_PROJECT_ID: "green-trade-comp313",
  FIREBASE_STORAGE_BUCKET: "green-trade-comp313.appspot.com",
  FIREBASE_MESSAGING_SENDER_ID: "293966987703",
  APP_ID: "1:293966987703:web:b071c6520502f44250a832",
  MEASUREMENT_ID: "G-KVSXZLJ2MS",
  GOOGLE_CLOUD_VISION_API_KEY:'AIzaSyBJ4v954kAzclBzjxz6BcDgRTzmob1pPvA',
  MAPQUEST_API_KEY: "YAq368R3oaUCCMADnWFIQozWPzlUbgQP",
  },

  };
  function getReleaseChannel() {
    return 'staging'
    // let releaseChannel = Expo.Constants.manifest.releaseChannel;
    // if (releaseChannel === undefined) {
    //   return 'staging';
    // } else if (releaseChannel === 'staging') {
    //   return 'staging';
    // } else {
    //   return 'staging';
    // }
  }
  function getEnvironment(env) {
    // console.log('Release Channel: ', getReleaseChannel());
    return firebaseConfig[env];
  }               
  var Environment = getEnvironment(getReleaseChannel());
 export default Environment