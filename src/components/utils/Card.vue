<template>
    <md-card class="mt-5" md-with-hover>
        <a @click.stop="$emit('cardClicked', id)" class="custom-link">
            <md-ripple>
                <md-card-header>
                    <avatar :imageUrl="imagePath"></avatar>
                    <md-card-header-text>
                        <div class="md-title">{{ title }}</div>
                        <div class="md-subhead">{{ subtitle }}</div>
                    </md-card-header-text>
                </md-card-header>

                <md-card-content>
                    <p v-for="(content, index) in contents" :key="index">
                        {{ content }}
                    </p>
                </md-card-content>
                <div class="mb-4">
                    <md-button
                        v-for="(button, index) in buttons"
                        v-show="button.show"
                        :key="index"
                        class="md-icon-button md-raised ml-3 mb-3"
                        :class="`${button.name}-btn`"
                        @click.stop="
                            $emit('buttonClicked', { button: index, id })
                        "
                    >
                        <md-icon class="text-white">{{ button.name }}</md-icon>
                    </md-button>
                </div>
            </md-ripple>
        </a>
    </md-card>
</template>
<script>
import Avatar from './Avatar.vue'

export default {
    props: {
        title: {
            type: String,
        },
        subtitle: {
            type: String,
        },
        contents: {
            type: Array,
        },
        buttons: {
            type: Array,
        },
        id: {
            type: String,
        },
        imagePath: {
            type: String,
            default: null,
        },
    },
    components: { Avatar },
}
</script>
<style scoped>
a.custom-link {
    color: inherit;
    text-decoration: none;
}
a.custom-link:hover,
a.custom-link:focus {
    color: black !important;
    text-decoration: none !important;
}
</style>
