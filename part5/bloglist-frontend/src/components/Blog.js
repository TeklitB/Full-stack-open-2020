import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, deletBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleBlogView = () => {
    setShowDetails(!showDetails)
  }

  const increaseLikes = async () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
      userId: blog.user.id,
    }

    const returnedBlog = await blogService.updateBlog(blog.id, newBlog)
    setLikes(returnedBlog.likes)
  }

  const showDeleteForAuthorizedUser = () => {
    if (blog.user.username.toString() === user.username.toString()) {
      return (
        <div>
          <button onClick={() => deletBlog(blog)}>
            Delete
          </button>
        </div>
      )
    }

    return null
  }

  if (!showDetails) {
    return (
      <div style={blogStyle}>
        <div> {blog.title} {blog.author}
          <button onClick={toggleBlogView}>
            View
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div> {blog.title} {blog.author}
        <button onClick={toggleBlogView}>
          Hide
        </button>
      </div>
      <div>{blog.url}</div>
      <div>{likes} {' '}
        <button onClick={increaseLikes}>
          Like
        </button>
      </div>
      <div>{blog.user.name}</div>
      {showDeleteForAuthorizedUser()}
    </div>
  )
}

export default Blog
