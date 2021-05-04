import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../Store/store";
import { takeLatest, put, select } from "redux-saga/effects";
import { listApi } from "./ApiCalls";
// Define a type for the slice state
interface IProduct {
  value: number;
  list: any[];
}

// Define the initial state using that type
const initialState: IProduct = {
  value: 0,
  list: [],
};

export const ProductSlice = createSlice({
  name: "product",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    listProduct(state, action: PayloadAction<any>) {},
    listProductSuccess(state, action: PayloadAction<any>) {
      state.list = action.payload;
    },
  },
});
export const {
  actions: productActions,
  reducer: productReducer,
  name: productSliceKey,
} = ProductSlice;

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;
const selectDomain = (state: RootState) => state.product || initialState;

export const selectProdctState  = createSelector(
  selectDomain,
  (state: any) => state
);

function BackendCall(): any {
  return { success: true, data: ["dddd"] };
}

interface IData {
  success: boolean;
  data: any;
}
function* listProduct() {
  try {
    //call to backend
    const res: IData = yield listApi();
    console.log(res)
    if (res.success) {
      yield put(productActions.listProductSuccess(res.data));
    }
  } catch (err) {
    console.log(err);
  }
}
// export default counterSlice.reducer;
export function* productSaga() {
  yield takeLatest(productActions.listProduct.type, listProduct);
}
