<template>
  <div class="modal fade" id="signUpModal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Sign Up</h4>
        </div>
        <div class="modal-body form-group">
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
          <button type="button" class="btn btn-default" @click="signup()">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      let signupData = {
        name: this.regis_name,
        email: this.email,
        password: this.password
      }
      console.log(signupData)
    }
  }
}
</script>

<style>

</style>
