// src/App.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __getPost,
  __deletePost,
  __getComments,
  __deleteComments,
  __editComments,
  __addComments,
} from "../redux/modules/detailSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Detail.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const { isLoading, error, post, comments } = useSelector(
    (state) => state.detail
  );

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
    dispatch(__getPost(Number(id)));
    dispatch(__getComments(Number(id)));
    // 합치기
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  console.log(post);
  console.log(comments);

  return (
    <div className="detail">
      <div className="detailMain">
        <div className="detailContent">
          <p>id : {post.id}</p>
          <h1>🎄{post.title}</h1>
          <img src={post.url} className="detailImage" />
          <h3>{post.content}</h3>
          <div className="detailContentButtons">
            <button>❤️</button>
            <button onClick={() => dispatch(__deletePost(Number(id)))}>
              삭제
            </button>
            <button>수정</button>
          </div>
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
            <button onClick={() => dispatch(__addComments(addComment))}>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
