<template>
    <div class="out">
        <div class="outurl">
            <v-container>
                <div class="url">Trang chủ > Giỏ hàng</div>
            </v-container>
        </div>
        <v-container>
            <div class="header">
                Tạo Phiếu Mượn
            </div>
            <hr/>
            <v-layout row wrap class="x-grid-lg">
                <v-flex lg6 sm12 xs12 class="flexout pa-2">
                    <div class="out">
                        <div class="children">
                            <h3 class="header_text">Thông tin của bạn</h3>
                            <v-text-field 
                                label="Họ tên"
                                v-model="this.getData.name"
                                disabled="disabled"
                            ></v-text-field>
                            <v-text-field 
                                label="Email" 
                                v-model="this.getData.email"
                                disabled="disabled"
                            ></v-text-field>
                            <v-text-field 
                                v-model="this.getData.addr"
                                label="Địa chỉ" 
                                disabled="disabled"
                            ></v-text-field>
                            <span class="note">Hạn trả sách trong vòng 30 ngày*</span>
                            <h3 class="header_text">Thông tin phiếu mượn</h3>
                            <label for="cars">Ngày trả:</label>
                            <select name="payDate" id="payDate">
                                <option value="3">3 ngày</option>
                                <option value="7">7 ngày</option>
                                <option value="14">14 ngày</option>
                                <option value="30">1 tháng</option>
                            </select>
                        </div>
                    </div>
                </v-flex>
                <v-flex lg6 sm12 xs12 class="Book pa-2">
                    <div class="outBook">
                        <h3 class="header_text">Danh sách mượn</h3>
                        <v-layout row wrap class="cartProduct x-grid-lg">
                            <v-flex lg4 sm12 xs12 class="pa-2">
                                <div class="outImg">
                                    <img :src='("https://ptdapmback.herokuapp.com/v1/api/auth/files/"+datas.image)' alt="" class="img">
                                </div>
                            </v-flex>
                            <v-flex lg8 sm12 xs12 class="infoCart pa-2">
                                <h3 class="name">{{name}}</h3>
                                <span class="author">{{author}}</span>
                                <span class="author">ID:{{publisher}}</span>
                                <span class="btnDelete">Xóa sách</span>
                            </v-flex>
                        </v-layout>
                        <div class="Register">
                            <span class="btnRegister" @click="register">Tạo phiếu mượn</span>
                        </div>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import axios from "axios"
export default {
    props:{
        checkRegister:Boolean
    },
    data() {
      return {
        author:'',
        name:'',
        publisher:'',
        datas:[],
        getData:{
            name:'',
            email:JSON.parse(localStorage.getItem('User')).username,
            addr:''
        },
        date:'',
        check:this.checkRegister,
        checkRed:true,
        loading:false,
        form:{
            userId:'',
            borrowingItems: [
                {
                    payday:'',
                    bookId: this.$route.query.bookId,
                    status: false
                }
            ]
        },
      }
    },
    mounted (){
        axios.get(`https://ptdapmback.herokuapp.com/v1/api/books/${this.$route.query.bookId}`)
        .then((res)=>{
            console.log(res.data);
            this.datas=res.data
            this.author=res.data.authors[0].name,
            this.name=res.data.name,
            this.publisher=res.data.publisher.name

            

            axios.get(`https://ptdapmback.herokuapp.com/v1/api/users/${JSON.parse(localStorage.getItem('User')).id}`,{
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('User')).token}`
                }
            })
            .then((res)=>{
                console.log(res.data);
                this.getData.name=res.data.name;
                this.getData.addr=res.data.addr;
            })
            .catch((err)=>{
                console.log(err.response.data);
            })
        })
        .catch((err)=>{
            console.log(err.response.data);
        })
    },
    methods: {
        register(){
            this.check=true
            this.$emit("update-check", this.check);
            this.date=document.getElementById('payDate').value
            this.form.userId=JSON.parse(localStorage.getItem('User')).id
            const apointment= new Date()
            this.date=+this.date
            apointment.setDate(apointment.getDate()+ this.date)
            this.form.borrowingItems[0].payday=apointment.toLocaleDateString('en-CA')
            this.form=JSON.stringify(this.form)
            console.log(this.form);
            axios.post('https://ptdapmback.herokuapp.com/v1/api/borrowings/',this.form,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('User')).token}`,
                }
            })
            .then((err)=>{
                console.log(err.data);
                let myToast = this.$toasted.success("Holla !!");
                myToast.text("Mượn sách thành công").goAway(2000);
            })
            .catch((err)=>{
                console.log(err.response.data);
                let myToast = this.$toasted.error("Holla !!");
                myToast.text("Mượn sách thất bại").goAway(2000);
            })
        }
    }
}
</script>
<style scoped>
select{
    color:red;
    width:100px;
    border-bottom:2px solid black;
    outline: none;
    text-align:center;
}
.option{
    background-color:red;
    text-align:center;
}
.validation{
    color:red;
    font-size:14px;

}
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
    font-size: 25px;
    font-weight: 500;
    color: #333;
    display: flex;
    align-items: center;
}
.out{
    width: 100%;
}
.children{
    width: 80%;
}
.header_text{
    padding: 10px 0;
    font-size: 20px;
    font-weight: 500;
    color: #333;
}
.note{
    color:red;
    font-size:14px;
    margin-top:10px;
}
.register_main_Form_childLeft{
    width: 100%;
    margin-top: 10px;
}
.register_main_Form_child_text{
    display :block;
    text-align: left;
    font-size: 15px;
    font-weight: 300;
    color: rgb(141, 141, 141);
}
.register_main_Form_child_input{
    outline: none;
    width: 100%;
    color: #333;
    font-size: 16px;
    border-bottom: 2px solid #999;
}
.register_main_Form_child_input:focus{
    border-bottom:2.5px solid black;
}
.Book{
    border-left: 1px solid #dfdcdc;
}
.outBook{
    padding: 0 20px;
}
.infoCart{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}.outImg{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.img{
    width: 100%;
    height:150px;
}
.name{
    font-weight: 400;
    color:#333;
    font-size: 18px;
    line-height: 20px;
}
.author{
    display: block;
    color:#777;
    font-size: 14px;
    margin-top: 3px ;
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
.cartProduct{
    margin-top: 20px;
    padding: 10px 0;
    border-bottom: 1px solid rgb(216, 214, 214);
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
}
.btnRegister:hover{
    opacity: 0.9;
}
</style>