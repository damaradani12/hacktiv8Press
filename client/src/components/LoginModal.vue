<template>
  <div class="modal fade" id="loginModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Login</h4>
          </div>
          <div class="modal-body form-group">
            <label for="email">Email :</label>
            <input type="text" class="form-control" v-model="email">
            <label for="password">Password :</label>
            <input type="password" class="form-control" v-model="password">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" style="width:100%;" @click="login()">Login</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'

export default {
  name: 'loginModal',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      let urlLink = this.$store.state.server + 'api/users/signin'

      axios.post(urlLink, {email: this.email, password: this.password})
        .then(response => {
          console.log(response.data)
          if (response.data.message !== 'User Login Successfully') {
            swal({
              icon: 'error',
              title: 'Oops...',
              text: 'something wrong!'
            })
          } else {
            localStorage.setItem('token', response.data.token)
            this.$store.commit('setLogin', 'true')
            swal(
              'Good job!',
              'You log in successfully!',
              'success'
            ).then(res => {
              // eslint-disable-next-line
              $('#loginModal').modal('toggle')
              this.$router.push('/')
            })
          }
        })
        .catch(err => {
          console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Email / Password is wrong!'
          })
        })
    }
  }
}
</script>

<style>

</style>
