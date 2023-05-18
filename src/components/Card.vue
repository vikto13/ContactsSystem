<template>
  <a style="text-decoration: none" @click="() => $router.push(`/contact/1`)">
    <md-card style="margin-top: 1rem" md-with-hover>
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
            <div class="md-title">VARDAS IR PAVARDE</div>
            <div class="md-subhead">Pozicija: pozicija</div>
          </md-card-header-text>
        </md-card-header>

        <md-card-content>
          <p>Telefono nr:</p>
          <p>El pastas:</p>
          <p>Adresas:</p>
        </md-card-content>

        <div class="mb-4">
          <md-button
            class="md-icon-button md-raised ml-3 mb-3"
            @click=""
            style="background-color: #0054a6 !important"
          >
            <md-icon style="color: #ffffff">edit</md-icon>
          </md-button>

          <md-button
            class="md-icon-button md-raised ml-2"
            @click=""
            style="background-color: #a61a11 !important"
          >
            <md-icon style="color: #ffffff">delete</md-icon>
          </md-button>
        </div>
      </md-ripple>
    </md-card>
  </a>
</template>
<script>
export default {
  methods: {
    clicedCard() {
      console.log("aaaaaaaaa");
    },
  },
};
</script>
