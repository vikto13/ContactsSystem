<template>
  <div class="mb-3" style="display: flex; align-items: center">
    <md-button
      md-menu-trigger
      class="md-icon-button md-raised"
      style="background-color: #0054a6ff !important"
      @click="$emit('pressed')"
    >
      <md-icon style="color: #ffff">add</md-icon>
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
