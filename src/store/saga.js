import { all } from 'redux-saga/effects';
import {countSaga} from '../components/countSaga'

// root saga 
function* rootSaga() {
    yield all([
        countSaga(),
      ])
}

export default rootSaga;