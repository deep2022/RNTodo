import React,{useEffect,useState} from 'react';
import codePush from 'react-native-code-push'
import Nav from './src/navigation';
import { Provider } from 'react-redux';
import store from './src/store';

export default function App() {
  useEffect(()=>{
    codePush.sync({
      installMode:codePush.InstallMode.ON_NEXT_RESTART,
    },
    (status) => {
      switch (status) {
       case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates')
        break;
       case codePush.SyncStatus.UP_TO_DATE:
        console.log('App is upto date')
        break;
       case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Package is downloading')
        break;
       case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Package is downloaded and yet to be installed')
        break;
       case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Package is installed successfully')
        break;
       default:
        break;
      }
     }
    )
  })
  return(
      <Provider store={store}>
          <Nav />
      </Provider>
  )
}

const codePushOptions = 
{ checkFrequency: codePush.CheckFrequency.MANUAL,
};
App = codePush(codePushOptions)(App)