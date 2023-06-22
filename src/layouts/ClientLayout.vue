<template>
    <div>
        <nav-bar> </nav-bar>
        <router-view> </router-view>
    </div>
</template>

<script>
import NavBar from '../components/fields/NavBar.vue'
export default {
    components: {
        NavBar,
    },
}
</script>
