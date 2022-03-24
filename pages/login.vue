<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="../static/img/logoDHTL.png" alt="logo" width="120" height="120">
                  <h1 class="flex my-4 primary--text">Đăng Nhập</h1>
                </div>
                <v-form>
                  <v-text-field append-icon="person" name="email" label="Email" type="text"
                                v-model="form.username" @focus=" check.username=''"></v-text-field>
                  <div class="validation">{{this.check.username}}</div>
                  <v-text-field 
                    append-icon="lock" 
                    label="Password" 
                    type="password"
                    v-model="form.password" 
                    @focus="check.password=''"
                  ></v-text-field>
                  <div class="validation">{{this.check.password}}</div>
                </v-form>
                <div class="text">
                  <NuxtLink to='/forgotpassword' class="text_forgotPass">Quên mật khẩu?</NuxtLink>
                  <NuxtLink to='/register' class="text_register">Đăng kí</NuxtLink>
                </div>
              </v-card-text>
              <div class="btlLogin">
                <v-btn class="btnbtnlogin" color="primary" type="submit" @click="login" :loading="loading">Đăng nhập</v-btn>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
// import {redirect} from '../assets/js/redirect'?
  export default {
    layout: 'default',    
    // middleware:redirect,
    data() {
      return {
        checkRed:true,
        loading:false,
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
    mounted()
    {
      this.handleRedirect()
    },
    methods: {
      handleRedirect(){
        if(!localStorage.getItem('accessToken')){
          this.$router.push('/login')
        }
        else{
          this.$router.push('/homePage')
        }
      },
      validate(){
          this.check={
              username:'',
              password:'',
              note:'',
          }
          
          if(!this.form.username.trim()){
              this.check.username='Vui lòng nhập email'
              this.loading=false
          }
          else if(!this.isEmail(this.form.username.trim())){
              this.check.username='Email không hợp lệ'
              this.loading=false
          }
          // else if(this.form.username.trim().length>30){
          //     this.loading=false
          //     this.check.username='Email không quá 30 kí tự'
          // }
          if(!this.form.password.trim()){
              this.check.password='Vui lòng nhập mật khẩu'
              this.loading=false
          }
          else if(this.form.password.trim().length<=6){
              this.check.password='Mật khẩu phải lớn hơn 6 kí tự'
              this.loading=false
          }
          // else if(this.form.password.trim().length>20){
          //     this.loading=false
          //     this.check.password='Mật khẩu tối đa 20 kí tự'
          // }
      },
      isEmail(email){
          return email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
      async login(e){
        this.loading=true;
        this.validate()
        this.form.username=this.form.username.trim()
        this.form.password=this.form.password.trim()
        if(!this.check.username&&!this.check.password){
            axios.post('https://ptdapmback.herokuapp.com/v1/api/auth/login',this.form )
            .then((res)=>{
                localStorage.setItem('User',JSON.stringify(res.data));
                
                localStorage.setItem('permission',res.data.roles[0])
                localStorage.setItem('accessToken',res.data.token)
                localStorage.setItem('userId', res.data.id)
                localStorage.setItem('login?', true)
                if(res.data.roles[0] == 'ROLE_USER') {
                  this.$router.push('/homePage')
                } else {
                  this.$router.push('/dashboard')
                }

            })
            .catch((err)=>{
              console.log(err.response.data);
              this.check.password = 'Email hoặc mật khẩu không chính xác!';
              this.loading = false;
            })
        }
      }
    }

  };
</script>
<style scoped lang="css">
.btlLogin{
  width: 100%;
  display: flex;
  justify-content:center;
  align-items: center;
}
.btnbtnlogin{
  padding:20px 80px;
}
.v-input__slot:before {
    /* border-color: rgba(0,0,0,0.42); */
    border-color: red !important;
}
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
