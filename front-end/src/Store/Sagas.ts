import { takeLatest, put, select, all } from "redux-saga/effects";
import { productSaga } from "../modules/products/redux/product";

export default function* rootSaga() {
  yield all([productSaga()]);
}
