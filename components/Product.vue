<template>
    <div>
        <v-container>
            <div class="listBooks">
                <h2>Sách mới nhất</h2>
                <div class="pagging">
                    <span class="viewAll">Xem tất cả</span>
                    <span class="viewLeft">
                        <v-icon>chevron_left</v-icon>
                    </span>
                    <span class="viewRight">
                        <v-icon>chevron_right</v-icon>
                    </span>
                </div>
            </div>
            <hr>
            <v-layout row wrap class="books x-grid-lg">
                <!-- v for -->
                <v-flex v-for="(data,index) in datas" :key="index" lg3 sm12 xs12 class="pa-2">
                    <v-card flat tile class="product">
                        <div class="setImg" @click="handleDetail(data.id)" >
                            <div class="imgOut">
                                <img class="imgOut_img" :src='("https://ptdapmback.herokuapp.com/v1/api/auth/files/"+data.image)' alt="">
                            </div>
                            <div class="parent">
                                <div class="nameAuthor">Tác giả : {{ data.authors[0].name }} </div>
                                <div class="nameBook">
                                    {{ data.name }}
                                </div>
                            </div>
                        </div>
                        <div class="btn">
                            <div class="btnAdd" @click="handleCheck(data.id)">
                                <v-icon class="btnAdd_icon">shopping_basket</v-icon>
                                Thêm vào giỏ
                            </div>
                        </div>
                    </v-card>
                </v-flex>
                <!-- v-for -->
            </v-layout>
        </v-container>
        <div class="statistical">
            <v-container class="sum">
                <div class="sumBooks">
                    <div class="sumBooks_child">
                        <v-icon class="sumBooks_child_icon">auto_stories</v-icon>
                        <span class="textSum">Tổng số sách</span>
                        <span class="numberSum">1,200</span>
                    </div>
                </div>
                <div class="sumUser">
                    <div class="sumBooks_child">
                        <v-icon class="sumBooks_child_icon">person</v-icon>
                        <span class="textSum">Tổng số người dùng</span>
                        <span class="numberSum">1,500</span>
                    </div>    
                </div>
                <div class="sumCmt">
                    <div class="sumBooks_child">
                        <v-icon class="sumBooks_child_icon">grading</v-icon>
                        <span class="textSum">Bình luận</span>
                        <span class="numberSum">2,200</span>
                    </div>
                </div>
            </v-container>
        </div>
    </div>
</template>
<script>
import axios from "axios"
export default {
    data() {
        return {
            user:JSON.parse(localStorage.getItem('User')),
            datas:[],
        }
    },
    mounted (){
        axios.get('https://ptdapmback.herokuapp.com/v1/api/books?page=0&limit=4&sort=id')
        .then((res)=>{
            this.datas=res.data.content
            console.log(this.datas);
        })
        .catch((err)=>{
            console.log(err.response.data);
        })
    },
    methods: {
        handleDetail(id) {
            this.$router.push(`/homepage/deltail?bookId=${id}`)
        },
        handleCheck(id) {
            if(!localStorage.getItem('accessToken')){
                this.$router.push('/login')
            }
            else{
                const form={
                    bookId:id,
                    cartId:JSON.parse(localStorage.getItem('User')).id
                }
                const forms=JSON.stringify(form)
                axios.post(`https://ptdapmback.herokuapp.com/v1/api/cartItems`,forms,{
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:`Bearer ${JSON.parse(localStorage.getItem('User')).token}`
                    }
                })
                .then((res)=>{
                    console.log(res.data);
                    console.log('ok');
                    let myToast = this.$toasted.success("Holla !!");
                    myToast.text("Thêm thành công").goAway(2000);
                })
                .catch((err)=>{
                    if(err.response.data.apierror.message){
                        let myToast = this.$toasted.error("Holla !!");
                        myToast.text("Sản phẩm đã tồn tại trong giỏ hàng").goAway(2000);
                    }
                })
            }
        },
    }
}
</script>
<style scoped>
.listBooks{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.pagging{
    display: flex;
    align-items: center;
}
.viewAll{
    padding:10px 20px;
    border-radius:20px;
    margin-right: 20px;
    color:green;
    box-shadow:0 2px 4px green;
    cursor: pointer;
}
.viewAll:hover{
    background-color:green;
    color:white;
}
.viewLeft{
    display: flex;
    align-items: center;
    padding:10px;
    border-radius:50%;
    border:1px solid #888;
    margin-right:10px;
    cursor: pointer;
}
.viewLeft:hover{
    background-color:#f5f5f5;
    box-shadow: 0 0 3px green;
}
.viewRight{
    display: flex;
    align-items: center;
    padding:10px;
    border-radius:50%;
    border:1px solid #888;
    cursor: pointer;
}
.viewRight:hover{
    background-color:#f5f5f5;
    box-shadow: 0 0 3px green;
}
.books{
    margin-top: 20px;
}
.setImg:hover .imgOut_img{
    transform:scale(1.1);
    transition:all 0.5s ease;
}
.setImg:hover .imgOut{
    overflow:hidden;
}
.product:hover{
    box-shadow: 0 0 8px rgb(77, 77, 77);
}
.setImg{
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
.product{
    box-shadow: 0 0 2px #999;
}
.imgOut_img{
    width: 100%;
}
.parent{
    width: 100%;
    padding:0 20px 0 20px;
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
.btn{
    display:flex;
    justify-content: center;
    padding-bottom: 10px;
}
.btnAdd{
    cursor: pointer;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:16px;
    padding:10px 0;
    background-image:linear-gradient(45deg,rgb(20, 204, 20),rgb(15, 110, 23));
    border-radius: 4px;
    color:white;
    padding-bottom: 10px;
    z-index: 9;
}
.btnAdd:hover{
    opacity: 0.8;
}
.btnAdd_icon{
    color:white;
    margin-right: 5px;
    margin-bottom: 5px;
}
.statistical{
    width: 100%;
    background-color:#f5f5f5;
    min-height:300px;
    display:flex;
    align-items:center;
    justify-content: center;
}
.sum{
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.sumBooks{
    width: 280px;
    border-radius:3px;
    box-shadow: 0 0 6px #666;
    height: 220px;
    display:flex;
    align-items: center;
    justify-content: center;
    background-color:rgb(0, 174, 255);
}
.sumUser{
    width: 280px;
    border-radius:3px;
    box-shadow: 0 0 6px #666;
    height: 220px;
    display:flex;
    align-items: center;
    justify-content: center;
    background-color:rgb(162, 0, 255);
}
.sumCmt{
    width: 280px;
    border-radius:3px;
    box-shadow: 0 0 6px #666;
    height: 220px;
    display:flex;
    align-items: center;
    justify-content: center;
    background-color:rgb(255, 102, 0);
}
.sumBooks_child{
    width:90%;
    height:90%;
    border: 2px solid white;
    display:flex;
    flex-direction: column;
    align-items: center;justify-content: center;
}
.sumBooks_child_icon{
    font-size:60px;
    color:white;
}
.textSum,.numberSum{
    color:white;
    font-size:18px;
}
</style>