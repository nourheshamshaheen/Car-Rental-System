<template>
    <div class="adminBackgroud" > 
      <div v-if="flag">
      <v-snackbar top timeout="3500" v-model="checkSelection" dark>
        Note: you should select 1 (OR MORE) fields to search in it
      </v-snackbar>
      <v-snackbar top timeout="3500" v-model="selectError" color="error">
        Note: CANNOT SEARCH USING CUSTOMER AND CAR 
      </v-snackbar>
        <v-row>
          <v-spacer/>
            <v-col md="4"
              class="my-16">
              <v-card 
                round 
                class="rounded-xl ma-2 pa-2"
                :height="this.$vuetify.breakpoint.height*0.60"
                >
                <v-toolbar
                  dark 
                  rounded 
                  class="toolBar rounded-xl">
                  <v-spacer />
                  <h1 class="header">
                    SEARCH
                  </h1>
                  <v-spacer />
                  </v-toolbar>
                  <v-row class="mt-5 mr-5 ml-5">
     <v-col class="ml-4">
     <v-checkbox 
      v-model="car"
      label="Car"
    ></v-checkbox>
    <v-checkbox 
      v-model="customer"
      label="Customer"
    ></v-checkbox>
    <v-checkbox
      v-model="reservation"
      label="Reservation"
    ></v-checkbox>
  </v-col >
</v-row>
<v-row class="ml-14 mt-8">
  <v-col md="8">
    <v-spacer></v-spacer>
  </v-col>
  <v-col md="2" class="ml-2">
  <v-btn dark  @click="submit">
                    <v-icon>{{ magnify }}</v-icon>
                  </v-btn>
  </v-col>
  </v-row>
  </v-card>
            </v-col>
          <v-spacer/>
        </v-row>  
      </div>

        <div v-if="!flag && car && !reservation && !customer"> 

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
      dense
    :headers="carHeaders"
    :items="searchResults"
    :search="search"
    item-key="name"
    class="elevation-1 mt-16"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cars' table</v-toolbar-title>
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

  <div v-if="!flag && !car && !reservation && customer"> 
    <v-text-field
          dark
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      <v-data-table
      dense
      dark
    :headers="customerHeaders"
    :items="searchResults"
    :search="search"
    item-key="name"
    class="elevation-1 mt-16"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Customers' table</v-toolbar-title>
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

  <div v-if="!flag && !car && reservation && !customer"> 
    <v-text-field
          dark
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      <v-data-table
      dense
      dark
    :headers="reservationHeaders"
    :items="searchResults"
    :search="search"
    item-key="name"
    class="elevation-1 mt-16"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>reservations' table</v-toolbar-title>
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

  <div v-if="!flag && car && reservation && !customer"> 
    <v-text-field
          dark
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      <v-data-table
      dense
      dark
    :headers="carReservationHeaders"
    :items="searchResults"
    :search="search"
    item-key="name"
    class="elevation-1 mt-16"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Car reservations' table</v-toolbar-title>
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

  <div v-if="!flag && !car && reservation && customer"> 
    <v-text-field
          dark
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      <v-data-table
      dense
      dark
    :headers="customerReservationHeaders"
    :items="searchResults"
    :search="search"
    item-key="name"
    class="elevation-1 mt-16"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Customers/reservations table</v-toolbar-title>
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

  <div v-if="!flag && car && reservation && customer"> 
    <v-text-field
          dark
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      <v-data-table
      dense
      dark
    :headers="ccrHeaders"
    :items="searchResults"
    :search="search"
    item-key="name"
    class="elevation-1 mt-16"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Customers/reservations/cars table</v-toolbar-title>
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
    <v-btn absolute rounded right dark class="mr-1" @click="toggle()"> SEARCH AGAIN</v-btn>
  </v-row>
  </div>
    </div>
