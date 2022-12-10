// src/App.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getFamilies } from "../redux/modules/familiesSlice";
import { useParams } from "react-router-dom";

const Family = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log(typeof id);
  // const state = useSelector((state) => state.families);
  // console.log(state);
  const { isLoading, error, families } = useSelector((state) => state.families);

  useEffect(() => {
    dispatch(__getFamilies());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  let family;

  if (!isLoading) {
    console.log(families);
    family = families.filter((family) => family.id === Number(id))[0];
    console.log(family);
  }
  console.log(family);

  return (
    <div>
      <p>id : {family.id}</p>
      <h1>제목 : {family.title}</h1>
      <h3>내용 : {family.content}</h3>
      {family.comments.map((comment) => (
        <div key={comment.id}>댓글 : {comment.content}</div>
      ))}
    </div>
  );
};

export default Family;
