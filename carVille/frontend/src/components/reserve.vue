<template >
  <div class="background">
    <v-snackbar 
            top 
            timeout="3500" 
            v-model="isInvalidDate" 
            color="error">
                Date taken, please choose a valid date
        </v-snackbar>
    <v-row>
      <v-spacer />
      <v-col md="8" class="my-16">
        <v-card round class="rounded-xl ma-16 pa-2">
          <v-toolbar rounded class="rounded-xl">
            <v-spacer />
            <h1 class="header">
              <center>RESERVE</center>
            </h1><v-spacer />
          </v-toolbar>
          <form>
            <v-row class="ma-6">
              <v-container fluid>
                <v-radio-group v-model="radios">
                  <template v-slot:label>
                    <div>
                      <h2>Payement method:</h2>
                    </div>
                  </template>
                  <v-radio value="Google">
                    <template v-slot:label>
                      <div>
                        <h3>visa</h3>
                      </div>
                    </template>
                  </v-radio>
                  <v-radio value="pay">
                    <template v-slot:label>
                      <div>
                        <h3>cash on pickup</h3>
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-container>
              <v-text-field label="card no:" required @blur="$v.cardNo.$touch()"></v-text-field>
            </v-row>
            <v-row class="ma-6">
              <v-text-field label="promocode:" hint="please use a valid promocode if you have one" v-model="promo"></v-text-field>
            </v-row>

            <v-row class="ma-10">
              <v-btn color="black" rounded dark absolute right class="mr-4 " @click="submit">
                confirm reservation
              </v-btn>
            </v-row>
          </form>
        </v-card>
      </v-col>
      <v-spacer />
    </v-row>
  </div>
</template>


<script>

import axios from 'axios';
import { mapGetters } from 'vuex'

export default {

  data: () => ({
    cardNo: '',
    radios: 'pay',
    promo:'',
    isInvalidDate:false
  }),


  methods: {
    submit() {
      //this.$v.$touch()
      let found=this.getPromos.includes(this.promo)
      console.log(found);
      axios.post("http://localhost:5000/reserve", {
        plate_id: this.$cookies.get("selectedCar").plate_id,
        date_from: this.$cookies.get("date").dateFrom,
        date_to: this.$cookies.get("date").dateTo,
        email: this.$cookies.get("user").email,
        validPromo:found
      }).then(res => {
        console.log(res);
        if (res.data == "Success!") {
          if(found){
            this.$cookies.set("price",this.$cookies.get("selectedCar").price_per_day*0.9,0)
          }else{
            this.$cookies.set("price",this.$cookies.get("selectedCar").price_per_day,0)
          }
          this.$router.replace("/receipt")
        }else if(res.data !="Date taken"){
          this.isInvalidDate=true;
        }
      }).catch(()=>{
          alert("Something Went Wrong");
        });

    }

  },
  computed: {
        ...mapGetters(['getPromos']),
},

}
</script>
<style>
.background {
  background-image: url("/public/images/backgroundimg.png");
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}

.toolBar {
  background-color: lightgray;
}

.header {
  text-align: center;
}
</style>