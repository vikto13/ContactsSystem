<template>
    <div
        class="md-layout-item"
        :class="`md-xsmall-size-${sizeXs} md-small-size-${sizeS} 
   md-medium-size-${sizeM} md-large-size-${sizeL} md-xlarge-size-${sizeXl}`"
    >
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        sizeXs: {
            type: Number,
            default: 100,
        },
        sizeS: {
            type: Number,
            default: 50,
        },
        sizeM: {
            type: Number,
            default: 25,
        },
        sizeL: {
            type: Number,
            default: 20,
        },
        sizeXl: {
            type: Number,
            default: 20,
        },
    },
}
</script>
