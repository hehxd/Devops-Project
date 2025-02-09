import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddBlogPage.css';

function AddBlogPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    blogImage: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/blog/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/');
      } else {
        throw new Error('Failed to add blog');
      }
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <div className="add-blog-page">
      <h1>Add New Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Content"
          required
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          placeholder="Author"
          required
        />
        <input
          type="text"
          name="blogImage"
          value={formData.blogImage}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <div className="form-actions">
          <button type="submit" className="submit-btn">Add Blog</button>
          <button type="button" onClick={() => navigate('/')} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddBlogPage;
