import React, { useState } from 'react'

const NewBlogForm = ({ createNewBlog }) => {

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

        createNewBlog(blogObject)

        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogURL('')
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
                <button id='show-form' onClick={() => setFormVisible(true)}>Show form</button>
            </div>
            <div style={showForm}>
                <h2>Create new blog</h2>
                <form onSubmit={addNewBlog}>
                    <div>
                        <label>Title:   <input
                            id='title'
                            value={newBlogTitle}
                            onChange={handleBlogTitleChange}
                        />
                        </label>
                    </div>
                    <div>
                        <label>Author:   <input
                            id='author'
                            value={newBlogAuthor}
                            onChange={handleBlogAuthorChange}
                        />
                        </label>
                    </div>
                    <div>
                        <label>url:   <input
                            id='url'
                            value={newBlogURL}
                            onChange={handleBlogURLChange}
                        />
                        </label>
                    </div>
                    <button id='submitbutton' type="submit" onClick={() => setFormVisible(false)}>Create</button>
                </form>
                <button id='hide-form' onClick={() => setFormVisible(false)}>Hide form</button>
            </div>
        </div>

    )
}

export default NewBlogForm