import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./details.css";
import "../../components/header/header.css";
import img from "../../assets/images/b5.jpg"; // Assuming this is a placeholder or default image
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const DetailsPages = () => {
  const { id } = useParams();
  const location = useLocation();
  const [blogs, setBlogs] = useState(location.state?.blogDetails || null);

  useEffect(() => {
    if (!blogs) {
      fetch(`http://localhost:8000/blog/retrieve/${id}`)
        .then((response) => response.json())
        .then((data) => setBlogs(data))
        .catch((error) => console.error("Error fetching blog details:", error));
    }
  }, [id, blogs]);

  return (
    <>
      {blogs ? (
        <section className="singlePage">
          <div className="container">
            <div className="left">
              <img src={blogs.featured_image_url || img} alt="Blog Cover" />
            </div>
            <div className="right">
              <div className="buttons"></div>
              <h1>{blogs.name}</h1>
              <p>{blogs.description}</p>
              {blogs.content.map((contentItem, index) => (
                <div key={index}>
                  <h2>{contentItem.heading}</h2>
                  <p>{contentItem.paragraph}</p>
                </div>
              ))}
              <p>Links:<Link style={{ color:"blue",textDecoration: "underline"}}>{blogs.Links}</Link> </p>
            </div>
          </div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
