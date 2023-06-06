<template>
    <md-dialog-alert
        v-if="message.isAlert"
        :md-active.sync="message.active"
        :md-title="message.title"
        :md-content="message.content"
        md-confirm-text="Supratau"
    />

    <md-dialog-confirm
        v-else
        :md-active.sync="message.active"
        :md-title="message.title"
        :md-content="message.content"
        md-confirm-text="Taip"
        md-cancel-text="Ne"
        @md-cancel="onCancel"
        @md-confirm="onConfirm"
    />
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['message']),
    },
    methods: {
        async onConfirm() {
            await this.message.action()
        },
        async onCancel() {
            await this.message.cancelAction()
        },
    },
}
</script>

<style>
.md-dialog-content .md-theme-default {
    white-space: pre-line;
}
</style>
