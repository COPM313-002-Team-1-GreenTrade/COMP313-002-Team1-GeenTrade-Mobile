  
import { YellowBox } from 'react-native';


YellowBox.ignoreWarnings(['Setting a timer', 'Accessing view manager']);

// Your web app's Firebase configuration
const firebaseConfig = {
  staging: {
  FIREBASE_API_KEY: "AIzaSyDLUAnCa81HkyBlF6Z0xMLhTc55FfAvuEg",
  FIREBASE_AUTH_DOMAIN: "greantrade.firebaseapp.com",
  FIREBASE_DATABASE_URL: "https://greantrade.firebaseio.com",
  FIREBASE_PROJECT_ID: "greantrade",
  FIREBASE_STORAGE_BUCKET: "gs://greantrade.appspot.com",
  FIREBASE_MESSAGING_SENDER_ID: "976879369920",
  APP_ID: "1:976879369920:web:c23dc9dce776c214dd3725",
  MEASUREMENT_ID: "G-1E62XFZ773",
  GOOGLE_CLOUD_VISION_API_KEY:'AIzaSyASwOsGYGGBztQmuAIGJLz-Ie_26bYP86I',
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