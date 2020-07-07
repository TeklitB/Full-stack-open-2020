import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async newBlogObject => {
  const signature = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlogObject, signature)
  return response.data
}

const updateBlog = async (id, newBlogObject) => {
  const signature = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, newBlogObject, signature)
  return response.data
}

const deleteBlog = async (id) => {
  const signature = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, signature)
  return response.data
}

export default {
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
  setToken
}