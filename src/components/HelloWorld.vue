<template>
  <p>{{ msg }}</p>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    message: {
      type: String,
      default: "World",
    },
  },
  data() {
    return {
      msg: this.message,
    };
  },
};
</script>