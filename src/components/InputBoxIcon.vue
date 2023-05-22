<template>
  <div class="forms-inputs">
    <label v-if="title" class="form-label">{{ title }}</label>
    <div class="input-group" style="width: 100%">
      <span
        v-if="iconName"
        class="input-group-text"
        style="border-right-width: 0; background-color: #f1f2f4"
      >
        <md-icon style="color: #414042">{{ iconName }}</md-icon>
      </span>
      <slot></slot>
    </div>
    <div v-if="bottomText" class="form-text">
      {{ bottomText }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    iconName: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    bottomText: {
      type: String,
      default: null,
    },
  },
};
</script>
