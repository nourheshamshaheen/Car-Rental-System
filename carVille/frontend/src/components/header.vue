<template>
    <div>
    <nav>

      <v-toolbar flat app>
        <v-app-bar-nav-icon @click="drawer = !drawer" ></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase grey--text">
          <span class="font-weight-light">car</span>
          <span>Ville</span>
        </v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items class="pt-4">
        <popUp class="pr-8 pt-1" />
          <v-btn color="black" style="color:grey; important!" :disabled="!validated" @click="signOut" >
          <span>Sign Out</span>
          <v-icon right>exit_to_app</v-icon>
          
        </v-btn>
      </v-toolbar-items>
      </v-toolbar>

      <v-navigation-drawer app v-model="drawer" class="navDrawer" dark>
        <v-row>
          <v-col cols="12"> 
        <v-btn @click="drawer = !drawer" right absolute rounded class="mt-4" >
          <v-icon>{{ arrow }}</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" class="mt-12">
        <h1 v-if="validated" style="color:white;text-align:left;font-size: 1rem;" class="ml-2">{{this.email}} </h1>
        <div v-if="!validated" style="color:white;text-align:center;font-size: 1rem;">
          <v-row> 
            <v-col>
          <h1 style="text-align:left;" class="ml-2"> Guest</h1> 
        </v-col>
      <v-col>
          <router-link  class="redirection" :to="{ path: './Login'}"  active-class="active" ><a><btn text class="underline-on-hover" style="color:white;"> Sign-in</btn></a></router-link>
        </v-col>
      <v-col>
          <router-link  class="redirection" :to="{ path: './signup'}"  active-class="active" ><a><btn text class="underline-on-hover" style="color:white;">Sign-up</btn></a></router-link>
        </v-col>
        </v-row>
        </div>
        <h1 v-if="validated" style="color:white;text-align:left;font-size: 1rem;" class="ml-2">{{this.fname}} {{this.lname}} </h1>
        <v-divider></v-divider>
        
        <v-btn @click="reservations" class="mt-8">Your reservations</v-btn>
      </v-col>
      </v-row> 
      
      </v-navigation-drawer>

    </nav>
</div>
</template>
<script>
import { mdiArrowLeftThick } from '@mdi/js';
import popUp from './popUp.vue'
import { mapGetters } from 'vuex'
export default{
    components:{
        popUp
    },
    data:()=>({
        drawer: false,
        arrow: mdiArrowLeftThick,
        validated:false,
        email:'',
        fname:'',
        lname:''
    }),
    computed: {
        ...mapGetters(['getToken']),
},

methods: {
reservations(){
  if(this.validated) {
    this.$router.push({ path: './reservations' });
  }
  else {
    this.invalid=true;
  }

},
signOut() {
  this.$cookies.remove("user");
  this.$router.replace("/")
}
},
created(){
  if(this.$cookies.isKey("user")){
    this.validated=true;
    this.email=this.$cookies.get("user").email;
    this.fname=this.$cookies.get("user").fname;
    this.lname=this.$cookies.get("user").lname;
  }
}


}

</script>


<style>
.navDrawer{
color: black !important;
}
.underline-on-hover:hover {
text-decoration: underline;
}
</style>
