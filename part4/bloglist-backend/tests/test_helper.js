const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        userId: '5efd0199690dfc1e54d9b8ef'
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        userId: '5efd0199690dfc1e54d9b8ef'
    }
]

const initialUsers = [
    {
        username: 'hellas',
        name: 'Arto Hellas',
        password: 'teklit'
    },
    {
        username: 'root',
        name: 'Super User',
        password: 'clinton'
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    initialUsers,
    nonExistingId,
    blogsInDb,
    usersInDb
}