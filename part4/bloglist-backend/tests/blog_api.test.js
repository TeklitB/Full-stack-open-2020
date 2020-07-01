const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./blogtest_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('Blog db cleared.')

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
        console.log('Initial blogs saved.')
    }

    // const blogObjects = initialBlogs
    //     .map(blog => new Blog(blog))
    // const promiseBlogArray = blogObjects.map(blog => blog.save())
    // await Promise.all(promiseBlogArray)

    // initialBlogs.forEach(async (blog) => {
    //     let blogObject = new Blog(blog)
    //     await blogObject.save()
    //     console.log('Initial blogs saved.')
    // })

    console.log('Done.')
})

describe('Retrieving blogs', () => {
    test('Blogs returned in json format', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('All list of blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('The first blog contains', async () => {
        const response = await api.get('/api/blogs')

        const blogTitle = response.body.map(b => b.title)
        expect(blogTitle).toContain('React patterns')
    })

    test('Verifying that blogs contain the transformed id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('Altering the blog', () => {
    test('Adding blog', async () => {
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterAdd = await helper.blogsInDb()
        expect(blogsAfterAdd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAfterAdd.map(blog => blog.title)
        expect(titles).toContain('Canonical string reduction')
    })

    test('Adding blog with missing likes', async () => {
        const blogWithMissingLikes = {
            title: 'RisingStack Blog',
            author: 'Ferenc Hámori',
            url: 'https://blog.risingstack.com/'
        }

        await api
            .post('/api/blogs')
            .send(blogWithMissingLikes)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterAdd = await helper.blogsInDb()
        expect(blogsAfterAdd).toHaveLength(helper.initialBlogs.length + 1)

        expect(blogsAfterAdd[2].likes).toBe(0)
    })

    test('When title or url is missing', async () => {
        const blogWithoutTitle = {
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2
        }

        const blogWithoutURL = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            likes: 0,
        }

        await api
            .post('/api/blogs')
            .send(blogWithoutTitle)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        await api
            .post('/api/blogs')
            .send(blogWithoutURL)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

afterAll(() => {
    mongoose.connection.close()
})