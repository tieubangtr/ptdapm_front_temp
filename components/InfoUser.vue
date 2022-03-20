<template>
    <div>
        <Header/>
        <div style="background-color:#f5f5f5;">
            <v-container>
                <v-layout class="names" style="height:60vh"> 
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
                        <h3 class="header">Hồ Sơ Tài Khoản</h3>
                        <v-layout class="name">
                            <v-flex lg3>
                                Họ tên
                            </v-flex>
                            <v-flex lg3>
                                {{ datas.name }}
                            </v-flex>
                        </v-layout>
                        <v-layout class="name">
                            <v-flex lg3>
                                Email
                            </v-flex>
                            <v-flex lg3>
                                {{ datas.email }}
                            </v-flex>
                        </v-layout>
                        <v-layout class="name">
                            <v-flex lg3>
                                Số điện thoại
                            </v-flex>
                            <v-flex lg3>
                                {{ datas.phone }}
                            </v-flex>
                        </v-layout>
                        <v-layout class="name">
                            <v-flex lg3>
                                Ngày Sinh
                            </v-flex>
                            <v-flex lg3>
                                {{ datas.birthday }}
                            </v-flex>
                        </v-layout>
                        <v-layout class="name">
                            <v-flex lg3>
                                Địa chỉ
                            </v-flex>
                            <v-flex lg3>
                                {{ datas.addr }}
                            </v-flex>
                        </v-layout>
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
            datas:[]
        }
    },
    mounted(){
        axios.get(`https://ptdapmback.herokuapp.com/v1/api/users/${JSON.parse(localStorage.getItem('User')).id}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('User')).token}`
            }
        })
        .then((res)=>{
            this.datas=res.data;
        })
        .catch((err)=>{
            console.log(err.response.data);
        })
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
.name{
    width: 100%;
    padding:20px 0;
    border-bottom: 1px solid #b5b5b5;
}
.names{
    width: 100%;
    padding:20px 0;
}
</style>