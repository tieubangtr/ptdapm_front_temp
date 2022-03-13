<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <h1>Xin chào, chúc bạn một ngày mới tốt lành</h1>
    </v-container>
  </div>
</template>

<script>
  export default {
    layout: 'dashboard',
    mounted()
        {
          if(!localStorage.getItem('accessToken')){
            this.$router.push('/login')
          }
          else{
            this.$router.push('/dashboard')
          }
        },
  };
</script>
