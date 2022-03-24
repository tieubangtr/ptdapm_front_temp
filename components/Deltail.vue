<template>
    <v-container>
        <div class="url">Trang chủ > Chi tiết sản phẩm</div>
        <v-layout row wrap class="x-grid-lg">
            <v-flex lg6 sm12 xs12 class="pa-2">
                <div class="outImg">
                    <img :src='("https://ptdapmback.herokuapp.com/v1/api/auth/files/"+datas.image)' alt="ảnh sách" class="Img">
                </div>
            </v-flex>
            <v-flex lg6 sm12 xs12 class="info pa-2">
                <h2 class="name">{{datas.name}}</h2>
                <v-layout row wrap class="x-grid-lg">
                    <v-flex lg4 sm12 xs12 class="pa-2">
                        <span class="author">Tác giả</span>
                        <span class="author">Nhà xuất bản</span>
                        <span class="author">Năm xuất bản</span>
                        <span class="author">ID:{{datas.id}}</span>
                    </v-flex>
                    <v-flex lg8 sm12 xs12 class="pa-2">
                        <span class="content">{{author}}</span>
                        <span class="content">{{publisher}}</span>
                        <span class="content">{{datas.publishAt}}</span>
                    </v-flex>
                </v-layout>
                <div class="btnBorrow">
                    <div class="btn" @click="handleAddcart">Thêm giỏ hàng</div>
                    <div @click="handleBorrow" class="btn successss">Mượn sách</div>
                </div>
                <hr/>
                <v-layout row wrap class="x-grid-lg">
                    <v-flex lg4 sm12 xs12 class="pa-2">
                        <span class="author">Mã hàng</span>
                        <span class="author">Thể loại</span>
                    </v-flex>
                    <v-flex lg8 sm12 xs12 class="pa-2">
                        <span class="content">N/A</span>
                        <span class="content">{{category}}</span>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <div class="tabs">
            <Comment :description="this.datas.content" :bookId="this.datas.id"/>
        </div>
    </v-container>
</template>
<script>
import axios from 'axios'
import Comment from './comments/comments.vue'
export default {
    data(){
        return {
            datas:[],
            auhor:'',
            publisher:'',
            category:'',
            form:{
                bookId:+this.$route.query.bookId,
            }
        }
    },
    mounted (){
        axios.get(`https://ptdapmback.herokuapp.com/v1/api/books/${this.form.bookId}`)
        .then((res)=>{
            console.log(res.data);
            this.datas=res.data
            if(res.data.authors[0]){
                this.author=res.data.authors[0].name
            }
            else{
                this.author='Chưa có tác giả'
            }
            this.category=res.data.category.name
            this.publisher=res.data.publisher.name
            console.log(this.datas);
        })
        .catch((err)=>{
            console.log(err.response.data);
        })
    },
    methods: {
        handleAddcart(){
            if(JSON.parse(localStorage.getItem('User'))){
                const form={
                    bookId:this.$route.query.bookId,
                    cartId:JSON.parse(localStorage.getItem('User')).id
                }
                const forms=JSON.stringify(form)
                axios.post('https://ptdapmback.herokuapp.com/v1/api/cartItems',forms,{
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:`Bearer ${JSON.parse(localStorage.getItem('User')).token}`
                    }
                })
                .then((res)=>{
                    console.log(res.data);
                    let myToast = this.$toasted.success("Holla !!");
                    myToast.text("Thêm sách vào giỏ thành công").goAway(2000);
                })
                .catch((err)=>{
                    console.log(err.response.data);
                    let myToast = this.$toasted.error("Holla !!");
                    myToast.text("Đã tồn tại sách trong giỏ").goAway(2000);
                })
            }
            else{
                this.$router.push('/login')
            }
        },
        handleBorrow(){
            if(JSON.parse(localStorage.getItem('User'))){
               this.$router.push(`/homepage/borrow?bookId=${this.form.bookId}`)
            }
            else{
                this.$router.push('/login')
            }
        }
    },
    components: {
        Comment
    }
}
</script>
<style scoped>
.url{
    margin-bottom:20px;
    font-size:16px;
    color:#888;
}
.outImg {
    width: 100%;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content:center;
}
.Img{
    width:100%;
    height: 100%;
}
.info{
    padding: 20px;
}
.name{
    font-weight: 400;
    text-transform: capitalize;
}
.author{
    color: #999;
    font-size: 15px;
    display:block;
    margin:15px 0;
}
.content{
    color: #333;
    font-size: 15px;
    display:block;
    margin:15px 0;
}
.btnBorrow{
    margin:20px 10px 50px 10px ;
    display: flex;
}
.btn{
    padding:15px 30px;
    background-color: #f5f5f5;
    color: red;
    box-shadow: 0 2px 5px #999;
    font-weight: 600;
    border-radius:3px;
    text-decoration: none;
    margin-right:20px;
    cursor: pointer;
}
.successss{
    background-color: green;
    color:white;
}
.btn:hover{
    opacity: 0.8;
}
</style>