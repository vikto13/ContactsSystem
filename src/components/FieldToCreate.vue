<template>
  <div class="mb-3" style="display: flex; align-items: center">
    <md-button
      md-menu-trigger
      class="md-icon-button md-raised btn"
      @click="$emit('pressed')"
    >
      <md-icon class="text-white">add</md-icon>
    </md-button>
    {{ text }}
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
    },
  },
};
</script>
