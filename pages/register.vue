<template>
  <v-app id="login" class="primary">
    <v-content>
      <div class="containerRegister">
        <div class="register">
            <div class="register_header">
                <img src="img/logoDHTL.png" alt="" class="register_header_textLogo_logo">
                <div class="register_header_textLogo">
                    <h1 class="register_header_textLogo_text flex my-4 primary--text">Đăng Kí Tài Khoản</h1>
                </div>
            </div>
            <div class="register_main">
                <form @submit="handleSubmit" style="width:100%;">
                    <div class="register_main_Form">
                        <div class="register_main_Form_childLeft">
                            <v-text-field label="Họ và Tên"
                            v-model="form.name"  
                            @focus="check.name=''"
                            ></v-text-field>
                            <div class="validation">{{this.check.name}}</div>
                        </div>
                        <div class="register_main_Form_childRight">
                            <v-text-field label="Số Điện Thoại"
                            v-model="form.phone"  
                            @focus="check.phone=''"
                            ></v-text-field>
                            <div class="validation">{{this.check.phone}}</div>
                        </div>
                    </div>
                    <div class="register_main_Form">
                        <div class="register_main_Form_childLeft">
                            <v-text-field label="Email"
                            v-model="form.email"  
                            @focus="check.email=''"
                            ></v-text-field>
                            <div class="validation">{{this.check.email}}</div>
                        </div>
                        <div class="register_main_Form_childRight">
                            <v-text-field label="Mật Khẩu"
                            v-model="form.password"  
                            @focus="check.password=''"
                            type="password"
                            ></v-text-field>
                            <div class="validation">{{this.check.password}}</div>
                        </div>
                    </div>
                    <div class="register_main_Form">
                        <div class="register_main_Form_childLeft">
                            <span class="register_main_Form_child_text">Ngày Sinh</span>
                            <input type="date" class="register_main_Form_child_input" v-model="form.birthday"  @focus="check.birthday=''"/>
                            <div class="validation">{{this.check.birthday}}</div>
                        </div>
                        <div class="register_main_Form_childRight">
                            <v-text-field label="Địa Chỉ"
                            v-model="form.addr"  
                            @focus="check.addr=''"
                            ></v-text-field>
                            <div class="validation">{{this.check.addr}}</div>
                        </div>
                    </div>
                    <div class="register_main_sex">
                        <span class="register_main_Form_child_text">Giới Tính</span>
                        <div class="group_radio">
                            <input type="radio" class="register_main_Form_child_radio" value="Nam" v-model="form.gender"/>Nam
                            <input type="radio" class="register_main_Form_child_radio" value="Nữ" v-model="form.gender"/>Nữ
                        </div>
                    </div>
                    <span class="noteRegister">{{ this.note }}</span>
                    <div class="register_main_submit">
                        <v-btn class="register_main_btn" block color="primary" type="submit" :loading="loading">Đăng Kí</v-btn>
                    </div>
                    <span class="register_main_text">Nếu bạn đã có tài khoản. Vui lòng chọn
                        <NuxtLink to="login" class="register_main_text_link">Đăng nhập</NuxtLink>
                    </span>
                </form>
            </div>
        </div>
        <div v-if="this.toask" class="toask" @click="handleToask">
            <span class="toask_text">Vui lòng kiểm tra Email để Xác Nhận</span>
            <v-icon class='toask_icon'>check_circle_outline</v-icon>
        </div>
    </div>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
    layout:"none",
    data() {
        return {
            toask:false,
            note:'',
            check:{
                name:'',
                phone:'',
                email:'',
                password:'',
                addr:'',
                birthday:'',
                gender:'',
            },
            form:{
                name:'',
                phone:'',
                email:'',
                password:'',
                addr:'',
                birthday:'',
                gender:'Nam',
            }
        }
    },
    methods:{
        validate(){
            this.check={
                name:'',
                phone:'',
                email:'',
                password:'',
                addr:'',
                birthday:'',
                gender:'',
            }
            if(!this.form.name){
                this.loading=false
                this.check.name='Vui lòng nhập dòng này'
            }
            if(!this.form.phone){
                this.loading=false
                this.check.phone='Vui lòng nhập dòng này'
            }
            else if(!this.isNumber(this.form.phone)){
                this.loading=false
                this.check.phone='Vui lòng nhập số điện thoại'
            }
            else if(this.form.phone.length<9){
                this.loading=false
                this.check.phone='Số điện thoại phải trên 8 số'
            }
            if(!this.isEmail(this.form.email)){
                this.loading=false
                this.check.email='Dòng này phải là email'
            }
            if(!this.form.password){
                this.loading=false
                this.check.password='Vui lòng nhập dòng này'
            }
            else if(this.form.password.length<=6){
                this.loading=false
                this.check.password='Mật khẩu phải lớn hơn 6 kí tự'
            }
            if(!this.form.birthday){
                this.loading=false
                this.check.birthday='Vui lòng nhập dòng này'
            }
            if(!this.form.addr){
                this.loading=false
                this.check.addr='Vui lòng nhập dòng này'
            }
        },
        isEmail(email){
            return email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        },
        isNumber(value){
            return /^-?\d+$/.test(value);
        },
        async handleSubmit(e){
            this.loading=true
            this.validate()
            e.preventDefault();
            if(!this.check.name&&!this.check.phone&&!this.check.email&&!this.check.password&&!this.check.addr&&!this.check.birthday&&!this.check.gender){
                axios.post('https://ptdapmback.herokuapp.com/v1/api/auth/signup',this.form)
                .then((res)=>{
                    this.toask=true
                    this.loading=false
                })
                .catch((err)=>{
                    this.loading=false
                    console.log(err.response.data);
                    this.note='Đăng kí thất bại. Vui lòng kiểm tra lại thông tin!'
                })
            }
        },
        handleToask(){
            this.toask=false
            this.$router.push('login')
        }
    }
}

