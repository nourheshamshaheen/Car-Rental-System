<template>
  
    <v-hover>
      
      <template v-slot:default="{ hover }">
        <v-card
          dark
          class="ma-4 mt-16 mx-auto"
          max-width="200"
          height="220"
          elevation="15"
        >
          <v-img 
          height="100"
          class="mb-3 mt-1"
          :src="image_url"/>
          <v-card-text class = "ml-1 mb-n9 mt-n4">
            <h2 class="text-h6 ">
              {{type}}
            </h2>
          </v-card-text>
  
          <v-card-title class = "mr-2">
            <v-rating
              :value="rating"
              dense
              half-increments
              color="orange"
              background-color="orange"
              readonly
              class="mr-2"
            ></v-rating>
            <span class="text-subtitle-2">{{price_per_day}}</span>
          </v-card-title>
  
          <v-fade-transition>
            <v-overlay
              v-if="hover"
              absolute
              color="#036358"
            >
            <a><v-btn @click="fillData()" class="p">see more info</v-btn></a>
            
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>
  </template>
  <script>
  export default {
    name:'carInstance',
    props :[
        'image_url',
        'type',
        'rating',
        'price_per_day',
        'city',
        'color',
        'brand',
        'year',
        'description',
        'model_id',
        'address',
        'country',
        'office_id',
        'plate_id',
        'status',
    ],
    data: () => ({
      overlay: false,
      seeMore: false

    }),
  methods:{
    fillData(){
      let car={
        image_url:this.image_url,
        type:this.type,
        rating:this.rating,
        price_per_day:this.price_per_day,
        city:this.city,
        color:this.color,
        brand:this.brand,
        year:this.year,
        description:this.description,
        model_id:this.model_id,
        address:this.address,
        country:this.country,
        office_id:this.office_id,
        plate_id:this.plate_id,
        status:this.status  
      };
      this.$cookies.set("selectedCar",car,0);
      this.$store.dispatch('modifyChosenCar',car);
      this.$router.push({ path: './carPage'});
    }
  }
  }
</script>
<style>
.p{
  color: black;
  text-underline-offset: false;
}
.redirection{
    text-decoration: none;
}
</style>