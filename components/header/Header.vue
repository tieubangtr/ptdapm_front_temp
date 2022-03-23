<template>
    <div class="header-root">
        <div class="header-top">
            <v-container>
                <v-layout row>
                    <v-flex lg6>
                        <div class="contact">
                            <v-icon style="color:#d71010" size="18px">email</v-icon><span style="pading: 2px">tlu@e.edu.tlu.vn</span>
                        </div>
                    </v-flex>
                    <v-flex lg6>
                        <div class="authenticate-user">
                            <div v-if="this.user" class="have-not-login" >
                                <span class="name">
                                    {{ this.user.username }}
                                    <ul class="list">
                                        <NuxtLink to='/InfoUser' style="text-decoration: none;"><li class="item">Tài khoản của tôi</li></NuxtLink>
                                        <li @click="handleLogout" class="item">Đăng xuất</li>
                                    </ul>
                                </span> 
                            </div>
                            <div v-if="!this.user" class="logined">
                                <NuxtLink class="login" to="/login">Đăng nhập</NuxtLink>
                                <NuxtLink class="register" to="/register">Đăng kí</NuxtLink>
                            </div>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <v-container>
            <v-layout row>
                <v-flex class="v-header">
                    <NuxtLink to='/homepage' class="logo">
                        <img class="imgOut_img" src='../../assets/images/logo.png' alt="">
                    </NuxtLink>
                </v-flex>
                <v-flex class="v-search">
                    <div class="search-by-keyword">
                        <v-text-field
                            solo
                            label="Nhập từ khoá tìm kiếm"
                            v-model="searchForm"
                        />
                        <NuxtLink :to="'/homepage/search?name='+this.searchForm" class="btnSearch">
                            <v-icon>search</v-icon>
                        </NuxtLink>
                    </div>
                </v-flex>
                <v-flex class="v-booking">
                    <div class="notification">
                        <v-icon size="35px">notifications</v-icon>
                    </div>
                    <div class="book-borrow-item">
                        <v-icon @click="handleCart" size="35px">shopping_cart</v-icon>
                    </div>
                    <NuxtLink v-if="roles" to='/dashboard' class="admin">Admin</NuxtLink>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
export default {
    data () {
        return {
            user:JSON.parse(localStorage.getItem('User')),
            searchForm:'',
            roles:true
        }
    },
    mounted (){
        if(JSON.parse(localStorage.getItem('User'))){
            if(JSON.parse(localStorage.getItem('User')).roles[0]=='ROLE_USER'){
                this.roles=false
                console.log('oke');
            }
        }
        else{
            this.roles=false
        }
    },
    methods: {
        handleLogout () {
            localStorage.clear()
            this.$router.push('/login')
        },
        handleCart(){
            if(JSON.parse(localStorage.getItem('User'))){
                this.$router.push('/homepage/cart')
            }
            else{
                this.$router.push('/login')
            }
        }
    }
}
</script>

<style scoped>
    .list{
        margin:0;
        padding:0;
        border-radius:3px;
        display:none;
        position:absolute;
        box-shadow: 0 0 3px #333;
    }
    .item{
        padding:10px;
        color:#333;
        background-color:#f5f5f5;
        list-style: none;
        cursor: pointer;
        border-bottom: 1px solid rgb(141, 44, 44);
        z-index: 100;
    }
    .item:hover{
        background-color:rgb(56, 140, 0);
        color:white;
    }
    .item:first-child{
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
    .item:last-child{
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        border-bottom: none;
    }
    .admin{
        padding:10px 40px;
        border-radius:15px;
        box-shadow: 0 0 4px red ;
        color:red;
        font-size:18px;
        font-weight: 500;
        margin-left: 50px;
        cursor: pointer;
        text-decoration: none;
    }
    .admin:hover{
        background-color:red;
        color:white;
    }
    .container {
        padding: 0px !important
    }
    .header-top {
        height: 50px;
        max-height: 100px;
        width: 100%;
        border-bottom: rgb(175, 175, 175) solid 1px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        
    }
    .authenticate-user {
        text-align: center;
        
    }
    .authenticate-user a {
        text-decoration: none;
    }
    .logined{
        display:flex;
        align-items: center;
        justify-content:right;
    }
    .login{
        padding:10px 20px;
        background-color: rgb(38, 38, 248);
        border-radius:15px;
        box-shadow: 0 0 2px rgb(17, 0, 255);
        color: white;
        margin-right: 10px;
    }
    .login:hover{
        background-color:rgb(6, 6, 219);
    }
    .register{
        padding:10px 20px;
        background-color: green;
        border-radius:15px;
        box-shadow: 0 0 2px rgb(0, 255, 42);
        color: white;
        margin-left: 10px;
    }
    .register:hover{
        opacity: 0.8;
    }
    .contact{
        box-shadow: 0 0 2px red;
        width:200px;
        display: flex;
        align-items: center;
        justify-content:center;
        padding:5px 0;
        border-radius: 3px;
    }
    .have-not-login{
        display: flex;
        justify-content:right;
        align-items: center;
    }
    .name{
        color: #333;
        font-weight: 400;
        font-size: 18px;
        position: relative;
        cursor: pointer;
        box-shadow: 0 2px 2px #999;
        padding:0 10px;
        border-radius:3px;
    }
    .name:hover .list{
        display:block;
    }
    .logout{
        padding:10px 20px;
        margin-left: 20px;
        border-radius: 6px;
        background:black;
        box-shadow: 0 2px 3px rgb(255, 255, 197);
        font-weight: 400;
        color:white;
        font-weight: 400;
        cursor: pointer;
    }
    .logo img {
        width: 360px;
        height: 60px;
    }
    .v-header {
        max-width: 37.3%;
    }
    .v-search {
        margin-right: 40px;
    }
    .v-booking{
        display: flex;
        align-items: center;
        justify-content:center;
    }
    .notification {
        float: left;
        padding-right: 25px;
    }
    .search-by-keyword{
        position: relative;
    }
    .btnSearch{
        position: absolute;
        top: 0;
        right: 0;
        height:48px;
        width:50px;
        border-radius:3px;
        display: flex;
        align-items: center;
        justify-content:center;
        cursor: pointer;
        text-decoration: none;
    }
</style>