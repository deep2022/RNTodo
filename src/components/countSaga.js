import { put, takeLatest } from 'redux-saga/effects'

function* count(){
    try{
    yield put({type:'UPDATED_LIST'})
    }
    catch(err){
        yield put({type:"REQUEST_ERROR"})
    }
  }
export function* countSaga(){
    yield takeLatest("LIST_DATA",count)
  }