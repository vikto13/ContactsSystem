<template>
    <div class="md-layout md-gutter md-alignment-center h-100">
        <md-button
            class="md-icon-button md-raised position-absolute back-icon"
            @click="$router.push(goBackPath)"
        >
            <md-icon style="color: #1f3f77">reply</md-icon>
        </md-button>
    </div>
</template>
<script>
export default {
    props: {
        goBackPath: {
            type: String,
        },
    },
}
</script>
