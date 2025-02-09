import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/SingleBlogPage.css';

function SingleBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`/blog/${id}`)
      .then((response) => response.json())
      .then((data) => setBlog(data))
      .catch((error) => console.error('Error fetching blog:', error));
  }, [id]);

  const handleDelete = () => {
    fetch(`/blog/${id}/delete`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          navigate('/');
        } else {
          throw new Error('Failed to delete blog');
        }
      })
      .catch((error) => console.error('Error deleting blog:', error));
  };

  if (!blog) return <div className="loading">Loading...</div>;

  return (
    <div className="single-blog-page">
      <h1>{blog.title}</h1>
      <div className="blog-meta">
        <span className="author">{blog.author}</span>
        <span className="date">{new Date(blog.blogDate).toLocaleDateString()}</span>
      </div>
      {blog.blogImage && <img src={blog.blogImage} alt={blog.title} className="blog-image" />}
      <p className="blog-content">{blog.content}</p>
      <div className="blog-actions">
        <Link to={`/blog/${blog._id}/edit`} className="edit-btn">Edit</Link>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
        <Link to="/" className="back-btn">Back to Blogs</Link>
      </div>
    </div>
  );
}

export default SingleBlogPage;
