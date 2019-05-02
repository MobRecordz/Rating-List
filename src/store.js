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
      Vue.set(state, 'usersList', [...data]);
    }
  },
  actions: {
    fakeRequest({ commit }) {
      
      // Перебор и сортировка массива, для расчёта места в рейтинге.
      let parsedArr = users.users.slice().sort((a, b) => {
          return b.rating - a.rating
      });

      parsedArr.forEach((item, index) => {
        item.place = ++index;
      });

      commit(UPDATE_USERS_LIST, parsedArr);
    }
  },
  getters: {
    getUsersList: state => state.usersList
  }
})
