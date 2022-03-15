<template>
  <grid>
    <div class="menu">
      <ul class="menu_list">
        <NuxtLink to='/' class="menu_list_link">
          <li class="menu_list_link_item">TRANG CHỦ</li>
        </NuxtLink >
        <NuxtLink to='' class="menu_list_link">
          <li class="menu_list_link_item">THỂ LOẠI</li>
        </NuxtLink>
        <NuxtLink to='' class="menu_list_link">
          <li class="menu_list_link_item">MƯỢN-TRẢ</li>
        </NuxtLink>
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
<style scoped>
.menu{
  width: 100%;
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
