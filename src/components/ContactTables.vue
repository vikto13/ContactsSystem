<template>
  <md-table
    v-model="showCards"
    md-sort="name"
    md-sort-order="asc"
    md-card
    md-fixed-header
    class="mt-5 table-footer"
  >
    <md-table-row slot="md-table-row" slot-scope="{ item }" @click="see">
      <md-table-cell md-label="Vardas ir Pavardė" md-sort-by="name">{{
        ` ${item.name} ${item.surname}`
      }}</md-table-cell>
      <md-table-cell md-label="Pozicija" md-sort-by="position">{{
        item.position
      }}</md-table-cell>
      <md-table-cell md-label="Telefono numeris" md-sort-by="phone_number">{{
        item.phone_number
      }}</md-table-cell>
      <md-table-cell md-label="Elektroninis paštas" md-sort-by="address">{{
        item.email
      }}</md-table-cell>
      <md-table-cell md-label="Adresas" md-sort-by="email">{{
        item.email
      }}</md-table-cell>

      <md-table-cell v-if="user.token" md-label="Veiksmas">
        <md-button
          class="md-dense md-raised md-primary edit-btn"
          @click.stop="edit({ button: 0, id: item.id })"
          >Redaguoti</md-button
        >
        <md-button
          class="md-dense md-raised md-primary delete-btn"
          @click.stop="() => edit({ button: 1, id: item.id })"
          >Ištrinti</md-button
        >
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>
<script>
import { mapGetters } from "vuex";
import { ContactsMixin } from "../views/mixins/ContactsMixin";
export default {
  mixins: [ContactsMixin],
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