</template>
<script>
import { mdiMagnify } from '@mdi/js';
import axios from 'axios';
export default {
    data: () => ({
    car: false,
    customer:false,
    reservation:false,
    magnify: mdiMagnify,
    selected:false,
    search:'',
    flag: true,
    selectError : false,
    searchResults:[],
    expanded: [],
        singleExpand: false,
        customerHeaders: [ 
        { text: 'User ID', value: 'user_id', sortable:true, align: 'start' ,width: "150px"},
        { text: 'First name', value: 'fname', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Last name', value: 'lname', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Email', value: 'email', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Gender', value: 'gender', sortable:false, align: 'start' ,width: "150px"},
        { text: 'Date of Birth', value: 'dob', align: 'start' ,width: "150px"},

        ],
        carHeaders: [
          { text: 'Plate ID', value: 'plate_id', sortable:false, align: 'start' ,width: "150px"},
          { text: 'Price Per Day', value: 'price_per_day', sortable:true ,width: "150px"},
          { text: 'Color', value: 'color' , sortable:false ,width: "150px"},
          { text: 'Brand', value: 'brand', sortable:false ,width: "150px"},
          { text: 'Type', value: 'type', sortable:false,width: "180px"},
          {text: 'Year', value: 'year', sortable:true,width: "150px"},
          { text: 'Description', value: 'description', sortable:false ,width: "350px"},
          { text: 'Address', value: 'address' , sortable:false,width: "150px"},
          { text: 'City', value: 'city', sortable:true ,width: "150px"},
          { text: 'Country', value: 'country', sortable:true ,width: "170px"},
          { text: 'Status', value: 'status' , sortable:false,width: "170px"},
          { text: 'Rating', value: 'rating' , sortable:true,width: "180px"},
        ], 
        reservationHeaders : [
        { text: 'Reservation Number', value: 'reservation_num', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Pick up Date', value: 'pick_up_date', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Return Date', value: 'return_date', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Payment', value: 'payment', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Plate ID', value: 'plate_id', sortable:false, align: 'start' ,width: "150px"},
        { text: 'User ID', value: 'user_id', sortable:true, align: 'start' ,width: "150px"},
      ],
      carReservationHeaders: [
        { text: 'Reservation Number', value: 'reservation_num', sortable:true, align: 'start' ,width: "150px"},
        { text: 'User ID', value: 'user_id', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Pick up Date', value: 'pick_up_date', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Return Date', value: 'return_date', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Payment', value: 'payment', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Plate ID', value: 'plate_id', sortable:false, align: 'start' ,width: "150px"},
        { text: 'Price Per Day', value: 'price_per_day',sortable:true ,width: "150px"},
        { text: 'Color', value: 'color' ,sortable:false,width: "150px"},
        { text: 'Brand', value: 'brand' ,sortable:false,width: "150px"},
        { text: 'Type', value: 'type',sortable:false,width: "180px"},
        { text: 'Year', value: 'year',sortable:true,width: "150px"},
        { text: 'Description', value: 'description' ,sortable:false,width: "350px"},
        { text: 'Address', value: 'address' ,sortable:false,width: "150px"},
        { text: 'City', value: 'city' ,sortable:true,width: "150px"},
        { text: 'Country', value: 'country' ,sortable:true,width: "170px"},
        { text: 'Status', value: 'status' ,sortable:false,width: "170px"},
        { text: 'Rating', value: 'rating' ,sortable:true,width: "180px"},
      ],

      customerReservationHeaders: [
        { text: 'Reservation Number', value: 'reservation_num', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Pick up Date', value: 'pick_up_date', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Return Date', value: 'return_date', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Payment', value: 'payment', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Plate ID', value: 'plate_id', sortable:false, align: 'start' ,width: "150px"},
        { text: 'User ID', value: 'user_id', sortable:true, align: 'start' ,width: "150px"},
        { text: 'First name', value: 'fname', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Last name', value: 'lname', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Email', value: 'email', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Gender', value: 'gender', sortable:false, align: 'start' ,width: "150px"},
        { text: 'Date of Birth', value: 'dob', sortable:true, align: 'start' ,width: "150px"},

      ],

      ccrHeaders: [
        { text: 'Reservation Number', value: 'reservation_num', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Pick up Date', value: 'pick_up_date', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Return Date', value: 'return_date', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Payment', value: 'payment', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Plate ID', value: 'plate_id', sortable:false, align: 'start' ,width: "150px"},
        { text: 'Price Per Day', value: 'price_per_day' , sortable:false,width: "150px"},
        { text: 'Color', value: 'color' , sortable:false,width: "150px"},
        { text: 'Brand', value: 'brand' , sortable:false,width: "150px"},
        { text: 'Type', value: 'type', sortable:false,width: "180px"},
        {text: 'Year', value: 'year', sortable:true,width: "150px"},
        { text: 'Description', value: 'description' , sortable:false,width: "350px"},
        { text: 'Address', value: 'address' , sortable:false,width: "150px"},
        { text: 'City', value: 'city' ,width: "150px"},
        { text: 'Country', value: 'country' ,width: "170px"},
        { text: 'Status', value: 'status' , sortable:false,width: "170px"},
        { text: 'Rating', value: 'rating' ,width: "180px"},
        { text: 'User ID', value: 'user_id', sortable:true, align: 'start' ,width: "150px"},
        { text: 'First name', value: 'fname', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Last name', value: 'lname', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Email', value: 'email', sortable:true, align: 'start' ,width: "150px"},
        { text: 'Gender', value: 'gender', sortable:false, align: 'start' ,width: "150px"},
        { text: 'Date of Birth', value: 'dob', sortable:true, align: 'start' ,width: "150px"},

    

      ]


    }),
    computed:{
      checkSelection(){
        if(!this.car && !this.customer && !this.reservation){
          return true;
        }
        else{
          return false;
        }
      }
    }, 
    methods: {
    submit() {
          if(this.car && this.customer && !this.reservation) {
            this.selectError = true;
          }
          else {
            this.flag = false;
            this.searchResults = [];
        axios.post("http://localhost:5000/advancedSearch" , {
            customer: this.customer,
            car: this.car,
            reservations: this.reservation
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
        //     const data = res.data;
        //     console.log(data);
        //     for(let key in data) {
        //       //console.log(data[key]);
        //       this.searchResults.push(data[key]);
        //     }

        // })
      },
      toggle(){
        this.flag=!this.flag;
        this.selectError=false;
      }
      }
    }
</script>