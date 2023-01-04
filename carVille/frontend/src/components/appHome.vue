
<template>
    <div class="bg">
        <div class="text-center go-btn">
            <v-menu 
                offset-x 
                transition="slide-y-transition" >
                <template 
                    v-slot:activator="{ on, attrs }">
                        <v-btn 
                            width="100px" 
                            height="60px" 
                            rounded 
                            right 
                            @click="dropClick" 
                            color="black" 
                            dark
                            v-bind="attrs" 
                            v-on="on">
                                {{ btnLabel }}
                                <v-icon>
                                    {{ arrow }}
                                </v-icon>
                        </v-btn>
                </template>
                <v-list 
                    class="list" 
                    dark>
                    <v-list-item 
                    v-for="(option, index) in options" 
                    :key="index">
                        <router-link :to=optionsUrls[index] tag="p" active-class="active" ><a class="redirection">{{option.title}}</a>
                        </router-link>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<script>
import { mdiArrowDownThick } from '@mdi/js';
import { mdiArrowRightThick } from '@mdi/js';
export default {
    data: () => ({
        options: [
            { title: 'Sign in as a user' },
            { title: 'Sign up' },
            { title: 'Continue as a guest' },
            { title: 'Sign in as administrator' },
        ],
        optionsUrls:[
            "/login",
            "/signup",
            "/browsing",
            "/adminlogin"
        ],
        btnLabel: 'Go ',
        arrow: mdiArrowRightThick

    }),

    methods: {
        dropClick() {
            if (this.arrow === mdiArrowDownThick)
                this.arrow = mdiArrowRightThick
            else
                this.arrow = mdiArrowDownThick
        }
    }
}
</script>
<style scoped>
body,
html {
    position: relative;
    height: 100%;
    margin: 0;
}
.bg {
    background-image: url("/public/images/carville.png");
    height: 100%;
    width:100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}
.go-btn {
    position: absolute;
    padding-left: 20%;
    top:40%;
}
.redirection{
    text-decoration: none;
    color: white;
}

</style>


