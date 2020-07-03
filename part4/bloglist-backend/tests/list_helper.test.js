const listHelper = require('../utils/list_helper')
const blogDatahelper = require('../utils/blog_data')

test('dummy returns one', () => {
    const result = listHelper.dummy(blogDatahelper.emptyBlogs)
    expect(result).toBe(0)
})

describe('total likes', () => {

    test('When the array is empty', () => {
        const result = listHelper.totalLikes(blogDatahelper.emptyBlogs)
        expect(result).toBe(0)
    })

    test('When list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(blogDatahelper.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('When list has many blog lists', () => {
        const result = listHelper.totalLikes(blogDatahelper.listWithManyBlog)
        expect(result).toBe(36)
    })
})

describe('Most favorite blog', () => {

    test('of empty list is undefined', () => {
        const result = listHelper.favoriteBlog(blogDatahelper.emptyBlogs)
        expect(result).toBe('undefined')
    })

    test('When only blog is available in the array', () => {
        const result = listHelper.favoriteBlog(blogDatahelper.listWithOneBlog)
        const expBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }

        expect(result).toEqual(expBlog)
    })

    test('When the array contains many blogs', () => {
        const result = listHelper.favoriteBlog(blogDatahelper.listWithManyBlog)
        const expBlog =
        {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        }

        expect(result).toEqual(expBlog)
    })
})

describe('Most blogs', () => {
    test('When the array is empty', () => {
        const result = listHelper.mostBlogs(blogDatahelper.emptyBlogs)
        expect(result).toBe('undefined')
    })

    test('When the collection contains only one blog', () => {
        const result = listHelper.mostBlogs(blogDatahelper.listWithOneBlog)

        const expResult = {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        }
        expect(result).toEqual(expResult)
    })

    test('When the collection contains many blogs', () => {
        const result = listHelper.mostBlogs(blogDatahelper.listWithManyBlog)

        const expResult = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        expect(result).toEqual(expResult)
    })
})

describe('Auther with most likes', () => {
    test('When the list is empty is', () => {
        const result = listHelper.mostLikes(blogDatahelper.emptyBlogs)
        expect(result).toBe('undefined')
    })

    test('When the list contains only one blog is', () => {
        const result = listHelper.mostLikes(blogDatahelper.listWithOneBlog)

        const expResult = {
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        expect(result).toEqual(expResult)
    })

    test('When list contains many blogs is', () => {
        const result = listHelper.mostLikes(blogDatahelper.listWithManyBlog)

        const expResult = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        expect(result).toEqual(expResult)
    })
})