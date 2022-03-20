<template>
    <div class="out">
        <div class="outurl">
            <v-container>
                <div class="url">Trang chủ > Giỏ hàng</div>
            </v-container>
        </div>
        <v-container>
            <div class="header">
                <!-- Giỏ sách <span class="headertext">(có {{total_book_item()}} quyển sách trong giỏ hàng của bạn)</span> -->
            </div>
            <hr/>
            <span class="note">Đảm bảo số lượng sách, mỗi độc giả mượn tối thiểu mỗi quyển 1 loại *</span>
            <!-- for -->
            <v-layout v-for="(data,index) in datas" :key="index" row wrap class="cartProduct x-grid-lg">
                <v-flex lg2 sm12 xs12 class="pa-2">
                    <div class="outImg">
                        <img :src='("https://ptdapmback.herokuapp.com/v1/api/auth/files/"+data.book.image)' alt="ảnh Sách" class="img">
                    </div>
                </v-flex>
                <v-flex lg10 sm12 xs12 class="infoCart pa-2">
                    <h3 class="name">{{data.book.name}}</h3>
                    <span class="author">{{data.book.authors[0].name}}</span>
                    <span class="author">ID:{{data.id}}</span>
                    <span class="btnDelete" @click="handleDelete(data.id,index)">Xóa sách</span>
                </v-flex>
            </v-layout>
            <!-- for -->
            <div class="Register">
                <nuxt-link :to="homepage/borrow">
                    <v-btn class="btnRegister">Tạo phiếu mượn</v-btn>
                </nuxt-link>
            </div>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            getData:{
                page:0,
                limit:4,
                sort:'id'
            },
            datas:[],
            // token:JSON.parse(localStorage.getItem('User')).token,
            // user: JSON.parse(localStorage.getItem('User'))
        }
    },
    mounted (){
        // this.getData=JSON.stringify(this.getData)
        if(JSON.parse(localStorage.getItem('User'))){
            axios.get(`https://ptdapmback.herokuapp.com/v1/api/carts?page=0&limit=5&sort=id&filter-field=user.id&filter-operator=EQUALS&filter-value=${this.form.userId}`,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('User')).token}`,
                }
            })
            .then((res)=>{
                if(res.data.content[0].cartItems){
                    this.datas=res.data.content[0].cartItems
                }
                console.log(this.datas);
                console.log(res.data);
            })
            .catch((err)=>{
                console.log(err.response.data);
            })
        }
        else{
            this.$router.push('/login')
        }
    },
    methods:{
        handleDelete(id,index){
            axios.delete(`https://ptdapmback.herokuapp.com/v1/api/cartItems/${id}`,{
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then((res)=>{
                console.log(res);
                let myToast = this.$toasted.success("Holla !!");
                myToast.text("Xóa sản phẩm thành công").goAway(2000);
                console.log(index);
                this.datas.splice(index,1)
            })
            .catch((err)=>{
                console.log(err.response.data);
                let myToast = this.$toasted.error("Holla !!");
                myToast.text("Xóa sản phẩm thất bại").goAway(2000);
            })
        }
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
    padding: 10px 0;
    font-size: 20px;
    font-weight: 500;
    color: #333;
    display: flex;
    align-items: center;
}
.headertext{
    font-size:14px;
    color: #777;
    font-weight: 400;
    margin-left: 5px;
}
.note{
    margin-top: 10px;
    color: red;
    font-size:14px;
    display:block;
}
.cartProduct{
    margin-top: 20px;
    padding: 10px 0;
    border-bottom: 1px solid rgb(216, 214, 214);
}
.outImg{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.img{
    width: 100%;
    height:180px;
}
.name{
    font-weight: 500;
    color:#333;
}
.author{
    display: block;
    color:#777;
    font-size: 16px;
    margin-top:5px;
}
.btnDelete{
    width:150px;
    padding:10px 0;
    text-align: center;
    margin-top:10px;
    box-shadow: 0 0 3px #999;
    color:red;
    font-weight: 500;
    border-radius: 3px;
    cursor: pointer;
}
.btnDelete:hover{
    background-color:rgb(216, 14, 14);
    color:white;
}
.infoCart{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.Register{
    display: flex;
    margin: 20px 0;
    justify-content:right;
}
.btnRegister{
    padding:14px 25px;   
    text-align: center;
    box-shadow: 0 0 3px #999;
    color:white;
    background-color:green;
    font-weight: 500;
    border-radius: 3px;
    cursor: pointer;
    text-decoration: none;
}
.btnRegister:hover{
    opacity: 0.9;
}
</style>