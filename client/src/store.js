import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server: 'http://localhost:3000/',
    isLogin: '',
    articles: []
  },
  mutations: {
    setLogin: function (state, payload) {
      state.isLogin = payload
    },
    setArticles: function (state, payload) {
      state.articles = payload
    }
  },
  actions: {
    getArticles: function ({commit}) {
      let url = this.state.server + 'api/articles/'
      axios.get(url)
        .then(response => {
          commit('setArticles', response.data.articles)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
