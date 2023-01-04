/* eslint-disable */ 
import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        admin:{
            email:'mina@koleya.com',
            password:'1234'
        },
        chosenCarInfo:{
            image_url:'',
            type:'',
            rating:'',
            price_per_day:'',
            city:'',
            color:'',
            brand:'',
            year:'',
            description:'',
            model_id:'',
            address:'',
            country:'',
            office_id:'',
            plate_id:'',
            status:'',
        },
        authenticated:false,
        loggedUser:{
            email:'',
            fname:'',
            lname:''
        },
        cars:[],
        models:[],
        modelsSet:false,
        date:{dateFrom:'',dateTo:''},
        promocodes:["zeftawy9",
        "soso1",
        "7enawy1bs",
        "nana"]
        
    },
    mutations: {
        /*removeMedicine: (state, { index, type }) => {
            if (type === "stock") {
                state.stockTable.splice(index, 1);
            } else if (type === 'preparation') {
                state.preparationTable.splice(index, 1)
            }
        },
        addMedicine: (state, { type, item }) => {
            if (type === "stock") {
                item.isRecommendedChosen ? item.quantity = item.recQty : item.quantity = 1;
                item.subTotal = item.quantity * item.price;
                state.preparationTable.push(item);
            } else if (type === 'preparation') {
                state.stockTable.push(item)
            }
        },
        modifyPrice: (state, { type, price, quantity }) => {
            if (type === 'add') {
                state.price += (price * quantity)
            } else {
                state.price -= (price * quantity)
            }
        },
        updateQuantity: (state, payLoad) => {
            let index = state.preparationTable.indexOf(payLoad);
            const { price, quantity } = payLoad;
            state.price -= state.preparationTable[index].subTotal;
            state.preparationTable[index].quantity = quantity;
            state.preparationTable[index].subTotal = quantity * price;
            state.price += state.preparationTable[index].subTotal;
        },*/
        modifyChosenCar: (state,{image_url,type,rating,price_per_day,city,color,brand,year,description,model_id,address,country,office_id,plate_id,status})=>{
            state.chosenCarInfo.image_url=image_url;
            state.chosenCarInfo.type=type;
            state.chosenCarInfo.rating=rating;
            state.chosenCarInfo.price_per_day=price_per_day;
            state.chosenCarInfo.city=city;
            state.chosenCarInfo.color=color;
            state.chosenCarInfo.brand=brand;
            state.chosenCarInfo.year=year;
            state.chosenCarInfo.description=description;
            state.chosenCarInfo.model_id=model_id;
            state.chosenCarInfo.address=address;
            state.chosenCarInfo.country=country;
            state.chosenCarInfo.office_id=office_id;
            state.chosenCarInfo.plate_id=plate_id;
            state.chosenCarInfo.status=status;
        },

        modifyLoggedInUser: (state,{email,fname,lname}) => {
            state.loggedUser.email=email;
            state.loggedUser.fname=fname;
            state.loggedUser.lname=lname;
            state.token=true;
        },
        setAuthenticated(state){
            console.log("Authenticated is set to true")
            state.authenticated=true;
        },
        resetAuthenticated(state) {
            state.authenticated = false;
        },
        addCar(state,{model_id,address,brand,city,color,country,description,image_url,office_id,plate_id,price_per_day,status,type,year,rating}){
            let car= {
                model_id:model_id,
                address:address,
                brand:brand,
                city:city,
                color:color,
                country:country,
                description:description,
                image_url:image_url,
                office_id:office_id,
                plate_id:plate_id,
                price_per_day:price_per_day,
                status:status,
                type:type,
                year:year,
                rating:rating
            }
            state.cars.push(car);
        },
        emptyCars(state){
            state.cars=[];
        },
        addModel(state,{brand}){
            if(!state.modelsSet){
                //console.log(brand);
                state.models.push(brand);
            }
        },
        setModelsFlag(state){
            state.modelsSet=true;
        },
        setDate(state,{dateFrom,dateTo}) {
            state.date.dateFrom = dateFrom;
            state.date.dateTo = dateTo;
        }
    },
    actions: {
        setModelsFlag({commit}){
            commit('setModelsFlag');
        },
        addModel:({commit},payLoad)=>{
            commit('addModel',payLoad);
        },
        emptyCars:({commit})=>{
            commit('emptyCars');
        },
        modifyChosenCar: ({ commit }, payLoad) => {
            commit('modifyChosenCar', payLoad);
        },
        setAuthenticated({commit}){
            commit('setAuthenticated')
        },
        modifyLoggedInUser({commit},payLoad){
            commit('modifyLoggedInUser',payLoad);
        },

        resetAuthenticated({commit}) {
            commit('resetAuthenticated');
        },
        addCar({commit},payLoad){
            commit('addCar',payLoad);
        },
        setDate ({commit},payLoad) {
            commit('setDate',payLoad);
        }
        /*removeMedicine: ({ commit, dispatch }, payLoad) => {
            commit('removeMedicine', payLoad);
            dispatch('addMedicine', payLoad);
        },
        addMedicine: ({ commit }, payLoad) => {
            commit('addMedicine', payLoad)
        },
        modifyPrice: ({ commit }, payLoad) => {
            commit('modifyPrice', payLoad);
        },
        updateQuantity: ({ commit }, payLoad) => {
            commit('updateQuantity', payLoad)
        },*/
    },
    getters: {
        getChosenCarInfo :function(state){
            return state.chosenCarInfo;
        },
        getValidUsers :function(state){
            return state.validUsers;
        },
        getToken :function(state){
            return state.authenticated;
        },
        getUserInfo:function(state){
            return state.loggedUser;
        },
        getAdmin:function(state){
            return state.admin;
        },
        getCars:function(state){
            return state.cars;
        },
        getModels:function(state){
            return state.models;
        },
        getDate:function(state) {
            return state.date;
        },
        getPromos:function(state){
            return state.promocodes;
        }
        
    }
})
