<template>
  <div>
    <slot></slot>
    <h1>Įmonės</h1>

    <div class="column">
      <md-button
        md-menu-trigger
        class="md-icon-button md-raised"
        style="background-color: #0054a6ff !important"
      >
        <md-icon style="color: #ffff">add</md-icon>
      </md-button>
      <p>Pridėti naują įmonę</p>
    </div>
  </div>
</template>
<script>
export default {};
</script>
