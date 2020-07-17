import axios from 'axios'
import router from '@/router'

const url = 'http://localhost:5000/api/user'
const token = localStorage.getItem('token')
if (token) axios.defaults.headers.common['Authorization'] = token

const state = {
  error: '',
  token: localStorage.getItem('token') || '',
  user: {}
}

const mutations = {
  success: (state, token, user) => {
    state.token = token
    state.user = user
  },
  logout: state => {
    state.token = ''
    state.user = {}
  },
  auth_error: (state, error) => (state.error = error),
  clear_error: state => (state.error = ''),
  user_info: (state, user) => (state.user = user),
  update_info: (state, data) => {
    state.user.name = data.name
    state.user.wage = data.wage
  }
}

const actions = {
  // Get user info
  async getUserInfo({ commit }, email) {
    const res = await axios.get(`${url}/getInfo/${email}`)
    const user = res.data
    commit('user_info', user)
  },

  // Login
  async login({ commit }, user) {
    try {
      const res = await axios.post(`${url}/login`, user)
      const data = res.data.data
      const token = data.token
      localStorage.setItem('token', token)
      localStorage.setItem('email', user.email)
      axios.defaults.headers.common['Authorization'] = token
      commit('success', token, user)
    } catch (error) {
      commit('auth_error', error.response.data.error)
      localStorage.removeItem('token')
    }
  },

  // Register
  async register({ commit }, user) {
    try {
      await axios.post(`${url}/register`, user)

      const res = await axios.post(`${url}/login`, {
        email: user.email,
        password: user.password
      })
      const data = res.data.data
      const token = data.token
      localStorage.setItem('token', token)
      localStorage.setItem('email', user.email)
      axios.defaults.headers.common['Authorization'] = token
      commit('success', token, user)
    } catch (error) {
      commit('auth_error', error.response.data.error)
      localStorage.removeItem('token')
    }
  },

  // Update info
  async updateInfo({ commit }, { id, data }) {
    try {
      await axios.put(`${url}/update/info/${id}`, data)
      commit('update_info', data)
    } catch (error) {
      commit('auth_error', error.response.data.error)
    }
  },

  // Update password
  async updatePassword({ commit }, { id, password }) {
    try {
      await axios.put(`${url}/update/password/${id}`, { password })
    } catch (error) {
      commit('auth_error', error.response.data.error)
    }
  },

  // Delete
  async deleteAccount({ commit }, id) {
    try {
      await axios.delete(`${url}/delete/${id}`)
      commit('logout')
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      delete axios.defaults.headers.common['Authorization']
      router.push({ name: 'Login' })
    } catch (error) {
      commit('auth_error', error.response.data.error)
      localStorage.removeItem('token')
    }
  },

  // Logout
  logout({ commit }) {
    commit('logout')
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    delete axios.defaults.headers.common['Authorization']
    router.push({ name: 'Login' })
  },

  // Clear error
  clearError({ commit }) {
    commit('clear_error')
  }
}

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  errorMessage: state => state.error,
  userInfo: state => state.user
}

export default { state, getters, actions, mutations }
