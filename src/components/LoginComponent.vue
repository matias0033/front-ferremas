<template>

    <!-- LOGIN CON VUETIFY -->

    <v-container>
        <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
                <v-card>
                    <v-card-title>
                        <span class="headline">Login</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form> <!-- @submit.prevent="login" -->
                            <v-text-field v-model="loginRequest.correo" label="Email" type="email" required
                                variant="underlined"></v-text-field>
                            <v-text-field v-model="loginRequest.password" label="Password" type="password" required
                                variant="underlined"></v-text-field>
                            <v-btn color="primary" @click="login()">Login</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>




</template>


<script lang="ts" setup>

import axios from 'axios';

import router from '@/router';

interface LoginRequest {
    correo: string;
    password: string;
}


const loginRequest = ref<LoginRequest>({
    correo: '',
    password: ''
});

const login = async () => {


    const { correo, password } = loginRequest.value;

    const body = {
        correo,
        password
    };

    axios.post(`${import.meta.env.VITE_APP_API_AUTH}/admin/login`, body  //http://localhost:3001
    )
        .then(response => {
            console.log(response.data);

            // Guardar token en local storage

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('nameUser', response.data.userInfo.nombres + ' ' + response.data.userInfo.apellidos);
            localStorage.setItem('emailUser', response.data.userInfo.correo);

            router.push('/');




        })
        .catch(error => {
            alert(error.response.data.message)
        });


};


</script>
