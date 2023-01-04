<template>
  <div>
  <nav>
  <appHeader/>
  <v-snackbar 
              top 
              timeout="3500" 
              v-model="isInvalidDate" 
              color="error">
                  Unable to reserve, (DATE TO) should be greater than or equal (DATE FROM), Both can't be empty
  </v-snackbar>
  <v-snackbar 
              top 
              timeout="3500" 
              v-model="isPastDate" 
              color="error">
                  You can not choose a past date!!
  </v-snackbar>
  <v-card
      dark
      :loading="loading"
      class="mx-auto my-12"
      max-width="80%"
      rounded
  
    >
      <template slot="progress">
        <v-progress-linear
          color="black"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
  
      <v-img mx-auto height="70%" width="70%" class="carImg" :src="this.$cookies.get('selectedCar').image_url"></v-img>
  
      <v-card-title ><h1>{{this.$cookies.get('selectedCar').brand}} </h1> <h1>-</h1> <h1 class="mr-14 mt-20 mb-0 font-weight-light">  {{this.$cookies.get('selectedCar').type}} {{this.$cookies.get('selectedCar').year}}</h1></v-card-title>
      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="this.$cookies.get('selectedCar').rating"
            color="amber"
            dense
            half-increments
            readonly
            size="40"
          ></v-rating>
  
          <div class="grey--text ms-4">
              {{this.$cookies.get('selectedCar').rating}}
          </div>
        </v-row>
  
        <div class="my-4 text-subtitle-1">
          <v-row>
          <v-icon color="orange">{{dollar}} </v-icon>
          <h1>{{this.$cookies.get('selectedCar').price_per_day}}</h1>
          </v-row>
        </div>
  
        <div>{{this.$cookies.get('selectedCar').description}}</div>
      </v-card-text>
  
      <v-divider class="mx-4"></v-divider>
  
      <v-card-title>available dates</v-card-title>
      <v-row>
      <v-col class="ml-4" md="3" cols="6">
                              <v-menu 
                                  
                                  v-model="dateFromMenu" 
                                  :nudge-right="40" 
                                  transition="scale-transition" 
                                  offset-y>
                                      <template 
                                          v-slot:activator="{ on, attrs }">
                                              <v-text-field 
                                                 :color="color"
                                                  v-model="dateFrom" 
                                                  label="Date From"
                                                  prepend-icon="mdi-calendar" 
                                                  readonly 
                                                  v-bind="attrs" 
                                                  v-on="on" 
                                                  clearable>
                                              </v-text-field>
                                      </template>
                                      <v-date-picker 
                                      event-color="red"
                                      :allowed-dates="functionEvents"
                                      :color="color"
                                          v-model="dateFrom" 
                                          @change="checkDateValidity">
                                      </v-date-picker>
                              </v-menu>
                      </v-col>
                      <v-col md="3"
                          cols="6" 
                          >
                              <v-menu 
                                  v-model="dateToMenu" 
                                  :nudge-right="40" 
                                  transition="scale-transition" 
                                  offset-y>
                                      <template 
                                          v-slot:activator="{ on, attrs }">
                                              <v-text-field 
                                              :color="color"
                                                  v-model="dateTo" 
                                                  label="Date To"
                                                  prepend-icon="mdi-calendar" 
                                                  readonly 
                                                  v-bind="attrs" 
                                                  v-on="on" 
                                                  clearable>
                                              </v-text-field>
                                      </template>
                                      <v-date-picker 
                                      event-color="red"
                                      :allowed-dates="functionEvents"
                                          :color="color"
                                          v-model="dateTo" 
                                          @change="checkDateValidity">
                                      </v-date-picker>
                              </v-menu>
                      </v-col>
                  </v-row>
      <v-card-actions>
          <v-btn @click="redirect()"  dark
          text
          class="lg"
          rounded
          color="white"
        >
          Reserve</v-btn>
              
      </v-card-actions>
    </v-card>
  </nav>
  </div>
  </template>
  <script>
  import { mdiArrowLeftThick } from '@mdi/js';
  import { mdiCurrencyUsd } from '@mdi/js';
  import axios from 'axios';
  import { mapGetters } from 'vuex'
  import appHeader from './header.vue';
  export default {
    components:{
      appHeader,
    },
  data: () => ({
      drawer: false,
      arrow: mdiArrowLeftThick,
      dollar: mdiCurrencyUsd,
      dateFromMenu: false,
      dateToMenu: false,
      dateFrom: '',
      dateTo: '',
      loading: false,
      selection: 1,
      color:'',
      isInvalidDate:false,
      isPastDate:false,
      dateFromArr:[],
      dateToArr:[]
  }),
  methods:{
      checkDateValidity() {
              if ((this.dateFrom > this.dateTo) && this.dateFrom && this.dateTo) {
                  this.dateTo = '';
                  this.dateFrom = '';
                  this.isInvalidDate = true;
              }
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              if(new Date(this.dateFrom)<today){
                this.dateFrom = '';
                this.isPastDate=true;
              }
              if(new Date(this.dateTo)<today){
                this.dateTo = '';
                this.isPastDate=true;
              }
          },
      redirect(){
        if(!this.dateFrom || !this.dateTo){
          this.isInvalidDate = true;
        }else{
          this.$cookies.set("date",{
            dateFrom:this.dateFrom,
            dateTo:this.dateTo
          },0);
          this.$router.push("./reserve")
        }
      },
      functionEvents (date) {
        console.log(this.dateFromArr);
        console.log(new Date(this.dateToArr[0]));
        console.log(new Date(date));

        // const [,, day] = date.split('-')
        // if ([12, 17, 28].includes(parseInt(day, 10))) return true
        // if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
        for (let i=0;i<this.dateFromArr.length;i++){
          if(new Date(date)>new Date(this.dateFromArr[i]) && new Date(date).setHours(0,0,0,0)<=new Date(this.dateToArr[i])){
          //console.log("yarab")
          return false;
        }
        }
        return true
      },
    },
  computed: {
          ...mapGetters(['getChosenCarInfo']),
  },
  created(){
    this.color=this.$cookies.get('selectedCar').color
    axios.post("http://localhost:5000/carPage",{
      plate_id:this.$cookies.get('selectedCar').plate_id,
    }).then(res=>{
      //console.log(res.data);
      const data=res.data;
      //console.log(res);
      //this.$store.dispatch('emptyCars');
      // let count=0;
       for(let key in data){
          this.dateFromArr.push(data[key].pick_up_date);
          this.dateToArr.push(data[key].return_date);

      }
    
          
    }
        ).catch(()=>{
          alert("Unable to connect to the server");
        });
  }
  }
  
  </script>
  <style>
  .carImg{
    margin: auto;
    display: block;
  
  }
  </style>