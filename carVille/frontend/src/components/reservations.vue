<template>


    <div class="background" >
    <v-data-table
      dense
      dark
    :headers="reservationHeaders"
    :items="searchResults"
    item-key="name"
    class="elevation-1 mt-16"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>YOUR RESERVATIONS</v-toolbar-title>
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
    <v-btn absolute rounded right dark class="mr-1" @click="back"> BACK</v-btn>
  </v-row>


    </div>
</template> 


<script>

import axios from 'axios';


export default {
    data: () => ({
    searchResults :[],
    reservationHeaders : [
        { text: 'Reservation Number', value: 'reservation_num', sortable:false, align: 'start' ,width: "150px"},
        { text: 'Pick up Date', value: 'pick_up_date', align: 'start' ,width: "150px"},
        { text: 'Return Date', value: 'return_date', align: 'start' ,width: "150px"},
        { text: 'Payment', value: 'payment', sortable:false, align: 'start' ,width: "150px"},
        { text: 'Plate ID', value: 'plate_id', sortable:false, align: 'start' ,width: "150px"},
        { text: 'Brand', value: 'brand' ,width: "150px"},
        { text: 'Type', value: 'type',width: "180px"},
        {text: 'Year', value: 'year',width: "150px"}
      ],



     }),
     
    methods : {
        back() {
            this.$router.push("./browsing");
        }


    },
    created() {
        this.searchResults = [];
        let email = this.$cookies.get('user').email;
        //console.log(this.$cookies.get('user').email);
        axios.post("http://localhost:5000/reservations", {
            email: email
        })
        .then(res => {
            const data = res.data;
            for(let key in data) {
              this.searchResults.push(data[key]);
            }

        }).catch(()=>{
          alert("Something Went Wrong");
        });



    }
}

</script>
<style>
.background {
  background-image: url("/public/images/backgroundimg.png");
  height:100%;
  width:100%;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>