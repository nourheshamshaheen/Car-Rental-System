<template>
  <div class="adminBackgroud">
    <div v-if="flag">
    <v-row>
      <v-spacer />
      <v-col md="8" class="my-16">
        <v-card round class="rounded-xl ma-16 pa-2" :height="this.$vuetify.breakpoint.height * 0.4">
          <v-toolbar dark rounded height=60px; class="rounded-xl">
            <v-spacer />
            <h2>
              CARS' STATUS
            </h2>
            <v-spacer />
          </v-toolbar>
          <form>
            <v-col class="mt-8">
              <v-menu v-model="dateMenu" :nudge-right="40" transition="scale-transition" offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field color="#353434" v-model="date" label="Date" prepend-icon="mdi-calendar" readonly
                    v-bind="attrs" v-on="on" clearable :error-messages="dateErrors" required
                      @blur="$v.date.$touch()">
                  </v-text-field>
                </template>
                <v-date-picker color="#353434" v-model="date">
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="mt-n2">
              <v-btn absolute rounded right dark class="mr-1" @click="submit">
                  SHOW RESULTS
                </v-btn>
            </v-col>
          </form>
        </v-card>
      </v-col>
      <v-spacer />
    </v-row> 
  </div>
  <div v-if="!flag">
    <v-text-field
          dark
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
    <v-data-table
    dark
    :headers="searchHeaders"
    :items="searchResults"
    :search="search"
    item-key="name"
    class="elevation-1 mt-16"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cars' status</v-toolbar-title>
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
import axios from 'axios'
export default {
  data: () => ({
    dateMenu: false,
    date: '',
    searchResults:[],
    flag: true,
    expanded: [],
        singleExpand: false,
        search: '',
        searchHeaders: [
          {
            text: 'Plate ID',
            align: 'start',
            sortable: false,
            value: 'plate_id',
            width: "150px",
          },
          { text: 'Status', value: 'status' ,width: "150px"},
          
        ],

  }),
  mixins: [validationMixin],

  validations: {
    date: { required},
  },
  computed: {
    dateErrors() {
      const errors = []
      if (!this.$v.date.$dirty) return errors
      !this.$v.date.required && errors.push("Date can't be empty")
      return errors
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      if(!this.dateErrors.length) {
        this.searchResults = [];
        axios.post("http://localhost:5000/carStatus" , {
            date: this.date,
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