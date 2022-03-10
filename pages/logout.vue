<template>
    <h1>Log out</h1>
</template>
<script>
export default {
    methods:{
        logout() {
            this.$auth.logout();
        }
    }
}
</script>