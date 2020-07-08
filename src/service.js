import axios from 'axios'

const url = 'http://localhost:5000/api'

class UserService {
  // Get user id
  static getInfo(email, token) {
    return axios.get(`${url}/user/getInfo/${email}`, {
      headers: {
        'user-token': token
      }
    })
  }

  // Register
  static register(data) {
    return axios.post(`${url}/user/register`, data)
  }

  // Login
  static login(data) {
    return axios.post(`${url}/user/login`, data)
  }

  // Update info
  static updateInfo(id, data, token) {
    return axios.put(`${url}/user/update/info/${id}`, data, {
      headers: { 'user-token': token }
    })
  }

  // Update password
  static updatePassword(id, data, token) {
    return axios.put(`${url}/user/update/password/${id}`, data, {
      headers: { 'user-token': token }
    })
  }

  // Delete
  static delete(id, token) {
    return axios.delete(`${url}/user/delete/${id}`, {
      headers: {
        'user-token': token
      }
    })
  }
}

export { UserService }
