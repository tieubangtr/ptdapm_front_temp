<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <!-- <v-card-text> -->
                <div class="layout column align-center">
                  <img src="../static/img/logoDHTL.png" alt="Vue Material Admin" width="120" height="120">
                  <h1 class="flex my-4 primary--text">Quên Mật Khẩu</h1>
                </div>
                <div class="formForgot">
                    <form @submit="handleSubmit" style="width:70%">
                        <div class="change_form_main_formDiv">
                            <v-text-field label="Email"
                            v-model="form.email" 
                            @focus="check.email=''"
                            ></v-text-field>
                            <div class="validation">{{this.check.email}}</div>
                        </div>
                        <button type="submit"  class="change_form_main_submit">Xác nhận</button>
                    </form>
                    <div class="change_form_main_text">Quay lại trang <NuxtLink to="login" class="change_form_main_text_login">Đăng nhập</NuxtLink></div>
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
export default {
    layout:'none',
    data(){
        return {
            form:{
                email:''
            },
            check:{
                email:'',
            }
        }
    },
    methods:{
        validate(){
            this.check={
                email:'',
            }
            if(!this.form.email){
                this.check.email='Vui lòng nhập dòng này'
            }else if(!this.isEmail(this.form.email)){
                this.check.email='Dòng này phải là email'
            }
        },
        isEmail(email){
            return email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        },
        async handleSubmit(e){
            this.validate()
            e.preventDefault();
            console.log(this.form);
            if(!this.check.email){
                try{
                    axios.post('https://ptdapmback.herokuapp.com/v1/api/auth/forgotPassword',this.form)
                    .then(()=>{
                        localStorage.setItem('tokenPass',data)
                        this.check.email ='Vui lòng kiểm tra Email'
                    })
                    .catch((err)=>{
                        this.check.email ='Vui lòng kiểm tra lại Email'
                    })
                }
                catch(err){
                    console.log(err);
                }
                // messenger
            }
        }
    }
}
</script>
<style scoped lang="css">
.formForgot{
    display:flex;
    flex-direction: column;
    align-items: center;
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
  .parent{
    height:100vh;
    display:flex;
    align-items:center;
    position: relative;
    font-family: 'Roboto', sans-serif;
}
.validation{
    color:red;
    margin-top:10px;
    padding-left: 10px;
}
.change{
    width: 100%;
    height: 80vh;
    display: flex;
    border-radius: 10px;
    box-shadow: 0 0 4px #333;
}
.change_imgLogo{
    width: 50%;
    height: 100%;
}
.change_imgLogo_img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.change_form{
    width: 50%;
    height: 100%;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.change_form_header{
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.change_form_header_link{
    display:block;
    align-self: start;
    text-decoration: none;
    position: relative;
    top: 2%;
    left:2%;
}
.change_form_header_link_icon{
    font-size:32px;
    color: #333;
}
.change_form_header_child{
    margin-top:70px;
    width:50%;
    position: relative;
}
.change_form_header_logoImg{
    position: absolute;
    bottom:60%;
    left:100%;
}
.change_form_header_logoImg_img{
    height:70px;
}
.change_form_header_text{
    display:block;
    text-align:center;
    font-size:25px;
    color: #777;
    margin-bottom: 20px;
    text-transform: uppercase;
}
.change_form_main{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.change_form_main_text{
    margin-top: 20px;
    font-size: 16px;
}
.change_form_main_text_login{
    text-decoration: none;
    color:#78ca46;
}
.change_form_main_formDiv{
    width:100%;
    margin-top: 20px;
}
.change_form_main_formDiv_text{
    display:block;
    text-align:left;
    font-size:16px;
    color: #333;
    font-weight: 500;
}
.change_form_main_formDiv_input{
    width: 100%;
    border-radius: 10px;
    margin-top:10px ;
    outline: none;
    padding: 15px 18px;
    color: #333;
    font-size: 16px;
    border:1px solid rgb(238, 238, 238);
    box-shadow: 0 4px 5px rgb(194, 194, 194);
}
.change_form_main_submit{
    width: 100%;
    border-radius: 8px;   
    background-color: #1a64ad;
    color: white;
    box-shadow: 0 4px 5px #999;
    padding: 15px;
    font-size:15px;
    font-weight:500;
    border: none;
}
.change_form_main_submit:hover{
    opacity: 0.9;
}
</style>
