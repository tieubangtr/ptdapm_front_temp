<template>
  <div class="form">
      <NuxtLink to="/login" class="sucess">
          <span class="text">Đăng kí thành công. Click vào đây để trở về trang đăng nhập</span>
          <v-icon class="icon">task_alt</v-icon>
      </NuxtLink>
  </div>
</template>

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
    box-shadow: 0 0 4px #999;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
}
.text{
    color:green;
    font-size: 30px;
}
.icon{
    font-size:50px;
    color:green;
}
</style>