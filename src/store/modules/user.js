import axios from 'axios'
import router from '@/router'

const url = 'http://localhost:5000/api/user'
const token = localStorage.getItem('token')
if (token) axios.defaults.headers.common['Authorization'] = token

const state = {
  userError: '',
  token: localStorage.getItem('token') || '',
  user: {}
}

const mutations = {
  set_user_info: (state, token, user) => {
    state.token = token
    state.user = user
  },
  logout: state => {
    state.token = ''
    state.user = {}
  },
  set_user_error: (state, userError) => (state.userError = userError),
  clear_user_error: state => (state.userError = ''),
  set_user: (state, user) => (state.user = user),
  update_user_info: (state, data) => {
    state.user.name = data.name
    state.user.wage = data.wage
  }
}

const actions = {
  // Get user info
  async getUserInfo({ commit }, email) {
    const res = await axios.get(`${url}/getInfo/${email}`)
    const user = res.data
    commit('set_user', user)
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
      commit('set_user_info', token, user)
    } catch (userError) {
      commit('set_user_error', userError.response.data.userError)
      localStorage.removeItem('token')
      setTimeout(() => commit('clear_user_error'), 4000)
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
      commit('set_user_info', token, user)
    } catch (userError) {
      commit('set_user_error', userError.response.data.userError)
      localStorage.removeItem('token')
      setTimeout(() => commit('clear_user_error'), 4000)
    }
  },

  // Update info
  async updateInfo({ commit }, { id, data }) {
    try {
      await axios.put(`${url}/update/info/${id}`, data)
      commit('update_user_info', data)
    } catch (userError) {
      commit('set_user_error', userError.response.data.userError)
      setTimeout(() => commit('clear_user_error'), 4000)
    }
  },

  // Update password
  async updatePassword({ commit }, { id, password }) {
    try {
      await axios.put(`${url}/update/password/${id}`, { password })
    } catch (userError) {
      commit('set_user_error', userError.response.data.userError)
      setTimeout(() => commit('clear_user_error'), 4000)
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
    } catch (userError) {
      commit('set_user_error', userError.response.data.userError)
      localStorage.removeItem('token')
      setTimeout(() => commit('clear_user_error'), 4000)
    }
  },

  // Logout
  logout({ commit }) {
    commit('logout')
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    delete axios.defaults.headers.common['Authorization']
    router.push({ name: 'Login' })
  }
}

const getters = {
  isLoggedIn: state => !!state.token,
  userError: state => state.userError,
  userInfo: state => state.user
}

export default { state, getters, actions, mutations }
