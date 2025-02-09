const mongoose = require('mongoose')

const blogPostSchema = mongoose.Schema(

    {
        title: {
            type: String,
            requried: [true, "Please enter a blog title."]
        },
        content: {
            type: String,
            requried: [true, "Please enter the blog content."]
        },
        author: {
            type: String,
            requried: [true, "Please enter the blog author's name."]
        },
        blogDate: {
            type: Date,
            required: true,
            default: Date.now()
        },
        blogImage: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }

)


const blogPost = mongoose.model('BlogPost',blogPostSchema);

module.exports = blogPost;