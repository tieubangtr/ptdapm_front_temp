<template>
    <div>
        <Header/>
        <div style="background-color:#f5f5f5;">
            <v-container>
                <v-layout style="height:70vh">
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
                    <v-flex v-if="$fetchState.pending" lg-7 class="infoUser">
                        Đang load dữ liệu...
                    </v-flex>
                    <v-flex v-else lg7 class="infoUser">
                        <h3 class="header">Chỉnh Sửa Hồ Sơ</h3>
                        <v-text-field  
                            label="Họ tên" 
                            type="text"
                            v-model="object.name"
                        >
                        </v-text-field>
                        <v-text-field  
                            label="Email" 
                            type="text"
                            v-model="object.email"
                        >
                        </v-text-field>
                        <v-text-field  
                            label="Số Điện Thoại" 
                            type="text"
                            v-model="object.phone"
                        >
                        </v-text-field>
                        <v-text-field 
                            label="Giới tính" 
                            type="text"
                            v-model="object.gender"
                        >
                        </v-text-field>
                        <v-text-field  
                            label="Ngày Sinh" 
                            type="date"
                            v-model="object.birthday"
                        >
                        </v-text-field>
                        <v-text-field  
                            label="Địa Chỉ" 
                            type="text"
                            v-model="object.addr"
                        >
                        </v-text-field>
                        <div class="btnGroup">
                            <span class="cancel">Hủy</span>
                            <span class="save" @click="updateFrom()">Cập nhật</span>
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
    data() {
        return {
            user: JSON.parse(localStorage.getItem('User')),
            object: {}
        }
    },
    methods: {
        async updateFrom() {
            await axios ({
                method: 'PUT',
                url: `https://ptdapmback.herokuapp.com/v1/api/users/${this.user.id}`,
                data: this.object,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.user.token}`
                }
            })
            .then((res)=>{
                myToast.text("Cập nhập thành công").goAway(2000);
                this.object = res.data;
            })
            .catch((err)=>{
                console.log(err.response.data);
            })
        }
    },
    async fetch(){
        await axios.get(`https://ptdapmback.herokuapp.com/v1/api/users/${this.user.id}`,{
            headers: {
                Authorization: `Bearer ${this.user.token}`
            }
        })
        .then((res)=>{
            this.object=res.data;
            console.log(this.datas);
        })
        .catch((err)=>{
            console.log(err.response.data);
        })
    },
    components: {
      Header,
      Footter
    }
}
</script>
<style scoped>
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