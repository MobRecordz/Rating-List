import Vue from 'vue'
import Vuex from 'vuex'

// mutations
const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST',
      CHANGE_STATE_STATUS = 'CHANGE_STATE_STATUS';

// fake response from the server
import users from './users.json';

function getDataFromTheServer() {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve(users);
    }, 2000);
  })
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    usersList: []
  },
  mutations: {
    [UPDATE_USERS_LIST] (state, data) {
      Vue.set(state, 'usersList', [...data]);

      this.commit(CHANGE_STATE_STATUS, 'default');
    },
    [CHANGE_STATE_STATUS] (state, data) {
      if(typeof data === 'string')
        state.status = data;
    }
  },
  actions: {
    async fakeRequest({ commit }) {
      let data = null,
          parsedArr = [];

      commit(CHANGE_STATE_STATUS, 'loading');

      // Сверху импортим ответ от сервера
      try {
        data = await getDataFromTheServer();
      } catch(error) {
        commit(CHANGE_STATE_STATUS, 'error');
      }
      
      // Перебор и сортировка массива, для расчёта места в рейтинге.
      parsedArr = data.users.slice().sort((a, b) => {
        return b.rating - a.rating
      });

      parsedArr.forEach((item, index) => {
        item.place = ++index;
      });

      commit(UPDATE_USERS_LIST, parsedArr);
      
    }
  },
  getters: {
    getUsersList: state => state.usersList,
    getStatus: state => state.status
  }
})
