<template>
  <div class="forms-inputs">
    <label v-if="title" class="form-label">{{ title }}</label>
    <div class="input-group w-100">
      <span
        v-if="iconName"
        class="input-group-text table-footer"
        :style="{ 'border-color': isNotValid ? '#dc3545' : null }"
      >
        <md-icon style="color: #414042">{{ iconName }}</md-icon>
      </span>
      <slot></slot>
    </div>
    <div style="color: #dc3545" :style="{ opacity: isNotValid ? 1 : 0 }">
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
