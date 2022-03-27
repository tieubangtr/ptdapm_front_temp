<template>
    <div class="out">
        <div class="outurl">
            <v-container>
                <div class="url">Trang chủ > Tìm kiếm</div>
            </v-container>
        </div>
        <v-container>
            <div v-if="$fetchState.pending"> 
                <p> Book is loading ... </p>
            </div>
            <div v-else class="search-book">
                <h3 class='header'>Kết quả<span class="header_text">(có {{ this.data.content.length }} quyển sách)</span></h3>
                <v-layout row wrap class="books x-grid-lg">
                    <!-- v for -->
                    <v-flex v-for="book in this.data.content" :key="book.id" lg3 sm12 xs12 class="pa-2">
                        <v-card flat tile class="setImg" @click="redirect_to(book.id)">
                            <div class="imgOut">
                                <img class="imgOut_img" :src='book.image' alt="">
                            </div>
                            <div class="parent">
                                <div class="nameAuthor">Tác giả : {{ book.authors.map(e=> e.name).join(', ') }} </div>
                                <div class="nameBook">
                                    {{ book.name }}
                                </div>
                                <div class="btnAdd" @click="handleCheck">
                                    <v-icon class="btnAdd_icon">shopping_basket</v-icon>
                                    Thêm vào giỏ
                                </div>
                            </div>
                        </v-card>
                    </v-flex>
                    <!-- v-for -->
                </v-layout>
            </div>
        </v-container>
    </div>
</template>
<script>
import axios from "axios"
export default {
    data() {
        return {
            user:JSON.parse(localStorage.getItem('User')),
            search: this.$route.query.name,
            data: []
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
        redirect_to(id) {
            this.$router.push(`/homepage/deltail?bookId=${id}`)
        }
    },
    async fetch() {
        await axios ({
            method: 'get',
            url: `https://ptdapmback.herokuapp.com/v1/api/books?page=0&limit=10&sort=-id&filter-value=${this.search}`
        })
        .then(response => {
            this.data = response.data
        })
        .catch(error => {
            console.log(error.data)
        })
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