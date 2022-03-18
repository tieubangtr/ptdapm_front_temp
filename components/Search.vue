<template>
    <div class="out">
        <div class="outurl">
            <v-container>
                <div class="url">Trang chủ > Tìm kiếm</div>
            </v-container>
        </div>
        <v-container>
            <h3 class='header'>Đại số tuyến tính<span class="header_text">(có 10 quyển sách)</span></h3>
            <v-layout row wrap class="books x-grid-lg">
                <!-- v for -->
                <v-flex lg3 sm12 xs12 class="pa-2">
                    <NuxtLink to='' style="text-decoration: none;">
                        <v-card flat tile class="setImg">
                            <div class="imgOut">
                                <img class="imgOut_img" src='/img/sach1.jfif' alt="">
                            </div>
                            <div class="parent">
                                <div class="nameAuthor">Tác giả : Phạm Huy hiệp </div>
                                <div class="nameBook">
                                    đại số tuyến tính
                                </div>
                                <div class="btnAdd" @click="handleCheck">
                                    <v-icon class="btnAdd_icon">shopping_basket</v-icon>
                                    Thêm vào giỏ
                                </div>
                            </div>
                        </v-card>
                    </NuxtLink>
                </v-flex>
                <!-- v-for -->
            </v-layout>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            user:JSON.parse(localStorage.getItem('User')),
            search:this.$route.query.name
        }
    },
    methods: {
        handleCheck() {
            if(!localStorage.getItem('accessToken')){
                window.location.href='/login'
            }
            else{
                alert('thêm hàng thành công')
            }
        },
    }
}
</script>

<style scoped>
.outurl{
    width: 100%;
    border-bottom: 1px solid #999;
}
.url{
    padding: 0;
    font-size: 15px;
    color: #999;
}
.header{
    display: flex;
    align-items:flex-end;
    border-bottom: 1px solid #999;
    font-size: 26px;
    font-weight: 400;
    margin-bottom:10px;
}
.header_text{
    font-size: 14px;
    margin-bottom: 6px;
}
.setImg:hover .imgOut_img{
    transform:scale(1.1);
    transition:all 0.5s ease;
}
.setImg:hover .imgOut{
    overflow:hidden;
}
.setImg:hover{
    box-shadow: 0 0 8px rgb(77, 77, 77);
}
.setImg{
    box-shadow: 0 0 2px #999;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.imgOut{
    margin: 10px 0;
    width: 95%;
    height: 250px;
    display: flex;
    justify-content: center;
    transition:all 0.5s ease;
}
.imgOut_img{
    width: 100%;
}
.parent{
    width: 100%;
    padding:0 20px 10px 20px;
}
.nameAuthor{
    color: #666;
    text-align: center;
    padding:10px 0 0 0;
    border-bottom: 1px solid #999;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    overflow: hidden;
}
.nameBook{
    text-align: center;
    font-size:18px;
    color: #333;
    text-transform: uppercase;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 20px 0;
}
.btnAdd{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:16px;
    padding:10px 0;
    background-image:linear-gradient(45deg,rgb(20, 204, 20),rgb(15, 110, 23));
    border-radius: 4px;
    color:white;
    padding-bottom: 10px
}
.btnAdd:hover{
    opacity: 0.8;
}
.btnAdd_icon{
    color:white;
    margin-right: 5px;
    margin-bottom: 5px;
}
</style>