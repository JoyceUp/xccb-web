<template>
<div>loginToken</div>
</template>

<script>
export default {
    layout: 'login',
    name: 'loginToken',
    created(){
        this.$store.commit('login', this.$route.query);
        this.$router.push('/account')
    }
}
</script>

<route-meta>
    {
    "anon": true
    }
</route-meta>