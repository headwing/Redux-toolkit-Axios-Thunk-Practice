import React, { useEffect } from "react";
import "./Lists.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getList } from "../../redux/modules/listSlice";

const Lists = () => {
  // const [posts, setPosts] = useState(null);
  const { isLoading, error, posts } = useSelector((state) => state.list);
  console.log(posts);
  const dispatch = useDispatch();

  // const fetchPosts = async () => {
  //   const { data } = await axios.get("https://test101.fly.dev/posts");
  //   setPosts(data);
  // };

  const { category } = useParams();

  useEffect(() => {
    dispatch(__getList());
  }, [dispatch]);

  const onErrorImg = (e) => {
    e.target.src = "/image/default.jpg";
  };

  if (isLoading) {
    return <div>로딩 중....</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
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
