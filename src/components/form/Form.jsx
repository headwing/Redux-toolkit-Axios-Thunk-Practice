import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __postPost } from "../../redux/modules/postSlice";
import Button from "../button/Button";
import "./form.css";

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    category: "",
    content: "",
    url: "",
  });

  const onClickHandler = () => {
    if (post.title === "" || post.title.length >= 15) {
      alert("15자이내의 제목을 입력해주세요");
    } else if (post.category === "") {
      alert("카테고리를 선태해주세요!");
    } else if (post.content === "") {
      alert("내용을 입력해주세요!");
    } else {
      dispatch(__postPost(post));
      console.log(post);
      navigate("/");
    }
  };

  return (
    <div className="posting-form-contianer">
      <div className="posting-input-group">
        <div className="posting-title">
          <label>제목</label>
          <input
            type="text"
            onChange={(event) => {
              const { value } = event.target;
              setPost({ ...post, title: value });
            }}
          ></input>
        </div>
        <div className="posting-category">
          <label>WITH?</label>
          <select
            onChange={(event) => {
              const { value } = event.target;
              setPost({ ...post, category: value });
            }}
          >
            {" "}
            <option value="" selected>
              카테고리를 선택해주세요
            </option>
            <option value="family">아이와함께👶</option>
            <option value="couple">연인과함께💕</option>
            <option value="single">혼자지만 괜찮아😭</option>
            <option value="parents">부모님과 함께👵👴</option>
          </select>
        </div>
        <div className="posting-content">
          <textarea
            type="text"
            onChange={(event) => {
              const { value } = event.target;
              setPost({ ...post, content: value });
            }}
          />
        </div>
        <div className="posting-url">
          <input
            type="url"
            placeholder="이미지url"
            onChange={(event) => {
              const { value } = event.target;
              setPost({ ...post, url: value });
            }}
          />
        </div>
      </div>
      <div className="posting-btn">
        <Button onClick={onClickHandler}>완료</Button>
      </div>
    </div>
  );
}

export default Form;
