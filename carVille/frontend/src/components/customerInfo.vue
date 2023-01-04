<template>
  <div class="adminBackgroud"> 
  <div v-if="flag">
    <v-snackbar top timeout="3500" v-model="isInvalidDate" color="error">
      Unable to set, (DATE TO) should be greater than or equal (DATE FROM)
    </v-snackbar>
    <v-row>
      <v-spacer />
      <v-col md="8" class="my-16">
        <v-card round class="rounded-xl ma-16 pa-2" :height="this.$vuetify.breakpoint.height * 0.60">
          <v-toolbar dark rounded height=60px; class="rounded-xl">
            <v-spacer />
            <h3>
              CUSTOMER'S RESERVATIONS 
            </h3>
            <v-spacer />
          </v-toolbar>
          <form>
            <v-spacer />
            <v-col md="5" class="mt-8">
              <v-text-field v-model="user_id" :error-messages="user_idErrors" label="User Id" required
                @blur="$v.user_id.$touch()"></v-text-field>
            </v-col>
            <v-spacer />
            <v-row class="mt-6 mb-10">

              <v-col class="ml-1 mr-2">
                
              </v-col>
              <v-col class="mr-4">
                
              </v-col>
            </v-row>
            <v-row class="ma-10 mb-16">
              <div>
                <v-btn absolute rounded right dark class="mt-n5" @click="submit">
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
    class="elevation-1 mt-16"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Customer's reservations</v-toolbar-title>
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
    user_id: '',
    flag:true,
    searchResults:[],
    expanded: [],
        singleExpand: false,
        searchHeaders: [
        { text: 'First Name', value: 'fname', sortable:true, align: 'start' ,width: "150px"},
          { text: 'Last Name', value: 'lname' , sortable:true,width: "150px"},
          { text: 'E-mail', value: 'email' , sortable:true,width: "150px"},
          { text: 'Gender', value: 'gender' , sortable:false,width: "150px"},
          { text: 'Date Of Birth', value: 'dob', sortable:true,width: "180px"},
          {
            text: 'Plate ID', value: 'plate_id', sortable:false,width: "150px"},
          { text: 'Brand', value: 'brand', sortable:false ,width: "150px"},
          { text: 'Type', value: 'type' , sortable:false,width: "150px"},
          { text: 'Year', value: 'year' , sortable:true,width: "150px"},
          { text: 'Pick Up Date', value: 'pick_up_date' , sortable:true,width: "170px"},
          { text: 'Return Date', value: 'return_date' , sortable:true,width: "170px"},
          { text: 'Reservation Number', value: 'reservation_num' , sortable:true,width: "180px"},
          { text: 'Payment', value: 'payment', sortable:true ,width: "150px"},
        ],

  }),
  mixins: [validationMixin],

  validations: {
    dateFrom: { required },
    dateTo: { required },
    user_id: { required }
  },
  computed: {
    user_idErrors() {
      const errors = []
      if (!this.$v.user_id.$dirty) return errors
      !this.$v.user_id.required && errors.push("User ID can't be empty")
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
      if(!this.user_idErrors.length) {
        this.searchResults=[];
        axios.post("http://localhost:5000/customerInfo" , {
            user_id:this.user_id
        }).then(res => {
            this.flag = false;
            const data = res.data;
            console.log(data);
            for(let key in data) {
              //console.log(data[key]);
              this.searchResults.push(data[key]);
            }

        }).catch(()=>{
          alert("Something Went Wrong");
        });
      }
      }
    }
  }

</script>
<style>
.adminBackgroud {
  background-color: #582B9C;
  height: 100%;
  width: 100%;

}
</style>