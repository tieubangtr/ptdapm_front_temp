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
                            <div class="have-not-login">
                                <nuxt-link>Logout</nuxt-link>
                            </div>
                            <div class="logined">
                                <nuxt-link to="/login">Đăng nhập</nuxt-link> | <nuxt-link to="/register">Đăng kí</nuxt-link>
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
                            append-icon="search"
                        />
                    </div>
                </v-flex>
                <v-flex class="v-booking">
                    <div class="notification">
                        <v-icon size="35px">notifications</v-icon>
                    </div>
                    <div class="book-borrow-item">
                        <v-icon size="35px">shopping_cart</v-icon>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    data () {
    }
}
</script>

<style lang="scss" scoped>
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
        .authenticate-user {
            text-align: center;
            a {
                text-decoration: none;
                color: black;
            }
        }
    }
    .logo {
        img {
            width: 360px;
            height: 60px;
        }
    }
    .v-header {
        max-width: 37.3%;
    }
    .v-search {
        margin-right: 40px;
    }
    .notification {
        float: left;
        margin-right: 5px;
    }
</style>>
