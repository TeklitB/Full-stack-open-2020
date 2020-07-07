import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ blogs, setBlogs, setNotificationMessage }) => {

    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogURL, setNewBlogURL] = useState('')
    const [formVisible, setFormVisible] = useState(false)

    const hideForm = { display: formVisible ? 'none' : '' }
    const showForm = { display: formVisible ? '' : 'none' }

    const addNewBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogURL
        }

        blogService
            .createBlog(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNotificationMessage(`A new blog "${newBlogTitle}" by ${newBlogAuthor} is added`)
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 5000)
                setNewBlogTitle('')
                setNewBlogAuthor('')
                setNewBlogURL('')
            })
    }

    const handleBlogAuthorChange = (event) => {
        setNewBlogAuthor(event.target.value)
    }

    const handleBlogTitleChange = (event) => {
        setNewBlogTitle(event.target.value)
    }

    const handleBlogURLChange = (event) => {
        setNewBlogURL(event.target.value)
    }

    return (

        <div>
            <div style={hideForm}>
                <button onClick={() => setFormVisible(true)}>Show form</button>
            </div>
            <div style={showForm}>
                <h2>Create new blog</h2>
                <form onSubmit={addNewBlog}>
                    <div>
                        <label>Title:   <input
                            value={newBlogTitle}
                            onChange={handleBlogTitleChange}
                        />
                        </label>
                    </div>
                    <div>
                        <label>Author:   <input
                            value={newBlogAuthor}
                            onChange={handleBlogAuthorChange}
                        />
                        </label>
                    </div>
                    <div>
                        <label>url:   <input
                            value={newBlogURL}
                            onChange={handleBlogURLChange}
                        />
                        </label>
                    </div>
                    <button type="submit" onClick={() => setFormVisible(false)}>Create</button>
                </form>
                <button onClick={() => setFormVisible(false)}>Hide form</button>
            </div>
        </div>

    )
}

export default NewBlogForm