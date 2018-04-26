<template>
  <div class="modal fade" id="signUpModal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Sign Up</h4>
        </div>
        <div class="modal-body form-group text-left">
          <label for="SUname">Name :</label>
          <input type="text" v-model="regis_name" class="form-control" id="SUname">

          <label for="SUemail">Email :</label>
          <input type="text" v-model="email" class="form-control" id="SUemail">

          <label for="SUpassword">Password :</label>
          <input type="password" v-model="password" class="form-control" id="SUpassword">

          <label for="SUconPass">Confirm Password :</label>
          <input type="password" v-model="conPass" class="form-control" id="SUconPass">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="signup">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'

export default {
  name: 'signupModal',
  data () {
    return {
      regis_name: '',
      email: '',
      password: '',
      conPass: ''
    }
  },
  methods: {
    signup: function () {
      let name = this.regis_name
      let email = this.email
      let password = this.password
      let urlLink = this.$store.state.server + 'api/users/signup'

      axios.post(urlLink, {name, email, password})
        .then(res => {
          console.log(res)
          swal(
            'Sign Up!',
            'You sign up successfully!',
            'success'
          ).then((value) => {
            // eslint-disable-next-line
            $('#signUpModal').modal('toggle')
            this.$router.push('/')
          })
        })
        .catch(function (err) {
          console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Email is not available!'
          })
        })
    }
  }
}
</script>

<style>

</style>
