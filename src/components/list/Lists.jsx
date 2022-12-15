import React, { useEffect, useState } from "react";
import "./Lists.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Lists = () => {
  const [posts, setPosts] = useState(null);

  const fetchPosts = async () => {
    const { data } = await axios.get("https://test101.fly.dev/posts");
    setPosts(data);
  };

  const { category } = useParams();

  useEffect(() => {
    fetchPosts();
    console.log("아무거나");
  }, []);

  const onErrorImg = (e) => {
    e.target.src = "/image/default.jpg";
  };

  return (
    <div className="container">
      <div className="inners">
        {posts?.map((post) => {
          if (post.category === category) {
            return (
              <div className="list" key={post.id}>
                <Link to={`/detail/${post.id}`} key={post.id}>
                  <img
                    className="photo"
                    src={post.url}
                    alt="이미지"
                    onError={onErrorImg}
                  />
                </Link>
                <div className="text">{post.title}</div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Lists;
