/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";

PushNotification.configure({
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    },
    requestPermissions: Platform.OS === 'ios',
});
PushNotification.createChannel({
    channelId: "test-channel", // (required)
    channelName: "test-channel", // (required)
 },
 (created) => console.log(`CreateChannel returned '${created}'`)
 );

AppRegistry.registerComponent(appName, () => App);
