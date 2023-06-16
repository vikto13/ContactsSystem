<template>
    <div>
        <dialog-box></dialog-box>
        <message></message>
        <router-view>
            <nav-bar> </nav-bar>
        </router-view>
    </div>
</template>

<script>
import NavBar from './components/fields/NavBar.vue'
import DialogBox from './components/fields/DialogBox.vue'
import Message from './components/fields/Message.vue'
import AlertMessage from './components/fields/AlertMessage.vue'

export default {
    components: {
        NavBar,
        DialogBox,
        Message,
        AlertMessage,
    },
}
</script>
