
import { put, take, takeLatest } from 'redux-saga/effects';
import { userLogin } from '../../api/login';
import {fetchData} from '../../api/fetch/fetchData'

 // Saga to logging the user and fetching its respective details

function* loginUser({ payload }) {
    try {
        const response = yield (userLogin(payload));
        yield put({ type: "LOGIN_SUCCESS", response: [response.data.entityId, response.data.entityType, response.data.token]});
    } catch (error) {
        yield put({ type: "LOGIN_FAILURE", error: error.message });
    }
}

function* fetchdetails({payload}) {
    try {
        const response = yield(fetchData(payload));
        console.log(response,'response')
        yield put({type:"SET_DATA",response: [response.data.paymentCount, response.data.totalAmountPayment]})
    }
    catch(error) {
        yield put({type: "REQUEST_ERROR"})
    }
}

export function* loginScreenSaga() {
    yield takeLatest("LOGIN_REQUEST", loginUser);
}
export function* fetchSaga() {
    yield takeLatest("FETCH_DATA",fetchdetails)
}