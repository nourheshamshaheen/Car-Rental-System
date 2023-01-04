<template>
  <div>
    <appHeader/>
    <div  v-for='(row, index) in makeRows' :key="index">
      <v-row>
        <CarInstance v-for='(car, i) in row' :key="i" :type="car.type" :image_url="car.image_url" :rating="car.rating"
          :price_per_day="car.price_per_day" :city="car.city" :color="car.color" :brand="car.brand" :year="car.year" :description="car.description"
          :model_id="car.model_id" :address="car.address" :country="car.country" :office_id="car.office_id" :plate_id="car.plate_id" :status="car.status"/> 
      </v-row>
    </div>
  </div>
</template>
  


<script>
import axios from 'axios';
import CarInstance from './carInstance.vue';
import appHeader from './header.vue';
import { mapGetters } from 'vuex'
//import VueCookies from 'vue-cookies'
export default {
  components: {
    CarInstance,
    appHeader,
  },
  data: () => ({
    /*fakeData: [
      { carName: 'Mitsubishi', model: 'Puma', rating: 5, imageUrl: 'https://i.pinimg.com/originals/91/06/02/910602979bda92b9f88144d313f52725.png ', pricePerDay: '5000', location: 'Alexandria',color:'red',year:'2008',desc:'very very cool car.Zeftawy, the king himself drives it.' },
      { carName: 'Mercedes', model: 'c180', rating: 4.5, imageUrl: 'https://purepng.com/public/uploads/large/purepng.com-blue-porsche-cayman-gt4-carcarvehicletransportporsche-96152466239247bg9.png ', pricePerDay: '2000', location: 'Alexandria',color:'blue',year:'2016',desc:'fancy car,automatic.seating : 5 seats.' },
      { carName: 'Kia', model: 'sportage', rating: 4, imageUrl: 'https://purepng.com/public/uploads/large/purepng.com-white-volkswagen-beetlecarvehicletransportautocars-561521125132do9g5.png ', pricePerDay: '3000', location: 'Cairo',color:'#F8EDE3',year:'2022',desc:'power driver seat.recommended for families.' },
      { carName: 'Hyundai', model: 'elentra', rating: 5, imageUrl: 'https://purepng.com/public/uploads/large/mercedes-car-eqc-300kw-edition-ytq.png ', pricePerDay: '4000', location: 'Tanta',color:'#434242',year:'2010',desc:'roadside assistance for the duration of the certified pre-owned limited warranty.' },
      { carName: 'Kia', model: 'sportage', rating: 4, imageUrl: 'https://purepng.com/public/uploads/large/purepng.com-white-volkswagen-beetlecarvehicletransportautocars-561521125132do9g5.png ', pricePerDay: '3000', location: 'Cairo',color:'#F8EDE3',year:'2022',desc:'power driver seat.recommended for families.' },
      { carName: 'Hyundai', model: 'elentra', rating: 5, imageUrl: 'https://purepng.com/public/uploads/large/mercedes-car-eqc-300kw-edition-ytq.png ', pricePerDay: '4000', location: 'Tanta',color:'#434242',year:'2010',desc:'roadside assistance for the duration of the certified pre-owned limited warranty.' },
      { carName: 'Mitsubishi', model: 'Puma', rating: 5, imageUrl: 'https://i.pinimg.com/originals/91/06/02/910602979bda92b9f88144d313f52725.png ', pricePerDay: '5000', location: 'Alexandria',color:'red',year:'2008',desc:'very very cool car.Zeftawy, the king himself drives it.' },
      { carName: 'Mercedes', model: 'c180', rating: 4.5, imageUrl: 'https://purepng.com/public/uploads/large/purepng.com-blue-porsche-cayman-gt4-carcarvehicletransportporsche-96152466239247bg9.png ', pricePerDay: '2000', location: 'Alexandria',color:'blue',year:'2016',desc:'fancy car,automatic.seating : 5 seats.' },
      { carName: 'Kia', model: 'sportage', rating: 4, imageUrl: 'https://purepng.com/public/uploads/large/purepng.com-white-volkswagen-beetlecarvehicletransportautocars-561521125132do9g5.png ', pricePerDay: '3000', location: 'Cairo',color:'#F8EDE3',year:'2022',desc:'power driver seat.recommended for families.' },
      { carName: 'Hyundai', model: 'elentra', rating: 5, imageUrl: 'https://purepng.com/public/uploads/large/mercedes-car-eqc-300kw-edition-ytq.png ', pricePerDay: '4000', location: 'Tanta',color:'#434242',year:'2010',desc:'roadside assistance for the duration of the certified pre-owned limited warranty.' },
      { carName: 'Kia', model: 'sportage', rating: 4, imageUrl: 'https://purepng.com/public/uploads/large/purepng.com-white-volkswagen-beetlecarvehicletransportautocars-561521125132do9g5.png ', pricePerDay: '3000', location: 'Cairo',color:'#F8EDE3',year:'2022',desc:'power driver seat.recommended for families.' },
      { carName: 'Hyundai', model: 'elentra', rating: 5, imageUrl: 'https://purepng.com/public/uploads/large/mercedes-car-eqc-300kw-edition-ytq.png ', pricePerDay: '4000', location: 'Tanta',color:'#434242',year:'2010',desc:'roadside assistance for the duration of the certified pre-owned limited warranty.' },
      { carName: 'Mitsubishi', model: 'Puma', rating: 5, imageUrl: 'https://i.pinimg.com/originals/91/06/02/910602979bda92b9f88144d313f52725.png ', pricePerDay: '5000', location: 'Alexandria',color:'red',year:'2008',desc:'very very cool car.Zeftawy, the king himself drives it.' },
      { carName: 'Mercedes', model: 'c180', rating: 4.5, imageUrl: 'https://purepng.com/public/uploads/large/purepng.com-blue-porsche-cayman-gt4-carcarvehicletransportporsche-96152466239247bg9.png ', pricePerDay: '2000', location: 'Alexandria',color:'blue',year:'2016',desc:'fancy car,automatic.seating : 5 seats.' },
      { carName: 'Kia', model: 'sportage', rating: 4, imageUrl: 'https://purepng.com/public/uploads/large/purepng.com-white-volkswagen-beetlecarvehicletransportautocars-561521125132do9g5.png ', pricePerDay: '3000', location: 'Cairo',color:'#F8EDE3',year:'2022',desc:'power driver seat.recommended for families.' },
      { carName: 'Hyundai', model: 'elentra', rating: 5, imageUrl: 'https://purepng.com/public/uploads/large/mercedes-car-eqc-300kw-edition-ytq.png ', pricePerDay: '4000', location: 'Tanta',color:'#434242',year:'2010',desc:'roadside assistance for the duration of the certified pre-owned limited warranty.' },
      { carName: 'Kia', model: 'sportage', rating: 4, imageUrl: 'https://purepng.com/public/uploads/large/purepng.com-white-volkswagen-beetlecarvehicletransportautocars-561521125132do9g5.png ', pricePerDay: '3000', location: 'Cairo',color:'#F8EDE3',year:'2022',desc:'power driver seat.recommended for families.' },
      { carName: 'Hyundai', model: 'elentra', rating: 5, imageUrl: 'https://purepng.com/public/uploads/large/mercedes-car-eqc-300kw-edition-ytq.png ', pricePerDay: '4000', location: 'Tanta',color:'#434242',year:'2010',desc:'roadside assistance for the duration of the certified pre-owned limited warranty.' },
   
    ],*/
    rowSize: 6,


  }),
  computed: {
    ...mapGetters(['getCars']),
    makeRows() {
      let row = [];
      let i, l, chunkSize = this.rowSize;

      for (i = 0, l = this.getCars.length; i < l; i += chunkSize) {
        row.push(this.getCars.slice(i, i + chunkSize));

      }
      return row;
    },
    
  },
  created(){
     
    axios.get("http://localhost:5000/browsing").then(res=>{
      //console.log(res.data);
      const data=res.data;
      //console.log(res);
      this.$store.dispatch('emptyCars');
      let count=0;
      for(let key in data){
        this.$store.dispatch('addModel',data[key])
          if(count>=18){
            continue;
          }
          //console.log(data[key]);
          //console.log(count);
          this.$store.dispatch('addCar',data[key]);
          count+=1;
          
    }
    this.$store.dispatch('setModelsFlag');
        }).catch(()=>{
          alert("Something Went Wrong");
        });
}
}


</script>