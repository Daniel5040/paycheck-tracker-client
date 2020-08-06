import axios from 'axios'

const url = 'http://localhost:5000/api/workday'
const token = localStorage.getItem('token')
if (token) axios.defaults.headers.common['Authorization'] = token

const state = {
  workdayError: '',
  workdays: [],
  activeWorkdays: []
}

const mutations = {
  create_workday: (state, newWorkday) =>
    state.activeWorkdays.unshift(newWorkday),
  set_active_workdays: (state, workdays) => (state.activeWorkdays = workdays),
  set_workday_info: (state, workdays) => (state.workdays = workdays),
  set_workday_error: (state, error) => (state.error = error),
  clear_workday_error: state => (state.error = ''),
  logout_workday: state => {
    state.workdays = []
    state.activeWorkdays = []
  }
}

const actions = {
  // Get list of workdays
  async getWorkdays({ commit }, id) {
    try {
      const res = await axios.get(`${url}/paycheck/${id}`)
      const data = res.data
      commit('set_active_workdays', data)
    } catch (error) {
      commit('set_workday_error', error.response.data.error)
      setTimeout(() => commit('clear_workday_error'), 4000)
    }
  },

  // Create workday
  async createWorkday({ commit }, data) {
    try {
      const res = await axios.post(`${url}/create`, data)
      const newWorkday = res.data.data
      commit('create_workday', newWorkday)
    } catch (error) {
      commit('set_workday_error', error.response.data.error)
      setTimeout(() => commit('clear_workday_error'), 4000)
    }
  },

  // Update workday
  async updateWorkday({ commit }, { id, data }) {
    try {
      await axios.put(`${url}/update/${id}`, data)
    } catch (error) {
      commit('set_workday_error', error.response.data.error)
      setTimeout(() => commit('clear_workday_error'), 4000)
    }
  },

  // Delete workday
  async deleteWorkday({ commit }, id) {
    try {
      await axios.delete(`${url}/delete/${id}`)
    } catch (error) {
      commit('set_workday_error', error.response.data.error)
      setTimeout(() => commit('clear_workday_error'), 4000)
    }
  },

  // Logout
  logoutWorkday({ commit }) {
    commit('logout_workday')
  }
}

const getters = {
  workdayError: state => state.error,
  workdayList: state => state.workdays,
  workdayActive: state => state.activeWorkdays
}

export default { state, getters, actions, mutations }
