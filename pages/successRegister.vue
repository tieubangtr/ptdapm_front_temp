<template>
  <div class="form">
      <NuxtLink to="/login" class="sucess">
          <span v-if="success" class="text">Đăng kí thành công. Click vào đây để trở về trang đăng nhập</span>
          <v-icon v-if="success" class="icon">task_alt</v-icon>
          <span v-if="errors" class="texterr">Đăng kí thất bại. Click vào đây để trở về trang đăng nhập</span>
          <v-icon v-if="errors" class="iconerr">dangerous</v-icon>
      </NuxtLink>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            success:false,
            errors:false,
        }
    },
    mounted(){
        axios.get(`http://localhost:8080/v1/api/auth/verify?token=${this.$route.query.token}`)
        .then((res)=>{
            this.success=true
        })
        .catch((err)=>{
            this.errors=true
        })
    }

}
</script>
<style>
.form{
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.sucess{
    padding:40px  100px 25px 100px;
    box-shadow: 0 0 4px rgb(50, 56, 50);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    margin-bottom: 100px;
    border-radius: 10px;
}
.text{
    color:green;
    font-size: 30px;
}
.texterr{
    color:red;
    font-size: 30px;
}
.icon{
    font-size:50px;
    color:green !important;
}
.iconerr{
    font-size:50px;
    color:red !important;
}
</style>