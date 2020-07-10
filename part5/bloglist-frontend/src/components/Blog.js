import React, { useState } from 'react'

const Blog = ({ blog, deletBlog, user, increaseLikes }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  //console.log(blog)
  const toggleBlogView = () => {
    setShowDetails(!showDetails)
  }

  // const showDeleteForAuthorizedUser = () => {
  //   if (blog.user.username === user.username) {contains
  //     return (
  //       <div>
  //         <button id='delete-button' onClick={() => deletBlog(blog)}>
  //           Delete
  //         </button>
  //       </div>
  //     )
  //   }

  //   return null
  // }

  // if (!showDetails) {
  //   return (
  //     <div style={blogStyle} className='titleblog'>
  //       <div> {blog.title} {blog.author}
  //         <button id='view-button' onClick={toggleBlogView}>
  //           View
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }

  // return (
  //   <div style={blogStyle} className='allDetail'>
  //     <div> {blog.title} {blog.author}
  //       <button onClick={toggleBlogView}>
  //         Hide
  //       </button>
  //     </div>
  //     <div>{blog.url}</div>
  //     <div>{blog.likes} {' '}
  //       <button id='like-button' onClick={increaseLikes}>
  //         Like
  //       </button>
  //     </div>
  //     <div>{blog.user.name}</div>
  //     {showDeleteForAuthorizedUser()}
  //   </div>
  // )

  return (
    <div style={blogStyle} className='titleblog'>
      {showDetails === false ?
        <p>{blog.title} {blog.author}</p>
        :
        <div className='allDetail'>
          <p>{blog.title} {blog.author}</p>
          <p>{blog.url}</p>
          <div>
            {blog.likes}
            <button id='like-button' onClick={increaseLikes}>like</button>

          </div>
          <p>{blog.user.name}</p>
          {blog.user.username === user.username ?
            <button id='delete-button' onClick={() => deletBlog(blog)}>Delete</button>
            : null
          }
        </div>
      }
      <button id='view-button' onClick={toggleBlogView}>{showDetails ? 'Hide' : 'View'}</button>
    </div>
  )
}

export default Blog
