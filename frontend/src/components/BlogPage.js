import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/BlogPage.css'

function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  useEffect(() => {
    fetchBlogs();
  }, []);


  const fetchBlogs = () => {
    fetch(`${API_BASE_URL}/blogs`)
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error('Error fetching blogs:', error));
  };

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/blog/${id}/delete`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          fetchBlogs(); // Refresh the blog list after deletion
        } else {
          throw new Error('Failed to delete blog');
        }
      })
      .catch((error) => console.error('Error deleting blog:', error));
  };

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Blog Posts</h1>
        <Link to="/blog/add" className="add-blog-btn">Add New Blog</Link>
      </div>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            {blog.blogImage && <img src={blog.blogImage} alt={blog.title} className="blog-image" />}
            <div className="blog-content">
              <h2><Link to={`/blog/${blog._id}`}>{blog.title}</Link></h2>
              <p className="blog-excerpt">{blog.content.substring(0, 100)}...</p>
              <p className="blog-meta">
                <span className="author">{blog.author}</span>
                <span className="date">{new Date(blog.blogDate).toLocaleDateString()}</span>
              </p>
              <div className="blog-actions">
                <Link to={`/blog/${blog._id}/edit`} className="edit-btn">Edit</Link>
                <button onClick={() => handleDelete(blog._id)} className="delete-btn">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPage;
