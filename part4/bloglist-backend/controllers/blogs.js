const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog.toJSON())
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    //const token = getTokenFrom(request)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }
    const user = await User.findById(decodedToken.id)

    // const user = await User.findById(body.userId)

    if (!body.title || !body.url) {
        return response.status(400).json({ error: 'Title or URL is missing' })
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })
    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        return response.json(savedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const blog = await Blog.findById(request.params.id)

    if (!request.token || decodedToken.id.toString() !== blog.user.toString()) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    try {
        await Blog.findByIdAndRemove(request.params.id)
        return response.status(204).end()
    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const id = await Blog.findById(request.params.id)

    if (!id) {
        return response.status(404).json({ error: 'resource not found.' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
        return response.status(401).json({ error: 'Not autherized' })
    }
    if (!body.title || !body.url) {
        return response.status(400).json({ error: 'Title or URL is missing' })
    }

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.userId
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        return response.json(updatedBlog.toJSON())
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter