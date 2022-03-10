<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg6>
          <v-card class="mb-4">
            <v-toolbar color="teal" dark flat dense cad>
              <v-toolbar-title class="subheading">Payment Form with validation</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
              <payment-form></payment-form>
            </v-card-text>
          </v-card>
          <v-card>
            <v-toolbar color="success" dark flat dense cad>
              <v-toolbar-title class="subheading">Ship Form</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
              <shipment-form></shipment-form>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex lg6>
          <v-card
            class="pa-2"
            outlined
            tile
            >
                <v-img src="../static/avatar/avatar.jpg" height="390">
                <v-layout column class="media ma-0">
                    <v-card-title>
                    <v-btn dark icon>
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn dark icon class="mr-3">
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn dark icon>
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title class="white--text pl-5 pt-5">
                    <div class="display-1 pl-5 pt-5">Ali Conners</div>
                    </v-card-title>
                </v-layout>
                </v-img>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import VWidget from '@/components/VWidget';
  import EventForm from '@/components/widgets/form/EventForm';
  import ContactForm from '@/components/widgets/form/ContactForm';
  import PaymentForm from '@/components/widgets/form/PaymentForm';
  import ShipmentForm from '@/components/widgets/form/ShipmentForm';

  export default {
    components: {
      VWidget,
      ContactForm,
      PaymentForm,
      ShipmentForm,
      EventForm
    },
    data() {
      return {};
    },
    computed: {},
    methods: {}
  };
</script>
