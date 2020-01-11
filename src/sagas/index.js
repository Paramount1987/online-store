import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST_PRODUCTS } from 'constants/index';

import {
    requestSuccesProducts,
    requestFailProducts,
} from 'actions/index';

import API from 'api/index';

function* requestProductsSaga(action) {
   try {
     const { dealers } = action.payload;
     const data = yield call(API.getProducts, dealers);

     yield put(requestSuccesProducts(data));
   } catch (e) {
      yield put(requestFailProducts(e));
   }
}

function* saga() {
  yield takeLatest(REQUEST_PRODUCTS, requestProductsSaga);
}

export default saga;
