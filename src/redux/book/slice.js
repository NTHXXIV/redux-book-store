import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apiService";

// const fetchData = async () => {
//   dispatch(setLoading(true));
//   try {
//     let url = `/books?_page=${pageNum}&_limit=${limit}`;
//     if (query) url += `&q=${query}`;
//     const res = await api.get(url);
//     dispatch(setBooks(res.data));

//     dispatch(setErrorMessage(""));
//   } catch (error) {
//     dispatch(setErrorMessage(error.message));
//   }
//   dispatch(setLoading(false));
// };

export const getBooksData = createAsyncThunk(
  "book/setBooks",
  async ({ pageNum, limit, query }) => {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const response = await api.get(url);
    return response.data;
  }
);

const initialState = {
  books: [],
  pageNum: 1,
  totalPage: 10,
  book: null,
  status: "idle",
};

export const bookSlice = createSlice({
  name: "book",
  initialState,

  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setBook: (state, action) => {
      state.book = action.payload;
    },
    setPageNum: (state, action) => {
      console.log(action.payload);

      state.pageNum = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    builder
      .addCase(getBooksData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBooksData.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      });
  },
});
const { actions, reducer } = bookSlice;
export const { setBooks, setPageNum, setTotalPage, setBook } = actions;

export default reducer;
