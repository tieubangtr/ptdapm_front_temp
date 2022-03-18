<template>
    <div class="header-root">
        <div class="header-top">
            <v-container>
                <v-layout row>
                    <v-flex>
                        <div class="contact">
                            <v-icon size="18px">email</v-icon><span style="pading: 2px">tlu@e.edu.tlu.vn</span>
                        </div>
                    </v-flex>
                    <v-flex>
                        <div class="authenticate-user">
                            <div v-if="this.user" class="have-not-login" @click="handleLogout">
                                {{ this.user.username }} - 
                                Logout
                            </div>
                            <div v-if="!this.user" class="logined">
                                <NuxtLink to="/login">Đăng nhập</NuxtLink> | <NuxtLink to="/register">Đăng kí</NuxtLink>
                            </div>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <v-container>
            <v-layout row>
                <v-flex class="v-header">
                    <div class="logo">
                        <img class="imgOut_img" src='../../assets/images/logo.png' alt="">
                    </div>
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
                        <NuxtLink style="text-decoration: none;" to="/homepage/cart">
                            <v-icon size="35px">shopping_cart</v-icon>
                        </NuxtLink>
                    </div>
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
            searchForm:''
        }
    },
    methods: {
        handleLogout () {
            localStorage.clear()
            this.$router.push('/login')
        },
    }
}
</script>

<style scoped>
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
        color: black;
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