// src/App.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __getFamilies,
  __getComments,
  //__deleteComments,
} from "../redux/modules/familiesSlice";
// import {
//   __getComments,
//   onClickDeleteButtonHandler,
// } from "../redux/modules/commentsSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Family.css";
// import { Button } from "react-bootstrap";

const Family = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log(typeof id);
  // const state = useSelector((state) => state.families);
  // console.log(state);
  const { isLoading, error, families, comments } = useSelector(
    (state) => state.families
  );

  const onClickDeleteButtonHandler = (id, commentId, comment) => {
    console.log(id, commentId, comment);
    axios.delete(`http://localhost:3001/comments/${commentId}`);
    //dispatch(__deleteComments(commentId));
    dispatch(__getComments(Number(id)));
  };
  // const { commentsIsLoading, commentsError, comments } = useSelector(
  //   (state) => state.comments
  // );

  const onClickEditButtonHandler = (id, commentId, editComment) => {
    axios.patch(`http://localhost:3001/comments/${commentId}`, editComment);
    dispatch(__getComments(Number(id)));
  };

  const onClickAddButtonHandler = (addComment) => {
    axios.post("http://localhost:3001/comments", addComment);
    dispatch(__getComments(Number(id)));
  };
  const [editComment, setEditComment] = useState({
    postId: null,
    id: null,
    content: "",
  });

  const [addComment, setAddComment] = useState({
    postId: null,
    id: null,
    content: "",
  });

  useEffect(() => {
    // param 넣기
    dispatch(__getFamilies(Number(id)));
    dispatch(__getComments(Number(id)));
    // 합치기
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(__getComments());
  // }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  console.log(families);
  console.log(comments);
  // let family;
  // let comment;

  // if (!isLoading) {
  //   console.log(families);
  //   family = families.filter((family) => family.id === Number(id))[0];
  //   console.log(family);

  //   console.log(comments);
  //   comment = comments.filter((comment) => comment.postId === Number(id));
  //   console.log(comment);
  // }
  // console.log(family);

  // onClickDeleteButtonHandler = (commentId) => {
  //   console.log(
  //     `http://localhost:3001/families/${Number(id)}/comments/${commentId}`
  //   );
  //   axios.delete(
  //     `http://localhost:3001/families/${Number(id)}/comments/${commentId}`
  //   );
  // };

  // if (commentsIsLoading) {
  //   return <div>로딩 중....</div>;
  // }

  // if (!commentsIsLoading) {
  //   console.log(comments);
  //   comment = comments.filter((comment) => comment.postId === Number(id));
  //   console.log(comment);
  // }

  return (
    <div className="detail">
      <div className="detailMain">
        <div className="detailContent">
          <p>id : {families.id}</p>
          <h1>🎄{families.title}</h1>
          <img src={families.image} className="detailImage" />
          <h3>{families.content}</h3>
        </div>

        <div className="detailComments">
          {comments.map((comment) => (
            <div>
              <div key={comment.id}>댓글 : {comment.content}</div>

              <button
                onClick={() =>
                  onClickDeleteButtonHandler(id, comment.id, comment)
                }
              >
                삭제
              </button>
              <input
                type="text"
                onChange={(e) => {
                  setEditComment({
                    ...editComment,
                    postId: Number(id),
                    id: comment.id,
                    content: e.target.value,
                  });
                  console.log(editComment);
                }}
              ></input>
              <button
                onClick={() =>
                  onClickEditButtonHandler(id, comment.id, editComment)
                }
              >
                수정
              </button>
            </div>
          ))}
          <div className="detailCommentsInput">
            <input
              onChange={(e) => {
                setAddComment({
                  ...addComment,
                  postId: Number(id),
                  id: comments[comments.length - 1].id + 1,
                  content: e.target.value,
                });
                console.log(addComment);
              }}
            ></input>
            <button onClick={() => onClickAddButtonHandler(addComment)}>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Family;
