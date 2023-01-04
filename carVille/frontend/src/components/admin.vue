<template>
    <div>

        <v-toolbar flat app
        color="#582B9C"
        dark
        height="130px"
        >

        <v-toolbar-title class="text-uppercase pr-0">
        <span class="font-weight-light">car</span>
          <span>Ville</span>
        </v-toolbar-title>
        <v-col md="4">
        <v-spacer></v-spacer>
    </v-col>
        <v-toolbar-items class="pt-4 ml-10">
            
            <center class="mr-20"><h3 > <h1 >ADMIN PAGE</h1></h3></center>
           
      </v-toolbar-items>
      <v-col md="4">
        <v-spacer></v-spacer>
    </v-col>
           
        <router-link  class="redirection" :to="{ path: './'}"  active-class="active" ><a>
          <v-btn flat dark @click="signOut" >
          <span>Sign Out</span>
          <v-icon right>exit_to_app</v-icon>
          
        </v-btn> </a></router-link>
      </v-toolbar>


    <div class="ml-16"> 
        <v-row class="ml-8 mr-8">
            <v-col md="4">
                <v-card
            dark 
            center
            rounded
            class="rounded-circle mt-5 ml-5 mr-5"
            height="300px"
            width="300px"
            img="https://cdn-icons-png.flaticon.com/512/1807/1807692.png"
            elevation="0"
            >
        </v-card>
        <v-card 
            class="rounded-circle mt-2 mb-5 ml-5 mr-5"
            height="50px"
            width="300px"
            elevation="0"
            >
            <router-link  class="redirection" :to="{ path: './periodInfo'}"  active-class="active" ><a>  <v-btn class="ml-n10" dark><h2 class="mt-18">reservations within a period</h2></v-btn></a></router-link>
 
           
        </v-card>
    </v-col>
    <v-col md="4">
                <v-card
            dark 
            center
            rounded
            class="rounded-circle mt-5 ml-5 mr-5"
            height="300px"
            width="300px"
            img="https://cdn-icons-png.flaticon.com/512/1484/1484890.png"
            elevation="0"
            >
        </v-card>
        <v-card 
            class="rounded-circle mt-2 mb-5 ml-5 mr-5"
            height="50px"
            width="300px"
            elevation="0"
            >
            <router-link  class="redirection" :to="{ path: './addCar'}"  active-class="active" ><a> <v-btn  class="ml-12" dark><h2 style="text-align:center" class="mt-18">add new car +</h2></v-btn></a></router-link>
 
           
        </v-card>
    </v-col>
    <v-col md="4">
                <v-card
            dark 
            center
            rounded
            class="rounded-circle mt-5 ml-5 mr-5"
            height="300px"
            width="300px"
            img="https://cdn-icons-png.flaticon.com/512/1807/1807700.png"
            elevation="0"
            >
        </v-card>
        <v-card 
            class="rounded-circle mt-2 mb-5 ml-5 mr-5"
            height="50px"
            width="300px"
            elevation="0"
            >
            <router-link  class="redirection" :to="{ path: './reservedCar'}"  active-class="active" ><a> <v-btn class="ml-8" dark><h2 style="text-align:center" class="mt-18">reserved car info</h2></v-btn></a></router-link>
 
            
        </v-card>
    </v-col>
        </v-row>
        <v-row class="ml-8 mr-8">
            <v-col md="4">
                <v-card
            dark 
            center
            rounded
            class="rounded-circle mt-5 ml-5 mr-5"
            height="300px"
            width="300px"
            img="https://cdn-icons-png.flaticon.com/512/1481/1481957.png"
            elevation="0"
            >
        </v-card>
        <v-card 
            class="rounded-circle mt-2 mb-5 ml-5 mr-5"
            height="50px"
            width="300px"
            elevation="0"
            >
            <router-link  class="redirection" :to="{ path: './updateCarStatus'}"  active-class="active" ><a> <v-btn class="ml-2" dark><h2 class="mt-18">update car status +</h2></v-btn></a></router-link>
        </v-card>
    </v-col>
    <v-col md="4">
                <v-card
            dark 
            center
            rounded
            class="rounded-circle mt-5 ml-5 mr-5"
            height="300px"
            width="300px"
            img="https://cdn-icons-png.flaticon.com/512/1496/1496423.png"
            elevation="0"
            >
        </v-card>
        <v-card 
            class="rounded-circle mt-2 mb-5 ml-5 mr-5"
            height="50px"
            width="300px"
            elevation="0"
            >
            <router-link  class="redirection" :to="{ path: './customerInfo'}"  active-class="active" ><a><v-btn class="ml-n4" dark><h2 class="mt-18">customer's reservations</h2></v-btn></a></router-link>

            
        </v-card>
    </v-col>
    <v-col md="4">
                <v-card
            dark 
            center
            rounded
            class="rounded-circle mt-5 ml-5 mr-5"
            height="300px"
            width="300px"
            img="https://cdn-icons-png.flaticon.com/512/2037/2037201.png"
            elevation="0"
            >
        </v-card>
        <v-card 
            class="rounded-circle mt-2 mb-5 ml-5 mr-5"
            height="50px"
            width="300px"
            elevation="0"
            >
            <router-link  class="redirection" :to="{ path: './dailyPayments'}"  active-class="active" ><a><v-btn class="ml-10" dark><h2 class="mt-18">daily payments</h2></v-btn></a></router-link>

            
            
        </v-card>
    </v-col>
        </v-row>

        <v-row class="ml-8 mr-8">

            <v-col md="6">
                <center>
                <v-card
            dark 
            center
            rounded
            class="rounded-circle mt-5 ml-5 mr-5"
            height="300px"
            width="300px"
            img="https://cdn-icons-png.flaticon.com/512/1481/1481957.png"
            elevation="0"
            >
        </v-card>
        <v-card 
            class="rounded-circle mt-2 mb-5 ml-5 mr-5"
            height="50px"
            width="300px"
            elevation="0"
            >
            <router-link  class="redirection" :to="{ path: './carStatus'}"  active-class="active" ><a><v-btn class="ml-n2" dark><h2 class="mt-18">cars' status</h2></v-btn></a></router-link>

            
        </v-card>
    </center>
    </v-col>
    <v-col md="6">
                <v-card
            dark 
            center
            rounded
            class="rounded-circle mt-5 ml-5 mr-5"
            height="300px"
            width="300px"
            img="https://cdn-icons-png.flaticon.com/512/2037/2037316.png"
            elevation="0"
            >
        </v-card>
        <v-card 
            class="rounded-circle mt-2 mb-5 ml-5 mr-5"
            height="50px"
            width="300px"
            elevation="0"
            >
            <router-link  class="redirection" :to="{ path: './advancedSearch'}"  active-class="active" ><a> <v-btn class="ml-8" dark><h2 class="mt-18">advanced search</h2></v-btn></a></router-link>
            
        </v-card>
    </v-col>
        </v-row>
    </div>
    </div>
</template>
<script> 
export default {
    methods: {
  signOut () {
    this.$cookies.remove("admin");
  },
}, 


}

</script>
<style>

</style>