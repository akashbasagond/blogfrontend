import React, { useState, useEffect } from "react";
import "./blog.css";
import { AiOutlineTags, AiFillHeart, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";

export const Card = () => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [blogs, setBlogs] = useState([]); // State to store fetched blog data
  const history = useHistory();

  const toggleComments = () => setShowComments(!showComments);

  const handleCommentChange = (e) => setNewComment(e.target.value);

  const handleNameChange = (e) => setUserName(e.target.value);

  const addComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const commentText = userName ? `${userName}: ${newComment}` : newComment;
      setComments([...comments, commentText]);
      setNewComment("");
    }
  };

  const incrementLikeCount = () => {
    setLikeCount(likeCount + 1);
    setLiked(true);
  };

  useEffect(() => {
    fetch("/api/blog/list")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data); // Update blogs state with fetched data
      })
      .catch((error) => console.error("Error fetching blog data:", error));
  }, []);

  const handleBlogClick = (blogId) => {
    fetch(`http://localhost:8000/blog/retrieve/${blogId}`)
      .then((response) => response.json())
      .then((data) => {
        history.push(`/details/${blogId}`, { blogDetails: data });
      })
      .catch((error) => console.error("Error fetching blog details:", error));
  };

  return (
    <section className="blog" style={{ width: "65%", margin: "0 auto" }}>
      <div className="container grid1">
        {blogs.map((item) => (
          <div className="box boxItems" key={item.id}>
            <div className="img">
              <img src={item.featured_image_url} alt="Blog Featured" />
            </div>
            <div className="details">
              <div className="tag">
                <AiOutlineTags className="icon" />
                <a href="/">#{item.category}</a>
              </div>
              <Link
                to={`/details/${item.blog_id}`}
                className="link"
                onClick={() => handleBlogClick(item.blog_id)}
              >
                <h3>{item.description}</h3>
              </Link>
              <div className="date">
                <button onClick={incrementLikeCount}>
                  <AiFillHeart className="icon" color={liked ? "red" : "black"} />
                  <label>{likeCount}</label>
                </button>
                <button onClick={toggleComments}>
                  <AiOutlineComment className="icon" />
                  <label>27</label>
                </button>
                <button>
                  <AiOutlineShareAlt className="icon" />
                  <label>SHARE</label>
                </button>
              </div>
              {showComments && (
                <div className="comments-section">
                  <h4>Comments</h4>
                  <form onSubmit={addComment} style={{ width: "100%" }}>
                    <textarea
                      value={newComment}
                      onChange={handleCommentChange}
                      placeholder="Add your comment..."
                    ></textarea>
                    <input
                      type="text"
                      value={userName}
                      onChange={handleNameChange}
                      placeholder="Your name (optional)"
                    />
                    <button
                      type="submit"
                      style={{
                        height: "30px",
                        width: "10%",
                        color: "white",
                        backgroundColor: "#35CEA0",
                        borderRadius: "20px",
                      }}
                    >
                      Post
                    </button>
                  </form>
                  <ul>
                    {comments.map((comment, index) => (
                      <li key={index}>{comment}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
