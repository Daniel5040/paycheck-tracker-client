import axios from 'axios'

const url = 'http://localhost:5000/api/workday'
const token = localStorage.getItem('token')
if (token) axios.defaults.headers.common['Authorization'] = token

const state = {
  error: '',
  workdays: [],
  workday: {}
}

const mutations = {
  create: (state, newWorkday) => state.workdays.unshift(newWorkday),
  get_workday: (state, workday) => (state.workday = workday),
  set_info: (state, workdays) => (state.workdays = workdays),
  set_error: (state, error) => (state.error = error),
  clear_error: state => (state.error = '')
}

const actions = {
  // Get list of workdays
  async getWorkdays({ commit }, id) {
    try {
      const res = await axios.get(`${url}/paycheck/${id}`)
      const data = res.data
      commit('set_info', data)
    } catch (error) {
      commit('set_error', error.response.data.error)
      setTimeout(() => commit('clear_error'), 4000)
    }
  },

  // Create workday
  async createWorkday({ commit }, data) {
    try {
      const res = await axios.post(`${url}/create`, data)
      const newWorkday = res.data.data
      commit('create', newWorkday)
    } catch (error) {
      commit('set_error', error.response.data.error)
      setTimeout(() => commit('clear_error'), 4000)
    }
  },

  // Update workday
  async updateWorkday({ commit }, { id, data }) {
    try {
      await axios.put(`${url}/update/${id}`, data)
    } catch (error) {
      commit('set_error', error.response.data.error)
      setTimeout(() => commit('clear_error'), 4000)
    }
  },

  // Delete workday
  async deleteWorkday({ commit }, id) {
    try {
      await axios.delete(`${url}/delete/${id}`)
    } catch (error) {
      commit('set_error', error.response.data.error)
      setTimeout(() => commit('clear_error'), 4000)
    }
  }
}

const getters = {
  workdayError: state => state.error,
  workdayList: state => state.workdays,
  workday: state => state.workday
}

export default { state, getters, actions, mutations }
