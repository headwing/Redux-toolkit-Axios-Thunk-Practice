// src/redux/modules/todosSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/todos");
      console.log(data);
      // 네트워크 요청이 성공한 경우 dispatch해주는 기능을 가진 API (Propmise가 resolved된 경우)
      return thunkAPI.fulfillWithValue(data.data); // 성공을 하면 fulfillWithValue에 의해 생성된 todos, getTodos, fullfilled라는 action이 dispatch되었다.
    } catch (error) {
      console.log(error);
      // 네트워크 요청이 실패한 경우 dispatch해주는 기능을 가진 API (Promise가 rejected된 경우)
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    // thunk함수를 사용하면 그냥 reducer로 받을 수 가 없어서 extraReducer로 받는다.
    // thunk함수는 reducer함수 안에 만들어진게 아니기 때문
    [__getTodos.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todos = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
