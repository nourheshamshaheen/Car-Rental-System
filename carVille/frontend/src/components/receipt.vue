<template>

    <div class="background">
        <div height="70" class="mb-16"> 
        <h1>.</h1>
        </div>
        <v-row>
            <v-col>
        <v-spacer></v-spacer>
            </v-col> 
            <v-col>
            <v-card
         class="mt-16"
         color="white"
         elevation="10"
         height="350"
         width="500"
>

<center ><v-card-text class="mt-16"><h1 class="mt-16">Thank you {{ this.fname }} for your rental!</h1></v-card-text></center>
<center >    <h4>You ordered a {{ this.brand }} for {{ this.price_per_day }} a day</h4></center>
<v-row>
    <v-col md="1">
   <v-spacer></v-spacer>
    </v-col>
<v-col md="5" class="mt-12 " >
<v-img height="60" width="140" class="mt-16 mr-16" src="https://static.vecteezy.com/system/resources/previews/001/199/360/non_2x/barcode-png.png"></v-img>
</v-col>
<v-col md="6" >
    <v-card-actions class="mt-16">
<v-btn
@click="submit"
 class="mt-16 mr-n4"
 dark 
 rounded> 
 continue browsing
</v-btn>
</v-card-actions>
</v-col>
</v-row>
<h5 class="ml-12">track your reservation</h5>
</v-card>
</v-col>
<v-col>
<v-spacer></v-spacer> 
</v-col>
</v-row>
    </div>

</template>
<script>
export default{
data:()=>({
    fname:'',
    brand:'',
    price_per_day:''
}),
methods: {
    submit() {
        this.$router.push("/browsing")
    }
},
created(){
    this.fname=this.$cookies.get("user").fname;
    this.brand=this.$cookies.get("selectedCar").brand;
    this.price_per_day=this.$cookies.get("price");
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