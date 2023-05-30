<template>
  <a style="text-decoration: none" @click="$emit('cardClicked', id)">
    <md-card class="mt-1" md-with-hover>
      <md-ripple>
        <md-card-header>
          <md-avatar>
            <svg
              class="h-12 w-12 text-brown-300"
              viewBox="0 0 24 24"
              fill="#F1F2F4"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clip-rule="evenodd"
              />
            </svg>
          </md-avatar>

          <md-card-header-text>
            <div class="md-title">{{ title }}</div>
            <div class="md-subhead">{{ subtitle }}</div>
          </md-card-header-text>
        </md-card-header>

        <md-card-content>
          <p v-for="(content, index) in contents" :key="index">{{ content }}</p>
        </md-card-content>

        <div v-show="user.token" class="mb-4">
          <md-button
            v-for="(button, index) in buttons"
            :key="index"
            class="md-icon-button md-raised ml-3 mb-3"
            :class="`${button}-btn`"
            @click.stop="$emit('buttonClicked', { button: index, id })"
          >
            <md-icon class="text-white">{{ button }}</md-icon>
          </md-button>
        </div>
      </md-ripple>
    </md-card>
  </a>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user"]),
  },
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
  },
};
</script>
<style scoped>

</style>
