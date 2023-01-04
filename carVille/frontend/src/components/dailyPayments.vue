<template>
  <div class="adminBackgroud"> 
    <div v-if="flag">
    <v-snackbar top timeout="3500" v-model="isInvalidDate" color="error">
      Unable to set, (DATE TO) should be greater than or equal (DATE FROM)
    </v-snackbar>
    <v-row>
      <v-spacer />
      <v-col md="8" class="my-16">
        <v-card round class="rounded-xl ma-16 pa-2" :height="this.$vuetify.breakpoint.height * 0.45">
          <v-toolbar dark rounded height=60px; class="rounded-xl">
            <v-spacer />
            <h2>
              DAILY PAYMENTS
            </h2>
            <v-spacer />
          </v-toolbar>
          <form>
            <v-row class="mt-16 mb-16">
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
            <v-row class="ma-8 ">
              <div>
                <v-btn absolute rounded right dark class= "mt-n8" @click="submit">
                  SHOW RESULTS
                </v-btn>
              </div>
              
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
    class="elevation-1 v-data-table mt-16"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Daily payments</v-toolbar-title>
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
    select2: null,
    dateFromMenu: false,
    dateToMenu: false,
    dateFrom: '',
    dateTo: '',
    flag: true,
    searchResults:[],
    expanded: [],
        singleExpand: false,
        searchHeaders: [
          {
            text: 'Pick up Date',
            align: 'start',
            sortable: true,
            value: 'pick_up_date',
            width: "100px"
          },
          { text: 'Payment', value: 'TOTAL' ,sortable: true,width: "100px"},
        ],

  }),
  mixins: [validationMixin],

  validations: {
    dateFrom: { required},
    dateTo: { required},
  },
  computed: {
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
      if(!this.dateFromErrors.length && !this.dateToErrors.length) {
        this.flag = false;
        this.searchResults = [];
        axios.post("http://localhost:5000/dailyPayments" , {
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
.v-data-table { 
  overflow-x: auto;
}
</style>