<template>
  <div class="adminBackgroud">
    <v-row>
      <v-spacer />
      <v-col md="8" class="my-16">
        <v-card round class="rounded-xl ma-16 pa-2" >
          <v-toolbar dark rounded class="rounded-xl">
            <v-spacer />
            <h1 class="header">
              ADD CAR
            </h1>
            <v-spacer />
          </v-toolbar>
          <form method="post">
            <v-row class="ma-6">
              <v-col md="4">
                <v-text-field v-model="plate_id" label="Plate Id" required @blur="$v.plate_id.$touch()" :error-messages="plate_idErrors">
                </v-text-field>
              </v-col>
              <v-col md="4">
                <v-text-field v-model="price_per_day" label="Price per day" required @blur="$v.price_per_day.$touch()" :error-messages="price_per_dayErrors">
                </v-text-field>
              </v-col>
              <v-col md="4">
                <v-text-field v-model="color" label="Color" required @blur="$v.color.$touch()" :error-messages="colorErrors">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-6">
              <v-col>
                <v-text-field v-model="brand" label="Brand" required @blur="$v.brand.$touch()" :error-messages="brandErrors">
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="type" label="Type" required @blur="$v.type.$touch()" :error-messages="typeErrors">
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field type="year" v-model="year" label="Year" required @blur="$v.year.$touch()" :error-messages="yearErrors">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-6">
              <v-col md="8">
                <v-select v-model="select1" :items="office" clearable label="Office" required
                  @blur="$v.select1.$touch()" :error-messages="select1Errors">
                </v-select>
              </v-col>
              <v-col md="4">
                <v-select v-model="select2" :items="status" clearable label="Status" required
                  @blur="$v.select2.$touch()" :error-messages="select2Errors">
                </v-select>
              </v-col>
            </v-row>
            <v-row class="ma-6">
              <v-col>
                <v-text-field type="image_url" v-model="image_url" label="Image URL" required
                  @blur="$v.image_url.$touch()" :error-messages="image_urlErrors">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-6">
              <v-col>
                <v-text-field type="description" v-model="description" label="Description" required
                  @blur="$v.description.$touch()" :error-messages="descriptionErrors">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-8">
              <div>
                <v-btn absolute rounded right dark class=" mt-n3 " @click="submit">
                  add car +
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
import { required,maxLength,integer,numeric,alpha } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  data: () => ({
    description:'',
    plate_id: '',
    price_per_day: '',
    color: '',
    select1: null,
    select2: null,
    brand: '',
    type: '',
    year: '',
    image_url: '',
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
    status: [
      'Active',
      'Out of order',
      'Rented',
    ],
    selectedIndex:'',

  }),
  mixins: [validationMixin],

  validations: {
    description:{ required, maxLength:maxLength(200)},
    plate_id: { required },
    price_per_day: { required,numeric },
    color: { required, alpha },
    select1: { required },
    select2: { required },
    brand: { required},
    type:{required},
    year: { required,integer,maxLength:maxLength(4)  },
    image_url:{required},

  },

  

  computed: {
    plate_idErrors() {
      const errors = []
      if (!this.$v.plate_id.$dirty) return errors
      !this.$v.plate_id.required && errors.push('You must enter a plate id')
      return errors
    },
    price_per_dayErrors() {
      const errors = []
      if (!this.$v.price_per_day.$dirty) return errors
      !this.$v.price_per_day.required && errors.push('You must enter a price per day for the new car')
      !this.$v.price_per_day.numeric && errors.push('Price per day for the new car must be numeric')
      return errors
    },
    colorErrors() {
      const errors = []
      if (!this.$v.color.$dirty) return errors
      !this.$v.color.alpha && errors.push('Color must be a string')
      !this.$v.color.required && errors.push("Color can't be empty")
      return errors
    },
    select1Errors() {
      const errors = []
      if (!this.$v.select1.$dirty) return errors
      !this.$v.select1.required && errors.push('office selection is required')
      return errors
    },
    select2Errors() {
      const errors = []
      if (!this.$v.select2.$dirty) return errors
      !this.$v.select2.required && errors.push('status selection is required')
      return errors
    },
    brandErrors() {
      const errors = []
      if (!this.$v.brand.$dirty) return errors
      !this.$v.brand.required && errors.push("Brand can't be empty")
      return errors
    },
    typeErrors() {
      const errors = []
      if (!this.$v.type.$dirty) return errors
      !this.$v.type.required && errors.push("Type can't be empty")
      return errors
    },
    yearErrors() {
      const errors = []
      if (!this.$v.year.$dirty) return errors
      !this.$v.year.integer && errors.push('Year must have an integer value')
      !this.$v.year.required && errors.push("year can't be empty")
      !this.$v.year.maxLength && errors.push('Year cannot be greater than 9999')
      return errors
    },
    image_urlErrors(){
      const errors = []
      if (!this.$v.image_url.$dirty) return errors
      !this.$v.image_url.required && errors.push('image url is required')
      return errors  
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.required && errors.push("Description can't be empty")
      !this.$v.description.maxLength && errors.push("Description can't be more than 200 character")
      return errors
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if(!this.plate_idErrors.length && 
      !this.price_per_dayErrors.length &&
      !this.colorErrors.length &&
      !this.select1Errors.length &&
      !this.select2Errors.length &&
      !this.brandErrors.length &&
      !this.typeErrors.length &&
      !this.yearErrors.length &&
      !this.image_urlErrors.length &&
      !this.descriptionErrors.length) {
        axios.post("http://localhost:5000/addCar" , {
          plate_id: this.plate_id,
          price_per_day: this.price_per_day,
          color: this.color,
          brand: this.brand,
          type : this.type,
          year: this.year,
          office_id: (this.office.indexOf(this.select1)) +1,
          stat: this.status.indexOf(this.select2),
          image_url: this.image_url,
          description: this.description
        }).then(res=>{
          if(res.data=="Car added successfully"){
            this.$router.push('/admin');
          }
        }).catch(()=>{
          alert("Something Went Wrong");
        });
      }
    }
}
}
</script>
<style>
.adminBackgroud {
  background-color: #582B9C;
  height:100%;
  width:100%;
}
</style>