import Vue from 'vue'
import Vuex from 'vuex'

// mutations
const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST',
      CHANGE_STATE_STATUS = 'CHANGE_STATE_STATUS',
      CHANGE_SORTING_DATA = 'CHANGE_SORTING_DATA',
      CHANGE_SEARCH_INPUT = 'CHANGE_SEARCH_INPUT';

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
    usersList: [],

    sortingData: {
      by: '',
      direction: false, // true - up, false - down
    },
    searchInput: '',
  },
  mutations: {
    [UPDATE_USERS_LIST] (state, data) {
      Vue.set(state, 'usersList', [...data]);

      this.commit(CHANGE_STATE_STATUS, 'default');
    },
    [CHANGE_STATE_STATUS] (state, data) {
      if(typeof data === 'string')
        state.status = data;
    },
    [CHANGE_SORTING_DATA] (state, data) {
      state.sortingData.by = data.by;
      state.sortingData.direction = data.direction;
    },
    [CHANGE_SEARCH_INPUT](state, data) {
      state.searchInput = data;
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

      // Добавление поля PLACE к каждому элементу
      parsedArr.forEach((item, index) => {
        item.place = ++index;
      });

      commit(UPDATE_USERS_LIST, parsedArr);
      
    },

  },
  getters: {
    getStatus: state => state.status,
    getUsersList: state => state.usersList,

    getSearchOutput: (state, getters) => {
      if(state.searchInput.length > 0)
        return getters.getUsersList.filter((item) => {
          let fullName = item.name + item.secondName,
              search = state.searchInput.toLowerCase();

          return fullName.toLowerCase().includes(search);
        })

      return getters.getUsersList
    },
    getSortedArray: (state, getters) => {
      let direction = state.sortingData.direction,
          by = state.sortingData.by;

      return getters.getSearchOutput.slice().sort((a, b) => {
        if(direction) 
          return a[by] - b[by]
        
        return b[by] - a[by]
      })
    }
  }
})
