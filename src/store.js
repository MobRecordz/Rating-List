import Vue from 'vue'
import Vuex from 'vuex'

// mutations
const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST';

// fake response from the server
import users from './users.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usersList: []
  },
  mutations: {
    [UPDATE_USERS_LIST] (state, data) {
      Vue.set(state, 'usersList', [...data.users]);
    }
  },
  actions: {
    fakeRequest({ commit }) {
      commit(UPDATE_USERS_LIST, users);
    }
  },
  getters: {
    getUsersList: state => state.usersList
  }
})
