<template>
    <div>
        <Header/>
        <div style="background-color:#f5f5f5;">
            <v-container>
                <v-layout style="height:60vh">
                    <v-flex lg5 class="menu">
                        <div class="outImg">
                            <img src="/img/logoDHTL.png" alt="Ảnh đại diện" class="img">
                        </div>
                        <NuxtLink to='/infoUser' class="item">
                            <v-icon class="icon">home</v-icon>
                            <div class="text">Tổng quan hồ sơ tài khoản</div>
                        </NuxtLink>
                        <NuxtLink to='/updateInfoUser' class="item">
                            <v-icon class="icon">edit_calendar</v-icon>
                            <div class="text">Sửa hồ sơ</div>
                        </NuxtLink>
                        <NuxtLink to='/updatePassInfoUser' class="item last">
                            <v-icon class="icon">lock</v-icon>
                            <div class="text">Đổi mật khẩu</div>
                        </NuxtLink>
                    </v-flex>
                    <v-flex lg7 class="infoUser">
                        <h3 class="header">Đổi Mật Khẩu Của Bạn</h3>
                        <v-text-field  
                            label="Mật khẩu hiện tại" 
                            type="password"
                            v-model="form.password"
                            @focus="check.password=''"
                        >
                        </v-text-field>
                        <div class="validation">{{this.check.password}}</div>
                        <v-text-field  
                            label="Mật khẩu mới" 
                            type="password"
                            v-model="form.newPassword"
                            @focus="check.newPassword=''"
                        >
                        </v-text-field>
                        <div class="validation">{{this.check.newPassword}}</div>
                        <v-text-field 
                            label="Nhập lại mật khẩu mới" 
                            type="password"
                            v-model="form.oldNewPassword"
                            @focus="check.oldNewPassword=''"
                        >
                        </v-text-field>
                        <div class="validation">{{this.check.oldNewPassword}}</div>
                        <div class="btnGroup">
                            <span class="cancel">Hủy</span>
                            <span class="save" @click="handleSave">Lưu</span>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <Footter/>
    </div>
</template>
<script>
  import Header from './header/Header.vue'
  import Footter from './footter'
  import axios from 'axios'
export default {
    components: {
      Header,
      Footter
    },
    data(){
        return {
            form:{
                idUser:JSON.parse(localStorage.getItem('User')).id,
                password:'',
                newPassword:'',
                oldNewPassword:''
            },
            check:{
                password:'',
                newPassword:'',
                oldNewPassword:''
            }
        }
    },
    methods: {
        validate(){
            this.check={
                password:'',
                newPassword:'',
                oldNewPassword:''
            }
            if(!this.form.password){
                this.check.password='Vui lòng nhập dòng này'
            }
            else if(this.form.password.length<=6){
                this.check.password='Mật khẩu phải lớn hơn 6 kí tự'
            }
            if(!this.form.newPassword){
                this.check.newPassword='Vui lòng nhập dòng này'
            }
            else if(this.form.newPassword.length<=6){
                this.check.newPassword='Mật khẩu phải lớn hơn 6 kí tự'
            }
            if(this.form.oldNewPassword!=this.form.newPassword){
                this.check.oldNewPassword='Mật khẩu không khớp'
            }
            console.log(this.form.newPassword,this.form.oldNewPassword);
            console.log(this.check.oldNewPassword);
        },
        handleSave(){
            this.validate()
            if(!this.check.passwords&&!this.check.oldPasswords&&!this.newPasswords){
                var config = {
                    method: "put",
                    url:
                        `https://ptdapmback.herokuapp.com/v1/api/users/${JSON.parse(localStorage.getItem('User')).id}/password?newPassword=${this.newPassword}&oldPassword=${this.password}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('User')).token,
                    },
                };
                axios(config)
                .then((response) => {
                    let myToast = this.$toasted.success("Holla !!");
                    myToast.text("Đổi mật khẩu thành công").goAway(2000);
                })
                .catch((error) => {
                    let myToast = this.$toasted.error("Holla !!");
                    myToast.text("Đổi mật khẩu thất bại").goAway(2000);
                });
            }
        }
    }
}
</script>
<style scoped>
.validation{
    color:red;
    margin-bottom:10px;
    padding-left: 10px;
}
.outImg{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.img{
    width: 200px;
    height: 220px;
}
.infoUser{
    padding-left:30px;
}
.menu{
    background-color:#444;
    width:100%;
}
.item{
    text-decoration: none;
    display: flex;
    padding:20px;
    align-items: center;
    border-top: 1px solid #f5f5f5;
}
.last{
    border-bottom: 1px solid #f5f5f5;
}
.icon{
    color:white;
    font-size: 23px;
}
.text{
    color:white;
    font-size: 15px;
    margin-left: 20px;
}

.btnGroup{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.cancel{
    padding:10px 40px;
    border-radius:3px;
    box-shadow: 0 0 2px red;
    color:red;
    margin-right: 20px;
    cursor: pointer;
}
.save{
    padding:10px 40px;
    margin-left:20px;
    border-radius:3px;
    box-shadow: 0 0 2px rgb(9, 255, 0);
    background-color: green;
    color:white;
    cursor: pointer;
}
</style>