<template>
    <router-view></router-view>
</template>

<script>
    export default {
        name:"game",
        async created() {
            this.$router.push({ name:'gameindex', query: { id: 123 }})
        }
    }
</script>
<style lang="scss">

</style>