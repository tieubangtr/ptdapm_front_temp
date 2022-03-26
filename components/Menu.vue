<template>
  <grid>
    <div class="menu">
      <ul class="menu_list">
        <NuxtLink to='/' class="menu_list_link">
          <li class="menu_list_link_item">TRANG CHỦ</li>
        </NuxtLink >
        <NuxtLink to='' class="menu_list_link category">
          <li class="menu_list_link_item">THỂ LOẠI</li>
          <div class="category_list">
            <v-container>
              <v-layout row wrap>
                <v-flex lg3 class="category_item" v-for="(cate,index) in category" :key="index">
                  {{ cate.name }}
                </v-flex>
              </v-layout>
            </v-container>
          </div>
        </NuxtLink>
        <div @click="handlePayment" to='/homepage/payment' class="menu_list_link">
          <li class="menu_list_link_item">MƯỢN-TRẢ</li>
        </div>
        <NuxtLink to='' class="menu_list_link">
          <li class="menu_list_link_item">GIỚI THIỆU</li>
        </NuxtLink>
        <NuxtLink to='' class="menu_list_link">
          <li class="menu_list_link_item">LIÊN HỆ</li>
        </NuxtLink>
      </ul>
    </div>
  </grid>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return {
      category:[]
    }
  },
  mounted () {
    var config = {
      method: "get",
      url:
          `https://ptdapmback.herokuapp.com/v1/api/categories?page=0&limit=100&sort=id`
    };
    axios(config)
    .then((res)=>{
      this.category=res.data.content
    })
    .catch((err)=>{
        console.log(err.response.data);
    })
  },
  methods:{
    handlePayment(){
      if(JSON.parse(localStorage.getItem('User'))){
        this.$router.push('/homepage/payment')
      }
      else{
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style scoped>
.category{
  cursor: pointer;
}
.category_list{
  display: none;
  position: absolute;
  left:0;
  right:0;
  top: 100%;
  box-shadow: 0 2px 5px #999;
  background-color:white;
  z-index: 100;
}
.category:hover .category_list{
  display: block;
}
.category_item{
  color: #333;
  padding:20px 0;
  font-size:16px;
  font-weight: 500;
  text-align: center;
}
.category_item:hover{
  background-color:#f5f5f5;
  color:red;
}
.menu{
  width: 100%;
  position: relative;
}
.menu_list{
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.menu_list_link{
  text-decoration:none;
  width: 25%;
}
.menu_list_link_item{
  width: 100%;
  background-color:#78CA46;
  list-style: none;
  padding: 20px 0;
  text-align: center;
  color:white;
}
.menu_list_link_item:hover{
  background-color:#56a326;
}
</style>
