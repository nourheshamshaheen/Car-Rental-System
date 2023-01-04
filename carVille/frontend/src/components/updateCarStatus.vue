<template>
  <div class="adminBackgroud">
    <v-snackbar 
            top 
            timeout="3500" 
            v-model="invalid" 
            color="error">
                Car not found
        </v-snackbar>
    <v-row>
      <v-spacer />
      <v-col md="5" class="my-16">
        <v-card round class="rounded-xl ma-16 pa-2" :height="this.$vuetify.breakpoint.height * 0.58">
          <v-toolbar dark rounded class="rounded-xl">
            <v-spacer />
            <h1>
              UPDATE CAR STATUS
            </h1>
            <v-spacer />
          </v-toolbar>
          <form>
            <v-col cols="10" class="mt-10 ml-6">
              <v-text-field v-model="plate_id" :error-messages="plate_idErrors" label="Plate Id" required
                @blur="$v.plate_id.$touch()"></v-text-field>
            </v-col>
            <v-row class="ml-6 mb-8">
              <v-col cols="11">
                <v-select v-model="select" :items="stats" clearable label="Status" required
                  :error-messages="selectErrors" @blur="$v.select.$touch()">
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <div>
                <v-btn absolute rounded right dark @click="submit">
                  update status<v-icon dense>add</v-icon>
                </v-btn>
              </div>
            </v-row>
          </form>
        </v-card>
      </v-col>
      <v-spacer />
    </v-row>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios';
export default {
  data: () => ({
    select: null,
    plate_id: '',
    stats: ['Active', 'Out of order', 'Rented'],
    invalid:false

  }),
  mixins: [validationMixin],

  validations: {
    plate_id: { required },
    select: { required },
  },
  computed: {
    plate_idErrors() {
      const errors = []
      if (!this.$v.plate_id.$dirty) return errors
      !this.$v.plate_id.required && errors.push("Plate id can't be empty")
      return errors
    },
    selectErrors() {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push("status can't be empty")
      return errors
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.selectErrors.length && !this.plate_idErrors.length) {
        console.log(this.stats.indexOf(this.select))
        axios.post("http://localhost:5000/updateCarStatus" , {
          plate_id: this.plate_id,
          status: this.stats.indexOf(this.select),
        }).then(res=>{
          if(res.data=="Car status updated"){
            this.$router.push("/admin")
          }else{
            this.invalid=true;
          }
        })
        .catch(() => {
        alert("Something Went Wrong");
      });
      }
     }
  },


  /*created() {
      axios.get("http://localhost:5000/updateCarStatus").then(res => {
        const data = res.data;
        //console.log(data);
        for(let key in data) {
          this.stats.push(key);
        }
      }).catch(() => {
        alert("Something Went Wrong");
      });
  }*/
}
</script>
<style>
.adminBackgroud {
  background-color: #582B9C;
  height: 100%;
  width: 100%;

}
</style>