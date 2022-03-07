<template>
  <v-container>
    <!-- <v-row no-gutters>
        <v-col
            cols="12"
            sm="6"
            md="12"
        > -->
            <form @submit.prevent="handleSearch">
                <div class="form_search">
                    <div class="form_search_parent">
                        <input v-model="formSearch.sort" class="form_search_parent_input" placeholder="Nhập thông tin sách cần tìm kiếm">
                        <button type="submit" class="form_search_parent_btn">
                            <v-icon class="form_search_parent_icon">
                            search
                            </v-icon>
                        </button>
                    </div>
                </div>
            </form>
            <table id="customers">
                <tr>
                    <th>STT</th>
                    <th>Mã ND</th>
                    <th>Họ tên</th>
                    <th>Giới tính</th>
                    <th>Địa chỉ</th>
                    <th>Mật khẩu</th>
                    <th>SĐT</th>
                    <th>Email</th>
                    <th>Ảnh đại diện</th>
                    <th>Thao tác</th>
                </tr>
                <tr v-for="(data,index) in dataUser" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{data.id}}</td>
                    <td>{{data.name}}</td>
                    <td>{{data.gender}}</td>
                    <td>{{data.addr}}</td>
                    <td>
                        <span class="table_pass">{{data.password}}</span>
                    </td>
                    <td>{{data.phone}}</td>
                    <td>{{data.email}}</td>
                    <td><img class="table_img" :src="data.img"/></td>
                    <td>
                        <span @click="handleModal(data.id,data.name)" class="table_delete">Xóa</span>
                    </td>
                </tr>
            </table>
            <div class="parentPagging">
                <div class="parentPagging_pagging">
                    <span class="parentPagging_pagging_icon"><v-icon>keyboard_arrow_left</v-icon></span>
                    <span class="parentPagging_pagging_numberPage" @click="searchPage(page)" v-for="(page) in dataPage" :key="page">{{page}}</span>
                    <span class="parentPagging_pagging_icon"><v-icon>keyboard_arrow_right</v-icon></span>
                </div>
            </div>
            <div v-if="modal" class="background"></div>
            <div v-if="modal" @click="modal=false" class="modal">
                <div class="modal_main">
                    <div class="modal_main_text">Bạn có chắc chắn muốn xóa {{this.delete.name}}?</div>
                    <div class="modal_main_btn">
                        <button @click="modal=false" class="modal_main_btn_back">Hủy</button>
                        <button @click="handleDelete" class="modal_main_btn_delete">Xóa</button>
                    </div>
                </div>
            </div>
        <!-- </v-col>
    </v-row> -->
  </v-container>
</template>
<script>
import axios from 'axios'
// import '../../assets/scss/user.scss'
export default {
  name: 'user',
  layout: 'dashboard',
  data () {
    return {
      dataUser: [],
      dataPage:[],
      modal: false,
      delete: {
        id: '',
        name: ''
      },
      form:{
        page: 2,
        limit: 5,
        sort: 'id',
      },
      formSearch:{
        page: 0,
        limit: 5,
        sort: '',
      }
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    handleModal (id, name) {
      this.delete.id = id
      this.delete.name = name
      this.modal = true
    },
    async handleDelete () {
      try {
        await axios.delete('https://ptdapmback.herokuapp.com/v1/api/users',this.delete.id)
        this.data.splice(1, this.data.index)
      }
      catch (error) {
        console.log(error)
      }
    },
    async getUser () {
      this.form.Authorization
      const { data } = await axios.get('https://ptdapmback.herokuapp.com/v1/api/users',this.form)
      this.dataUser = data[0].content
      this.handlePage(data[9].number)
    },
    async handleSearch(){
        const {data} = await axios.post('http://localhost:3000/',this.formSearch)
        this.dataUser=data
    },
    handlePage(page){
        for(let i=1;i<=page;i++){
            this.dataPage.push(i)
        }
    },
    // async searchPage(number){

    // }
  }
}
</script>
<style scoped>
.form_search{
    width: 100%;
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Open Sans', sans-serif;
    font-family: 'Roboto', sans-serif;
}
.form_search_parent{
    width:60%;
    height:55px;
    display: flex;
    align-items: center;
}
.form_search_parent_input{
    height:100%;
    border: 3px solid rgb(220, 220, 220);
    padding-left: 20px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    width:85%;
    outline:none;
    border-right: none;
    
}
.form_search_parent_input:focus{
        border: 3px solid blue;
    }
.form_search_parent_btn{
    border-left: none;
    height:100%;
    background-color: blue;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    width: 15%;
    
}
.form_parent:hover{
    opacity: 0.9;
}
.form_search_parent_icon{
    color: white !important;
}
.background{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color:#999;
    opacity: 0.3;
}
.modal{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    
}
.modal_main{
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    border-radius: 4px;
    box-shadow:  0 0 5px #999;
    padding:35px 40px 20px 40px;
    animation: translateModal 0.5s ease-in-out;
    
}
.modal_main_text{
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 18px;
}
.modal_main_btn{
    padding-top: 20px;
    display:flex;
    justify-content:right;
    border-top: 2px solid #999;
    
}
.modal_main_btn_back{
    background-color: rgb(255, 251, 245);
    border-radius: 3px;
    padding:6px 20px;
    margin-right: 10px;
    box-shadow: 0 2px 3px rgb(204, 204, 204);
}
.modal_main_btn_delete{
    background-color: rgb(223, 0, 0);
    border-radius: 3px;
    color: white;
    margin-right: 10px;
    padding:6px 20px;
    box-shadow: 0 2px 3px rgb(204, 204, 204);
}
.table_img{
    width:60px;
    height:60px;
    object-fit: cover;
    border-radius: 2px;
}
.table_delete{
    padding:10px 20px;
    background-color: blue;
    border-radius: 3px;
    color:white;
    cursor: pointer;
}
.table_pass{
    display:-webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    width:50px;
}
.parentPagging{
    width: 100%;
    display:flex;
    justify-content: center;
    margin-top: 50px;
    
}
.parentPagging_pagging{
    display: flex;
    cursor: pointer;
    
}
.parentPagging_pagging_numberPage{
    border-radius: 3px;
    padding: 5px 20px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 6px rgb(179, 179, 179);
    margin:0 10px;
    font-size: 15px;
}
.parentPagging_pagging_numberPage:focus{
    background-color:blue;
    color:white;
}
.parentPagging_pagging_numberPage:hover{
        background-color: #dfdfdf;
    }
.parentPagging_pagging_icon{
    border-radius: 3px;
    padding: 10px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 6px rgb(179, 179, 179);
    margin:0 10px;
    font-size: 15px;
    
}
.parentPagging_pagging_icon:hover{
        background-color: #cacaca;
    }
#customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  #customers td, #customers th {
    padding: 8px;
    text-align: center;
    font-size: 14px;
  }
  
  #customers tr:nth-child(even){background-color: #f2f2f2;}
  
  #customers tr:hover {background-color: #ddd;}
  
  #customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    font-weight: 500;
    background-color: rgb(61, 61, 230);
    color:white;
  }
@keyframes translateModal{
    from{
        top:38%;
        opacity: 0.9;
    }
    to{
        top:35%;
        opacity: 1;
    }
}
</style>