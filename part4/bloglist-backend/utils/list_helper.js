const _ = require('lodash')

const dummy = (blogs) => {
    return blogs.length
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, index) => {
        return sum + index.likes
    }, 0)
    return blogs.length === 0 ? 0 : total
}

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return 'undefined'
    }

    const likesOnly = [...blogs.map(blog => blog.likes)]
    const maxLikes = Math.max(...likesOnly)

    const fav = blogs.find(blog => blog.likes === maxLikes)
    const mostFavorite = {
        title: fav.title,
        author: fav.author,
        likes: fav.likes
    }

    return mostFavorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 'undefined'
    }

    const grpoupedByAuthor = _.groupBy(blogs, 'author')
    //console.log(grpoupedByAuthor)

    const sortedByNumOfBlogs = Object.keys(grpoupedByAuthor)
        .map((author) => {
            const orderAuthor = {
                author: author,
                blogs: grpoupedByAuthor[author]
            }

            return orderAuthor
        })
        .sort((auth, blo) => {
            return blo.blogs.length - auth.blogs.length
        })
    //console.log(sortedByNumOfBlog)
    const authWithManyBlogs = {
        author: sortedByNumOfBlogs[0].author,
        blogs: sortedByNumOfBlogs[0].blogs.length
    }
    //console.log(authWithManyBlogs)
    return authWithManyBlogs
}

const sumOfLikes = (blogs) => {
    const totalLikes = blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)

    return totalLikes
}
const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return 'undefined'
    }

    const grpoupedByAuthor = _.groupBy(blogs, 'author')
    //console.log(grpoupedByAuthor)

    const sortedBySumOfLikes = Object.keys(grpoupedByAuthor)
        .map((author) => {
            const orderAuthor = {
                author: author,
                likes: sumOfLikes(grpoupedByAuthor[author])
            }

            return orderAuthor
        }) //console.log(sortedBySumOfLikes)
        .sort((auth, blo) => {
            return blo.likes - auth.likes
        })
    //console.log(sortedBySumOfLikes)
    const authWithManyLikes = {
        author: sortedBySumOfLikes[0].author,
        likes: sortedBySumOfLikes[0].likes
    }
    //console.log(authWithManyLikes)
    return authWithManyLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}