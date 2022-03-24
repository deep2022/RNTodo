import { all } from 'redux-saga/effects';
import { fetchSaga, loginScreenSaga } from '../screens/Login/saga';

// root saga 

function* rootSaga() {
    yield all([
        loginScreenSaga(),
        fetchSaga()
      ])
}

export default rootSaga;