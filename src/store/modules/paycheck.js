import axios from 'axios'

const url = 'https://paycheck-tracker.herokuapp.com/api/paycheck'
const token = localStorage.getItem('token')
if (token) axios.defaults.headers.common['Authorization'] = token

const state = {
  paycheckError: '',
  paychecks: [],
  paycheck: {}
}

const mutations = {
  set_paycheck_info: (state, paychecks) => {
    state.paychecks = paychecks
    state.paycheck = paychecks[0]
  },
  create_paycheck: (state, newPaycheck) => {
    state.paychecks.unshift(newPaycheck)
    state.paycheck = newPaycheck
  },
  logout_paycheck: state => {
    state.paychecks = []
    state.paycheck = {}
  },
  set_paycheck_error: (state, paycheckError) =>
    (state.paycheckError = paycheckError),
  clear_paycheck_error: state => (state.paycheckError = ''),
  delete_paycheck: (state, id) => {
    const index = state.paychecks.findIndex(paycheck => paycheck._id === id)
    const start = state.paychecks.slice(0, index)
    const end = state.paychecks.slice(index + 1)
    state.paychecks = [...start, ...end]
    if (state.paychecks.length) state.paycheck = state.paychecks[0]
  }
}

const actions = {
  // Get list of paychecks and active paycheck
  async getPaychecks({ commit }, id) {
    try {
      const res = await axios.get(`${url}/user/${id}`)
      const data = res.data
      commit('set_paycheck_info', data)
    } catch (error) {
      commit('set_paycheck_error', error.response.data.error)
      setTimeout(() => commit('clear_paycheck_error'), 4000)
    }
  },

  // Create paycheck
  async createPaycheck({ commit }, data) {
    try {
      const res = await axios.post(`${url}/create`, data)
      const newPaycheck = res.data.data
      commit('create_paycheck', newPaycheck)
    } catch (error) {
      commit('set_paycheck_error', error.response.data.error)
      setTimeout(() => commit('clear_paycheck_error'), 4000)
    }
  },

  // Update paycheck Info
  async updatePaycheck({ commit }, { userId, paycheckId }) {
    try {
      await axios.put(`${url}/update/${paycheckId}/${userId}`)
    } catch (error) {
      commit('set_paycheck_error', error.response.data.error)
      setTimeout(() => commit('clear_paycheck_error'), 4000)
    }
  },

  // Update paycheck date
  async updatePaycheckDate({ commit }, { id, data }) {
    try {
      await axios.put(`${url}/update/date/${id}`, data)
    } catch (error) {
      commit('set_paycheck_error', error.response.data.error)
      setTimeout(() => commit('clear_paycheck_error'), 4000)
    }
  },

  // Delete paycheck
  async deletePaycheck({ commit }, id) {
    try {
      await axios.delete(`${url}/delete/${id}`)
      commit('delete_paycheck', id)
    } catch (error) {
      commit('set_paycheck_error', error.response.data.error)
      setTimeout(() => commit('clear_paycheck_error'), 4000)
    }
  },

  // Logout
  logoutPaycheck({ commit }) {
    commit('logout_paycheck')
  }
}

const getters = {
  paycheckError: state => state.paycheckError,
  paycheckList: state => state.paychecks,
  paycheckActive: state => state.paycheck
}

export default { state, getters, actions, mutations }
