// // src/redux/modules/todosSlice.js

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   comments: [],
//   // 합치기!!!
//   commentsIsLoading: true,
//   commentsError: null,
// };

// export const __getComments = createAsyncThunk(
//   "getComments",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.get("http://localhost:3001/comments");
//       console.log(data);
//       // 네트워크 요청이 성공한 경우 dispatch해주는 기능을 가진 API (Propmise가 resolved된 경우)
//       return thunkAPI.fulfillWithValue(data.data); // 성공을 하면 fulfillWithValue에 의해 생성된 todos, getTodos, fullfilled라는 action이 dispatch되었다.
//     } catch (error) {
//       console.log(error);
//       // 네트워크 요청이 실패한 경우 dispatch해주는 기능을 가진 API (Promise가 rejected된 경우)
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// // export const __deleteFamiliesComment = createAsyncThunk(
// //   "deleteFamiliesComment",
// //   async (payload, thunkAPI) => {
// //     try {
// //       const data = await axios.get("http://localhost:3001/families");
// //       console.log(data);
// //       // 네트워크 요청이 성공한 경우 dispatch해주는 기능을 가진 API (Propmise가 resolved된 경우)
// //       return thunkAPI.fulfillWithValue(data.data); // 성공을 하면 fulfillWithValue에 의해 생성된 todos, getTodos, fullfilled라는 action이 dispatch되었다.
// //     } catch (error) {
// //       console.log(error);
// //       // 네트워크 요청이 실패한 경우 dispatch해주는 기능을 가진 API (Promise가 rejected된 경우)
// //       return thunkAPI.rejectWithValue(error);
// //     }
// //   }
// // );

// export const commentsSlice = createSlice({
//   name: "comments",
//   initialState,
//   reducers: {},
//   extraReducers: {
//     // thunk함수를 사용하면 그냥 reducer로 받을 수 가 없어서 extraReducer로 받는다.
//     // thunk함수는 reducer함수 안에 만들어진게 아니기 때문
//     [__getComments.pending]: (state) => {
//       state.commentsIsLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
//     },
//     [__getComments.fulfilled]: (state, action) => {
//       state.commentsIsLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
//       state.comments = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
//     },
//     [__getComments.rejected]: (state, action) => {
//       state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
//       state.commentsError = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
//     },

//   },
// });
// // 이거는 안되는 거야~
// // export const onClickDeleteButtonHandler = (id, commentId, family) => {
// //   console.log(typeof id, typeof commentId, family);
// //   let copy = family;
// //   const aaa = copy.comments.filter((comment) => comment.id !== commentId)[0];
// //   copy["comments"] = [];
// //   // family.comments = aaa;
// //   //console.log(copy.comments);
// //   console.log(copy);
// //   console.log(copy["comments"]);
// // };

// // thunk 만들기
// export const onClickDeleteButtonHandler = (id, commentid, comment) => {
//   console.log("삭제함수 들어옴!!!");
//   console.log(id, commentid, comment);
//   axios.delete(`http://localhost:3001/comments/${commentid}`);
// };

// export const {} = commentsSlice.actions;
// export default commentsSlice.reducer;
