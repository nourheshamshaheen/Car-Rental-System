<template>
    <v-row>
      <v-snackbar 
            top 
            timeout="3500" 
            v-model="isInvalidDate" 
            color="error">
                Unable to set, (DATE TO) should be greater than or equal (DATE FROM)
        </v-snackbar>
      <v-dialog
        backgroud-color="grey"
        rounded-xl
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
          >
          <v-icon class="filterButton">mdi-filter</v-icon>
          </v-btn>
        </template>
        <v-card class="rounded-xl">
          <v-card-title>
            <span class="text-h5">Filtration</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="year"
                    color="black"
                    label="Model year"
                    hint="available car models range from 2000 to 2023"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                <v-autocomplete
                    color="black"
                    :items="this.getModels"
                    v-model="brands"
                    label="Car model"
                    multiple
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12"
                >
                <v-slider
                    track-color="grey"
                    color="black"
                    v-model="minPrice"
                    :max="10000"
                    label="Min price"
                    class="align-center"
                >
                    <template v-slot:append>
                        <v-text-field
                            color="black"
                            v-model="minPrice"
                            class="mt-0 pt-0"
                            type="number"
                            style="width: 60px"
                        ></v-text-field>
                    </template>
                </v-slider>
                </v-col>
                <v-col cols="12"
                >
                <v-slider
              track-color="grey"
              color="black"
              v-model="maxPrice"
              :max="10000"
              label="Max price"
              class="align-center"
            >
              <template v-slot:append>
                <v-text-field
                  v-model="maxPrice"
                  class="mt-0 pt-0"
                  type="number"
                  color="black" 
                  style="width: 60px"
                ></v-text-field>
              </template>
            </v-slider >
                </v-col>
                <v-col cols="6">
                  <v-text-field
                  v-model="color"
                    color="black" 
                    label="Color"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="6"
                >
                <v-autocomplete
                    v-model="offices"
                    color="black"
                    :items="office"
                    label="Office location"
                    multiple
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
            <small>*If you do not select any field all cars will be returned</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="black"
              dark
              rounded
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="black"
              dark
              rounded
              @click="filter()"
            >
              Search
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios';
export default {
  data: () => ({
    offices:[],
    color:'',
    year:'',
    brands:[],
    dialog: false,
    dateFromMenu: false,
    dateToMenu: false,
    dateFrom: '',
    dateTo: '',
    minPrice:0,
    maxPrice:10000,
    office: [
      '6 Batlaimous Street, Sidi Gaber, Alexandria, Egypt',
      '31 Nile Street, Sheikh Zayed, Cairo, Egypt',
      '54 Rue de Fleurs, 3e Arrondissement, Paris, France',
      '34 Lionel Messi Street, Buenos Aires, Argentina',
      '66 Zeftawy Street, Montreal, Canada',
      '42 Wallaby Way, Sydney, Australia',
      '20 Cooper Square, New York, USA',
      '738 Frederick Street, Louisville, USA',
      '88 Lara Street, Beirut, Lebanon',
      '70 Casa de Papel Street, Barcelona, Spain',
    ],
  }),
  methods:{
    checkDateValidity() {
            if ((this.dateFrom > this.dateTo) && this.dateFrom && this.dateTo) {
                this.dateTo = '';
                this.dateFrom = '';
                this.isInvalidDate = true;
            }
        },
    filter(){
      console.log(this.brands);
      console.log(this.offices);
      this.dialog=false;
      axios.post("http://localhost:5000/browsing",{
        color:this.color,
        brands:this.brands,
        year:this.year,
        price_down:this.minPrice,
        price_up:this.maxPrice,
        address:this.offices
      }).then(res=>{
        const data=res.data;
        console.log(res.data);
        this.$store.dispatch('emptyCars');
        for(let key in data){
          this.$store.dispatch('addCar',data[key]);
        }
      }).catch(()=>{
          alert("Something Went Wrong");
        });
    }
  },
  computed: {
    ...mapGetters(['getModels']),
  }
  
}
</script>
<style>

</style>