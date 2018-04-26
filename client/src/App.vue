<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <!-- <router-link to="/about">About</router-link> | -->
      <a>Create</a> |
      <a data-toggle="modal" data-target="#loginModal">Login</a> |
      <a>Logout</a> |
      <a data-toggle="modal" data-target="#signUpModal">SignUp</a> |
      <a>By Author</a> |
      <a>tag</a>
    </div>
    <LoginModal />
    <sign-up-modal />
    <router-view/>
  </div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue'
import SignUpModal from '@/components/SignUpModal.vue'

export default {
  name: 'app',
  components: {
    LoginModal,
    SignUpModal
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
            this.isLogin = false
            this.$isLogin = false
            // window.location.href= "index.html"
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
  }
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

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
