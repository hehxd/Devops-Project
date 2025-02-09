import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogPage from './components/BlogPage';
import SingleBlogPage from './components/SingleBlogPage';
import EditBlogPage from './components/EditBlogPage';
import AddBlogPage from './components/AddBlogPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogPage />} />
        <Route path="/blog/add" element={<AddBlogPage />} />
        <Route path="/blog/:id/edit" element={<EditBlogPage />} />
        <Route path="/blog/:id" element={<SingleBlogPage />} />
      </Routes>
    </Router>
  );
}

export default App;
