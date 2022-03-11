<template>
    
</template>

<script>
    export default {
        mounted()
        {
          if(!localStorage.getItem('accsetToken')){
            this.$router.push('/login')
          }
          else{
            this.$router.push('/dashboard')
          }
        }
    }
</script>

<style scoped>

</style>
