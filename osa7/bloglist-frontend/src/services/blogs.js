import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const likeBlog = async (id) =>{
  const object = await axios.get(`${baseUrl}/${id}`)
  object.data.likes++
  const response  = await axios.put(`${baseUrl}/${id}`, object.data)
  return response.data
}

const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const addComment = async (id, comment) => {
  const data = {
    comment: comment
  }
  const response = await axios.post(`${baseUrl}/${id}/comments`, data)
  return response.data
}

export default { getAll, create, setToken, update, deleteBlog, likeBlog, getBlog, addComment }