<template>
  <ul
    class="nav"
    style="
      background-color: #1f3f77;
      flex: 1;
      align-items: center;
      padding: 1% 3% 1% 3%;
    "
  >
    <img
      id="logo-icon"
      src="../assets/teltonika_logo.png"
      style="height: 3rem"
    />

    <li
      v-for="(tab, index) in tabItems"
      :key="index"
      class="nav-item d-flex flex-row"
      style="padding: 1%"
    >
      <a class="nav-link active" href="#" style="color: white">{{ tab }}</a>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      tabItems: [
        "Kontaktai",
        "Kompanijos",
        "Struktūra",
        "Būstinės",
        "Paskyros",
      ],
    };
  },
};
</script>

<style>
@media only screen and (max-width: 860px) {
  #logo-icon {
    display: none;
  }
}
</style>