</script>
<style scoped lang="css">
.noteRegister{
    display:block;
    text-align:center;
    color:red;
    font-style: italic;
}
.toask{
    position: absolute;
    bottom:20%;
    z-index: 100;
    background-color:white;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    box-shadow: 0 0 10px #999;
    border-radius: 10px;
    border: 2px solid green;
    padding:20px 50px;
    cursor: pointer;
    animation:toask 0.5s ease;
}
.toask_text{
    color: rgb(0, 146, 0);
    font-size:30px;
}
.toask_icon{
    color: rgb(0, 146, 0);
    font-size:50px;
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
  
.validation{
    color:red;
    margin-top:10px;
    padding-left: 10px;
}
.containerRegister{
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-attachment: fixed;  
    background-size: cover;
}
.register{
    min-width:600px;
    background-color: white;
    box-shadow:0 0 3px #333;
    border-radius: 4px;
    font-family: 'Roboto', sans-serif;
}
.register_header{
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.login_form_header_link{
    display:block;
    text-decoration: none;
}
.login_form_header_link_icon{
    font-size:32px;
}
.register_header_textLogo{
    position: relative;
}
.register_header_textLogo_text{
    text-align: center;
}
.register_header_textLogo_logo{
    height: 70px;
}
.register_main_Form{
    display : flex;
    padding: 0 20px;
    margin: 10px 0;
    justify-content: space-between;
}
.register_main_Form_childLeft{
    width: 45%;
}
.register_main_Form_childRight{
    width: 45%;
}
.register_main_Form_child_text{
    display :block;
    text-align: left;
}
.register_main_Form_child_input{
    outline: none;
    width: 100%;
    color: #333;
    font-size: 16px;
    border-bottom: 2px solid #999;
}
.register_main_Form_child_input:focus{
    border-bottom:2.5px solid blue;
}
.register_main_sex{
    padding-left: 20px;
}
.group_radio{
    margin-top: 5px;
    padding-left: 50px;
}
.register_main_Form_child_radio{
    margin-left: 20px;
}
.register_main_submit{
    margin: 20px;
    display: flex;
    justify-content: center;
}
.register_main_btn{
    max-width:300px ;
    padding:25px 0;
    font-size:16px;
    background-color:rgb(62, 62, 235);
    border:none;
    outline: none;
    font-weight: 500;
    border-radius: 10px;
    color:white;
}
.register_main_btn:hover{
    opacity: 0.9;
}
.register_main_text{
    margin-bottom:  50px;
    display: flex;
    justify-content: center;
}
.register_main_text_link{
    color:blue;
    padding-left: 5px;
    text-decoration: none;
}
@keyframes toask{
    from{
        bottom:10%;
        opacity: 0.6;
    }
    to{
        bottom:20%;
        opacity: 1;
    }
}
</style>
