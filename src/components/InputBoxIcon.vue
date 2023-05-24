<template>
  <div class="forms-inputs">
    <label v-if="title" class="form-label">{{ title }}</label>
    <div class="input-group" style="width: 100%">
      <span
        v-if="iconName"
        class="input-group-text"
        style="background-color: #f1f2f4"
        :style="{ 'border-color': isNotValid ? '#dc3545' : null }"
      >
        <md-icon style="color: #414042">{{ iconName }}</md-icon>
      </span>
      <slot></slot>
    </div>
    <div
      v-if="bottomText"
      :class="{ 'invalid-feedback': !isNotValid }"
      style="color: #dc3545"
    >
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
    isNotValid: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
