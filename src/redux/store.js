import { configureStore } from "@reduxjs/toolkit";
import { bookSlice } from "./book/slice";
import { commonSlice } from "./common/slice";

const store = configureStore({
  reducer: {
    book: bookSlice.reducer,
    common: commonSlice.reducer,
  },
});
console.log(bookSlice);
export default store;
