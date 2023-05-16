<template>
  <md-card class="container">
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

      <md-menu md-size="big" md-direction="bottom-end">
        <md-menu-content>
          <md-menu-item @click="">
            <span>Call</span>
            <md-icon>phone</md-icon>
          </md-menu-item>

          <md-menu-item @click="">
            <span>Send a message</span>
            <md-icon>message</md-icon>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-card-header>

    <md-card-content>
      <p>Telefono nr:</p>
      <p>El pastas:</p>
      <p>Adresas:</p>
    </md-card-content>

    <!-- 
                        <md-card-actions md-alignment="left">
                            <md-button>Action</md-button>
                            <md-button>Action</md-button>
                        </md-card-actions> -->
  </md-card>
</template>
<script>
export default {};
</script>
