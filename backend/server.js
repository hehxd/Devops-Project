const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const BlogPost = require('./Models/blogPostModel')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/blogs', async(req, res) => {
    try {
        const blogPost = await BlogPost.find({})
        res.status(200).json(blogPost);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.get('/blog/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const blog = await BlogPost.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
          }
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error.message);
        res.status(500).json({ message: error.message });
    }
})

app.post('/blog/add', async(req, res) => {
    try {
        const blogData = {
            ...req.body,
            blogDate: new Date()
        };
        const blogPost = await BlogPost.create(blogData)
        res.status(200).json(blogPost);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.put('/blog/:id/update', async(req,res) => {
    try {
        const {id} = req.params;
        const blog = await BlogPost.findByIdAndUpdate(id, req.body);
        if(!blog) {
            return res.status(404).json({ message: `Cannot find any blog with ID ${id}` })
        }
        const updatedBlog = await BlogPost.findById(id);
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/blog/:id/delete', async(req,res) => {
    try {
        const {id} = req.params;
        const blog = await BlogPost.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({message: `Cannot find any blog with ID ${id}`})
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(port, () => {
        console.log(`Node API is listening on port ${port}`)
    })
}).catch((error) => {
    console.log(error)  
})