<template>
  <div id="pageDashboard">
    <Header/>
    <v-banner>
      <v-img :src="require('../../assets/images/banner.jpeg')" />
    </v-banner>
    <Menu/>
    <BorrowBook :checkRegister="checkRegister" @update-check="updateCheck" />
    <Footter/>
    <div v-if="this.checkRegister" class="background"></div>
    <div v-if="this.checkRegister" class="dialog">
      <div class="main">
        <span class="text">phiếu mượn đang được chờ xác nhận</span>
        <button class="btn" @click="checkRegister=false">Đồng ý</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Menu from '../../components/Menu.vue'
  import BorrowBook from '../../components/BorrowBook.vue'
  import Header from '../../components/header/Header.vue'
  import Footter from '../../components/footter'
  export default {
    components: {
      Menu,
      BorrowBook,
      Header,
      Footter,
    },
    data(){
      return {
        checkRegister:false
      }
    },
    methods: {
      updateCheck(check){
        this.checkRegister =check
      }
    },
  };
</script>
<style scoped>
.background{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #999;
  opacity: 0.3;
}
.dialog{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index:100;
}
.main{
  position: absolute;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0 3px #999;
  left:50%;
  top: 40%;
  transform: translateX(-50%);
  padding:40px 40px 30px 30px;
  display:flex;
  flex-direction: column;
  align-items: center;
}
.text{
  display: block;
  font-size:16px;
  color: #333;
}
.btn{
  margin-top: 10px;
  padding:10px 30px;
  background-color:rgb(19, 153, 19);
  border-radius:3px;
  color: white;
}
.btn:hover{
  opacity: 0.9;
}
</style>
