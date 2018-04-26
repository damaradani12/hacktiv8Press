import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server: 'http://localhost:3000/',
    isLogin: '',
    articles: [],
    article: {}
  },
  mutations: {
    setLogin: function (state, payload) {
      state.isLogin = payload
    },
    setArticles: function (state, payload) {
      state.articles = payload
    },
    setOneArticle: function (state, payload) {
      state.article = payload
    }
  },
  actions: {
    getArticles: function ({commit}) {
      let url = this.state.server + 'api/articles/'
      axios.get(url)
        .then(response => {
          console.log(response.data.articles)
          commit('setArticles', response.data.articles)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getOneArticle: function ({commit}, articleId) {
      let url = this.state.server + 'api/articles/' + articleId
      axios.get(url)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    createArticle: function ({dispatch, commit}, article) {
      let url = this.state.server + 'api/articles/create/'
      let token = localStorage.getItem('token')

      axios.post(url, article, {headers: {token}})
        .then(response => {
          dispatch('getArticles')
          swal(
            'New Question!',
            'Question Succesfully Created',
            'success'
          ).then(result => {
            // eslint-disable-next-line
            $('#createArticleModal').modal('toggle')
            this.$router.push('/')
          })
        })
        .catch(err => {
          console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'U Need to Login'
          })
        })
    },
    updateArticle: function ({dispatch, commit}, article) {

    },
    deleteArticle: function ({dispatch, commit}, articleId) {
      let url = this.state.server + 'api/articles/delete/' + articleId
      let token = localStorage.getItem('token')

      axios.delete(url, {headers: {token: token}})
        .then(res => {
          swal(
            'Deleted!',
            `${this.title} have been deleted.`,
            'success'
          ).then((value) => {
            dispatch('getArticles')
            this.$router.push('/')
          })
        })
        .catch(err => {
          console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong'
          })
        })
    }
  }
})
