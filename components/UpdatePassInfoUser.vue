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
                            v-model="password"
                        >
                        </v-text-field>
                        <!-- <div class="validation">{{this.check.password}}</div> -->
                        <v-text-field  
                            label="Mật khẩu mới" 
                            type="password"
                            v-model="newPassword"
                        >
                        </v-text-field>
                        <!-- <div class="validation">{{this.check.newPassword}}</div> -->
                        <v-text-field 
                            label="Nhập lại mật khẩu mới" 
                            type="password"
                            v-model="newOldPassword"
                        >
                        <!-- <div class="validation">{{this.check.newOldPassword}}</div> -->
                        </v-text-field>
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
                newOldPassword:''
            },
            // check:{
            //     passwords:'',
            //     newPasswords:'',
            //     newOldPasswords:''
            // }
        }
    },
    methods: {
        // validate(){
        //     this.check={
        //         passwords:'',
        //         newPasswords:'',
        //         newOldPasswords:''
        //     }
        //     if(!this.form.password){
        //         this.check.passwords='Vui lòng nhập dòng này'
        //     }
        //     else if(this.form.password.length<=6){
        //         this.check.passwords='Mật khẩu phải lớn hơn 6 kí tự'
        //     }
        //     if(!this.form.newPassword){
        //         this.check.newPasswords='Vui lòng nhập dòng này'
        //     }
        //     else if(this.form.newPassword.length<=6){
        //         this.check.newPasswords='Mật khẩu phải lớn hơn 6 kí tự'
        //     }
        //     if(!this.form.newOldPassword){
        //         this.check.newOldPasswords='Vui lòng nhập dòng này'
        //     }
        //     else if(this.form.newPassword!==this.form.newOldPassword){
        //         this.check.newOldPasswords='Mật khẩu không khớp nhau'
        //     }
        // },
        handleSave(){
            // this.validate()
            // if(!this.check.passwords&&!this.check.newOldPasswords&&!this.newPasswords){
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
            // }
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