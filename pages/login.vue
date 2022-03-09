<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="../static/img/logoDHTL.png" alt="Vue Material Admin" width="120" height="120">
                  <h1 class="flex my-4 primary--text">Đăng Nhập</h1>
                </div>
                <v-form>
                  <v-text-field append-icon="person" name="login" label="Login" type="text"
                                v-model="form.username" @focus=" check.username=''"></v-text-field>
                  <div class="validation">{{this.check.username}}</div>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password"
                                v-model="form.password" @focus=" check.password=''"></v-text-field>
                  <div class="validation">{{this.check.password}}</div>
                </v-form>
                <div class="text">
                  <NuxtLink to='forgotpassword' class="text_forgotPass">Quên mật khẩu?</NuxtLink>
                  <NuxtLink to='register' class="text_register">Đăng kí</NuxtLink>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn icon>
                  <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="red">fa fa-google fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
import setAuth from '../assets/js/setAuth'
  export default {
    layout: 'default',
    data() {
      return {
        loading: false,
          form:{
              username:'',
              password:'',
          },
          check:{
              username:'',
              password:'',
              note:'',
          }
      }
    },
    methods: {
      validate(){
          this.check={
              username:'',
              password:'',
              note:'',
          }
          // this.form.submit=false
          if(!this.isEmail(this.form.username)){
              this.check.username='Dòng này phải là email'
          }
          if(!this.form.password){
              this.check.password='Vui lòng nhập dòng này'
          }
          else if(this.form.password.length<=6){
              this.check.password='Mật khẩu phải lớn hơn 6 kí tự'
          }
          // return this.form.submit=true
      },
      isEmail(email){
          return email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
      async login(e){
        this.validate()
        if(!this.check.username&&!this.check.password){
            axios.post('https://ptdapmback.herokuapp.com/v1/api/auth/login',this.form )
            .then((res)=>{
                localStorage.setItem('accsetToken',res.data.token)
                this.loading = true;
                this.$router.push('/dashboard');
            })
            .catch((err)=>{
              console.log('err',err);
              this.check.password = 'Tài khoản hoặc mật khẩu không chính xác!';
            })
            // if(data.apierror){
            //     this.check.note=data.apierror.debugMessage
            // }
            // else{
                // localStorage.setItem('accsetToken',data.token)
                // this.loading = true;
                // this.$router.push('/dashboard');
            // }
        }
      }
    }

  };
</script>
<style scoped lang="css">
.validation{
    color:red;
    margin-bottom:10px;
    padding-left: 10px;
}
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
  .text{
    margin:10px 0;
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .text_forgotPass{
    color:blue;
    text-decoration: none;
  }
  .text_register{
    color:green;
    padding-left: 5px;
    text-decoration: none;
  }
</style>
