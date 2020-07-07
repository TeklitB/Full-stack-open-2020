import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`))
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(await blogService.getAll())
        setNotificationMessage(`Blog "${blog.title}" successfully removed`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      } catch (exception) {
        setNotificationMessage(exception)
      }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setNotificationMessage(`${user.name} logged out`)
    //console.log(notificationMessage)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)

    setUser(null)
  }

  const blogsSortedByLikes = blogs.sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification errMessage={errorMessage} notifMessage={notificationMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification errMessage={errorMessage} notifMessage={notificationMessage} />
      <p>{user.name} logged-in {' '}
        <button onClick={() => handleLogout()}>
          Logout
      </button>
      </p>
      <NewBlogForm
        blogs={blogs} setBlogs={setBlogs}
        setNotificationMessage={setNotificationMessage}
      />
      <div>
        {blogsSortedByLikes.map(blog =>
          <Blog key={blog.id} blog={blog} deletBlog={handleDeleteBlog} user={user} />
        )}
      </div>
    </div>
  )
}

export default App