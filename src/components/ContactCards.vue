<template>
  <div class="md-layout md-gutter md-alignment-center" style="margin-top: 2rem">
    <divide-components
      v-for="(contact, index) in contacts"
      :key="index"
      :size-xl="20"
      :size-l="25"
      :size-m="30"
    >
      <card></card>
    </divide-components>
  </div>
</template>
<script>
import Card from "./Card.vue";
import DivideComponents from "./DivideComponents.vue";

export default {
  components: {
    Card,
    DivideComponents,
  },
  data() {
    return {
      contacts: [{}, {}, {}, {}, {}, {}, {}, {}],
    };
  },
};
</script>
