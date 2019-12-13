<template>
<div id="app">
    <router-view />
</div>
</template>

<script>
export default {
    created() {
        window.addEventListener("beforeunload", () => {
            localStorage.setItem("VueStore", JSON.stringify(this.$store.state))
        })
    }
}
</script>

<style>
@import "styles/css.css";
</style>