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
                                v-model="form.name"
                                @focus="check.name=''"
                            ></v-text-field>
                            <div class="validation">{{this.check.name}}</div>
                            <v-text-field 
                                v-model="form.email"
                                label="Email" 
                                @focus="check.email=''"
                            ></v-text-field>
                            <div class="validation">{{this.check.email}}</div>
                            <v-text-field 
                                v-model="form.addr"
                                label="Địa chỉ" 
                                @focus="check.addr=''"
                            ></v-text-field>
                            <div class="validation">{{this.check.addr}}</div>
                            <span class="note">Hạn trả sách trong vòng 30 ngày*</span>
                            <h3 class="header_text">Thông tin phiếu mượn</h3>
                            <v-text-field 
                                v-model="form.code"
                                label="Mã phiếu mượn"
                                @focus="check.code=''"
                            ></v-text-field>
                            <div class="validation">{{this.check.code}}</div>
                            <div class="register_main_Form_childLeft">
                                <span class="register_main_Form_child_text">Ngày mượn</span>
                                <input type="date" class="register_main_Form_child_input" v-model="form.createDate" @focus="check.createDate=''"/>
                                <div class="validation">{{this.check.createDate}}</div>
                            </div>
                            <div class="register_main_Form_childLeft">
                                <span class="register_main_Form_child_text">Ngày trả</span>
                                <input type="date" class="register_main_Form_child_input" v-model="form.payDate" @focus="check.payDate=''"/>
                                <div class="validation">{{this.check.payDate}}</div>
                            </div>
                        </div>
                    </div>
                </v-flex>
                <v-flex lg6 sm12 xs12 class="Book pa-2">
                    <div class="outBook">
                        <h3 class="header_text">Danh sách mượn</h3>
                        <v-layout row wrap class="cartProduct x-grid-lg">
                            <v-flex lg4 sm12 xs12 class="pa-2">
                                <div class="outImg">
                                    <img src="/img/sach1.jfif" alt="" class="img">
                                </div>
                            </v-flex>
                            <v-flex lg8 sm12 xs12 class="infoCart pa-2">
                                <h3 class="name">Hướng dẫn đẹp trai lên một cách lạ thường</h3>
                                <span class="author">Khá Bách</span>
                                <span class="author">ID:S1319714</span>
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
export default {
    props:{
        checkRegister:Boolean
    },
    data() {
      return {
        check:this.checkRegister,
        checkRed:true,
        loading:false,
          form:{
              name:'',
              email:'',
              addr:'',
              code:'',
              createDate:'',
              payDate:'',
          },
          check:{
              name:'',
              email:'',
              addr:'',
              code:'',
              createDate:'',
              payDate:'',
          }
      }
    },
    methods: {
        validate(){
            this.check={
                name:'',
                email:'',
                addr:'',
                code:'',
                createDate:'',
                payDate:'',
            }
            if(!this.isEmail(this.form.email)){
                this.check.email='Dòng này phải là email'
                this.loading=false
            }
            if(!this.form.name){
                this.check.name='Vui lòng nhập dòng này'
                this.loading=false
            }
            if(!this.form.addr){
                this.check.addr='Vui lòng nhập dòng này'
                this.loading=false
            }
            if(!this.form.code){
                this.check.code='Vui lòng nhập dòng này'
                this.loading=false
            }
            if(!this.form.createDate){
                this.check.createDate='Vui lòng nhập dòng này'
                this.loading=false
            }
            if(!this.form.payDate){
                this.check.payDate='Vui lòng nhập dòng này'
                this.loading=false
            }
        },
        isEmail(email){
            return email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        },
        register(){
            // this.validate()
            this.check=true
            this.$emit("update-check", this.check);
        }
    }
}
</script>
<style scoped>
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