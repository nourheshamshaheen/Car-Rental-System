<template>
  <div class="adminBackgroud">
    <div v-if="flag">
    <v-snackbar top timeout="3500" v-model="isInvalidDate" color="error">
      Unable to set, (DATE TO) should be greater than or equal (DATE FROM)
    </v-snackbar>
    <v-row>
      <v-spacer />
      <v-col md="8" class="my-16">
        <v-card round class="rounded-xl ma-16 pa-1" :height="this.$vuetify.breakpoint.height * 0.60">
          <v-toolbar dark rounded height=60px; class="rounded-xl">
            <v-spacer />
            <h3>
              RESERVATIONS OF A CAR WITHIN IN A SPECIFIC PERIOD
            </h3>
            <v-spacer />
          </v-toolbar>
          <form>
            <v-row>
              <v-spacer />
              <v-col md="5" class="mt-8 ml-6">
                <v-text-field v-model="plate_id" :error-messages="plate_idErrors" label="Plate Id" required
                  @blur="$v.plate_id.$touch()"></v-text-field>
              </v-col>
              <v-spacer />
            </v-row>
            <v-row class="mt-6 mb-16">
              <v-col class="ml-1 mr-2">
                <v-menu v-model="dateFromMenu" :nudge-right="40" transition="scale-transition" offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field color="#353434" v-model="dateFrom" label="Date From" prepend-icon="mdi-calendar"
                      readonly v-bind="attrs" v-on="on" clearable :error-messages="dateFromErrors" required
                      @blur="$v.dateFrom.$touch()">
                    </v-text-field>
                  </template>
                  <v-date-picker color="#353434" v-model="dateFrom" @change="checkDateValidity">
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col class="mr-4">
                <v-menu v-model="dateToMenu" :nudge-right="40" transition="scale-transition" offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field color="#353434" v-model="dateTo" label="Date To" prepend-icon="mdi-calendar" readonly
                      v-bind="attrs" v-on="on" clearable :error-messages="dateToErrors" required
                      @blur="$v.dateTo.$touch()">
                    </v-text-field>
                  </template>
                  <v-date-picker color="#353434" v-model="dateTo" @change="checkDateValidity">
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row class="ma-16">
              <v-btn absolute rounded right dark @click="submit">
                SHOW RESULTS
              </v-btn>
            </v-row>
          </form>
        </v-card>
      </v-col>
      <v-spacer />
    </v-row>
  </div>
  <div v-if="!flag"> 
    <v-data-table
    dark
    :headers="searchHeaders"
    :items="searchResults"
    item-key="name"
    class="elevation-1 mt-16"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Reserved car info</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        More info about {{ item.name }}
      </td>
    </template>
  </v-data-table>
  <v-row class="mt-10"> 
    <v-btn absolute rounded right dark class="mr-1" @click="flag=!flag"> SEARCH AGAIN</v-btn>
  </v-row>

  </div>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios';
export default {
  data: () => ({
    isInvalidDate: false,
    dateFromMenu: false,
    dateToMenu: false,
    dateFrom: '',
    dateTo: '',
    plate_id: '',
    flag: true,
    searchResults:[],
    expanded: [],
        singleExpand: false,
        searchHeaders: [
          {
            text: 'Plate ID',
            align: 'start',
            sortable: false,
            value: 'plate_id',
            width: "150px"
          },
          { text: 'Price Per Day', value: 'price_per_day',sortable: true,width: "150px" },
          { text: 'Color', value: 'color' ,sortable: false,width: "150px"},
          { text: 'Description', value: 'description' ,sortable: false,width: "150px"},
          { text: 'Status', value: 'status' ,sortable: false,width: "150px"},
          { text: 'Brand', value: 'brand' ,sortable: false,width: "150px"},
          { text: 'Type', value: 'type' ,sortable: false,width: "150px"},
          { text: 'Year', value: 'year' ,sortable: true,width: "150px"},
          { text: 'Address', value: 'address' ,sortable: false,width: "150px"},
          { text: 'City', value: 'city' ,sortable: true,width: "150px"},
          { text: 'Country', value: 'country' ,sortable: true,width: "150px"},
          { text: 'User ID', value: 'user_id' ,sortable: true,width: "150px"},
          { text: 'Pick Up Date', value: 'pick_up_date' ,sortable: true,width: "150px"},
          { text: 'Return Date', value: 'return_date', sortable: true,width: "150px"},
          { text: 'Reservation Number', value: 'reservation_num' ,sortable: true,width: "170px"},
          { text: 'Payment', value: 'payment' ,sortable: false,width: "150px"},
        ],


  }),
  mixins: [validationMixin],

  validations: {
    dateFrom: { required},
    dateTo: { required},
    plate_id: {required}
  },
  computed: {
    plate_idErrors(){
      const errors = []
      if (!this.$v.plate_id.$dirty) return errors
      !this.$v.plate_id.required && errors.push("plate_id from can't be empty")
      return errors
    },
    dateFromErrors() {
      const errors = []
      if (!this.$v.dateFrom.$dirty) return errors
      !this.$v.dateFrom.required && errors.push("Date from can't be empty")
      return errors
    },
    dateToErrors() {
      const errors = []
      if (!this.$v.dateTo.$dirty) return errors
      !this.$v.dateTo.required && errors.push("Date to can't be empty")
      return errors
    },
  },


  methods: {
    checkDateValidity() {
      if ((this.dateFrom > this.dateTo) && this.dateFrom && this.dateTo) {
        this.dateTo = '';
        this.dateFrom = '';
        this.isInvalidDate = true;
      }
    },
    submit() {
      this.$v.$touch();
      if(!this.dateToErrors.length && !this.dateFromErrors.length && !this.plate_idErrors.length) {
        this.searchResults = [];
        axios.post("http://localhost:5000/reservedCar" , {
            plate_id: this.plate_id,
            date_from: this.dateFrom,
            date_to: this.dateTo
        }).then(res => {
            this.flag = false;
            const data = res.data;
            console.log(data);
            for(let key in data) {
              console.log(data[key]);
              this.searchResults.push(data[key]);
            }

        }).catch(()=>{
          alert("Something Went Wrong");
        });
      }
    }
    },
  }
  
</script>
<style>
.adminBackgroud {
  background-color: #582B9C;
  height: 100%;
  width: 100%;

}
</style>