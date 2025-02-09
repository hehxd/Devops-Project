import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/EditBlogPage.css'

function EditBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    blogImage: '',
  });

  useEffect(() => {
    fetch(`/blog/${id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error('Error fetching blog:', error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    fetch(`/blog/${id}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => navigate(`/blog/${id}`))
      .catch((error) => console.error('Error updating blog:', error));
  };



  return (
    <div className="edit-blog-page">
      <h1>Edit Blog</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Content"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          placeholder="Author"
        />
        <input
          type="text"
          name="blogImage"
          value={formData.blogImage}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <div className="form-actions">
          <button type="button" onClick={handleUpdate} className="update-btn">Update</button>
          <Link to={`/blog/${id}`} className="cancel-btn">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

export default EditBlogPage;
