import home from "./components/appHome.vue";
import login from "./components/Login.vue";
import signup from "./components/signup.vue";
import adminLogin from "./components/adminLogin.vue";
import carInstance from "./components/carInstance";
import browsing from "./components/browsing";
import carPage from "./components/carPage";
import reserve from "./components/reserve";
import reservations from "./components/reservations";
import receipt from "./components/receipt";
import addCar from "./components/addCar";
import updateCarStatus from "./components/updateCarStatus";
import advancedSearch from "./components/advancedSearch";
import reservedCar from "./components/reservedCar";
import periodInfo from "./components/periodInfo";
import customerInfo from "./components/customerInfo";
import dailyPayments from "./components/dailyPayments";
import carStatus from "./components/carStatus";
import admin from "./components/admin.vue";
//import {store} from "./store.js" ;

export const routes= [
    {path:"", component:home},
    {path:"/login",component:login,name:'login'},
    {path:"/signup",component:signup,name:'signup'},
    {path:"/adminlogin",component:adminLogin,name:'adminLogin'},
    {path:"/carInstance",component:carInstance},
    {path:"/browsing",component:browsing,name:'browsing'},
    {path:"/carPage",component:carPage},
    {path:"/reserve",component:reserve,name:"reserve"},
    {path:"/reservations",component:reservations,name:"reservations"},
    {path:"/receipt",component:receipt,name:"receipt"},
    {path:"/admin",component:admin,name:'admin'}, 
    {path:"/addCar",component:addCar,name:'addCar'},
    {path:"/updateCarStatus",component:updateCarStatus,name:'updateCarStatus'},
    {path:"/advancedSearch",component:advancedSearch,name:'advancedSearch'},
    {path:"/reservedCar",component:reservedCar,name:'reservedCar'},
    {path:"/periodInfo",component:periodInfo,name:'periodInfo'},
    {path:"/customerInfo",component:customerInfo,name:'customerInfo'},
    {path:"/dailyPayments",component:dailyPayments,name:'dailyPayments'},
    {path:"/carStatus",component:carStatus,name:'carStatus'},
    {path:'*',redirect:"/browsing"}
];
