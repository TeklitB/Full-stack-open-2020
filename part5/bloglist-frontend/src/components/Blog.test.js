import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

test('Rendering only title and author', () => {
    const blog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
    }

    //user={App.user} deletBlog={App.handleDeleteBlog}
    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).not.toHaveTextContent(
        'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    )

    expect(component.container).not.toContain(blog.likes)

    const div = component.container.querySelector('.titleblog')
    expect(div).not.toHaveTextContent(
        'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    )

    expect(div).not.toContain(blog.likes)
})

test('Clicking the button calls event handler once', () => {
    const blog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        user: {
            username: "hellas",
            name: "Arto Hellas User",
            id: "5efd02ab690dfc1e54d9b8f0"
        }
    }

    const user = {
        username: 'hellas',
        password: 'teklit'
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} deletBlog={mockHandler} user={user} />
    )

    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)

    const div = component.container.querySelector('.allDetail')
    expect(div).toHaveTextContent(
        'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    )

    expect(div).toHaveTextContent(blog.likes)
})

test('Click the like button twice', () => {
    const user = {
        username: 'hellas'
    }

    const blog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 0,
        user: {
            username: "hellas",
            name: "Arto Hellas User",
            id: "5efd02ab690dfc1e54d9b8f0"
        }
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} deletBlog={mockHandler} user={user} increaseLikes={mockHandler} />
    )

    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<NewBlogForm /> updates parent state and calls onSubmit', () => {
    const createNewBlog = jest.fn()

    const component = render(
        <NewBlogForm createNewBlog={createNewBlog} />
    )

    const titleIn = component.container.querySelector('#title')
    const authorIn = component.container.querySelector('#author')
    const urlIn = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleIn, {
        target: {
            value: 'Canonical string reduction'
        }
    })
    fireEvent.change(authorIn, {
        target: { value: 'Edsger W. Dijkstra' }
    })
    fireEvent.change(urlIn, {
        target: { value: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html' }
    })
    fireEvent.submit(form)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0].title).toBe('Canonical string reduction')
})