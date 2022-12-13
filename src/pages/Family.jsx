// src/App.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __getFamilies,
  __getComments,
  __deleteComments,
  __editComments,
} from "../redux/modules/familiesSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Family.css";

const Family = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const { isLoading, error, families, comments } = useSelector(
    (state) => state.families
  );

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

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  console.log(families);
  console.log(comments);

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

              <button onClick={() => dispatch(__deleteComments(comment.id))}>
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
                  dispatch(__editComments([comment.id, editComment]))
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
