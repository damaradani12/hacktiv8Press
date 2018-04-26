<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <!-- <router-link to="/about">About</router-link> | -->
      <a data-toggle="modal" data-target="#createArticleModal">Create Article</a> |
      <a data-toggle="modal" data-target="#loginModal">Login</a> |
      <a @click="logout">Logout</a> |
      <a data-toggle="modal" data-target="#signUpModal">SignUp</a> |
      <a>By Author</a> |
      <a>tag</a>
    </div>
    <LoginModal />
    <sign-up-modal />
    <CreateArticle />
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import LoginModal from '@/components/LoginModal.vue'
import SignUpModal from '@/components/SignUpModal.vue'
import CreateArticle from '@/components/CreateArticle.vue'
import swal from 'sweetalert'

export default {
  name: 'app',
  components: {
    LoginModal,
    SignUpModal,
    CreateArticle
  },
  methods: {
    logout: function () {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        buttons: [true, 'Yes, Log out!']
      }).then(result => {
        if (result) {
          swal(
            'Log out!',
            'You have been log out.',
            'success'
          ).then(result => {
            localStorage.removeItem('token')
            this.$store.commit('setLogin', '')
            this.$route.push('/')
          })
        }
      })
    }
  },
  created: function () {
    let token = localStorage.getItem('token')
    this.$store.dispatch('getArticles')
    console.log(token)
    if (token) {
      this.$store.commit('setLogin', 'true')
    }
  },
  computed: mapState([
    'isLogin'
  ])
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
}

/* #nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
