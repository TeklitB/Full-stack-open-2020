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

describe('Retrieving a specific blog', () => {
    test('Retrieval succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultingBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(resultingBlog.body).toEqual(blogToView)
    })

    test('Retrieval fails with statuscode 404 when blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        console.log(validNonexistingId)

        await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })

    test('Retrieval fails with statuscode 400 when id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
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

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        await api
            .post('/api/blogs')
            .send(blogWithoutURL)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogsAfterEnd = await helper.blogsInDb()
        expect(blogsAfterEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('Deleting a blog', () => {
    test('Deletion succeeds with statuscode 204 when id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAfterDelete = await helper.blogsInDb()
        expect(blogsAfterDelete)
            .toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAfterDelete.map(blog => blog.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('Update a blog', () => {
    test('Update succeeds when id is found', async () => {
        const updateBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10
        }

        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[1]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updateBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterUpdate = await helper.blogsInDb()
        expect(blogsAfterUpdate[1].likes).toBe(10)
    })

    test('Update fails when id is not found', async () => {

        const validNonexistingId = await helper.nonExistingId()
        const updateBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 15
        }

        await api
            .put(`/api/blogs/${validNonexistingId}`)
            .send(updateBlog)
            .expect(404)
            .expect('Content-Type', /application\/json/)

        const blogsAfterUpdate = await helper.blogsInDb()
        expect(blogsAfterUpdate).toHaveLength(helper.initialBlogs.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})