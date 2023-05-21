<template>
  <div>
    <slot></slot>
    <div class="container">
      <h5>Sukurti admin paskyrą</h5>
      <field-to-create :text="'Sukurti naują admin paskyrą'" @pressed="triggerDialog('add-admin')">
      </field-to-create>
      <div>
        <md-table
          v-model="users"
          md-sort="name"
          md-sort-order="asc"
          md-card
          md-fixed-header
          style="background-color: #f1f2f4"
        >
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Name" md-sort-by="name">{{
              item.name
            }}</md-table-cell>
            <md-table-cell md-label="Email" md-sort-by="email">{{
              item.email
            }}</md-table-cell>

            <md-table-cell md-label="Veiksmas">
              <md-button
                class="md-dense md-raised md-primary"
                style="
                  background-color: #0054a6 !important;
                  border-radius: 5rem;
                  width: 15rem;
                "
                >Keisti leidimus</md-button
              >
              <md-button
                class="md-dense md-raised md-primary"
                style="
                  background-color: #0054a6 !important;
                  border-radius: 5rem;
                  width: 15rem;
                "
                >Redaguoti</md-button
              >
              <md-button
                class="md-dense md-raised md-primary"
                style="
                  background-color: #a61a11 !important;
                  border-radius: 5rem;
                "
                >Ištrinti</md-button
              >
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import FieldToCreate from "../components/FieldToCreate.vue";
export default {
  components: {
    FieldToCreate,
    },
    methods: {
       ...mapActions(['triggerDialog'])
  },
  data() {
    return {
      users: [
        {
          id: 1,
          name: "Shawna Dubbin",
          email: "sdubbin0@geocities.com",
          gender: "Male",
          title: "Assistant Media Planner",
        },
        {
          id: 2,
          name: "Odette Demageard",
          email: "odemageard1@spotify.com",
          gender: "Female",
          title: "Account Coordinator",
        },
        {
          id: 3,
          name: "Vera Taleworth",
          email: "vtaleworth2@google.ca",
          gender: "Male",
          title: "Community Outreach Specialist",
        },
        {
          id: 4,
          name: "Lonnie Izkovitz",
          email: "lizkovitz3@youtu.be",
          gender: "Female",
          title: "Operator",
        },
        {
          id: 5,
          name: "Thatcher Stave",
          email: "tstave4@reference.com",
          gender: "Male",
          title: "Software Test Engineer III",
        },
        {
          id: 6,
          name: "Karim Chipping",
          email: "kchipping5@scribd.com",
          gender: "Female",
          title: "Safety Technician II",
        },
      ],
    };
  },
};
</script>
<style scoped>
</style>
