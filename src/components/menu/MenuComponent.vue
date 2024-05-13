<template>
    <v-card>
        <v-layout>
            <v-app-bar color="primary">
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" v-if="route.path == '/gestion' || route.path == '/productos' ">
                </v-app-bar-nav-icon>


                <LogoComponent class="ml-10" />

                <v-spacer></v-spacer>


            </v-app-bar>

            <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>

                <v-divider></v-divider>

                <v-container>
                    <v-list density="compact" nav value="inicio">
                        <v-list-item title="Inicio" to="/"></v-list-item>
                    </v-list>
                    <v-list density="compact" nav value="gestion">
                        <v-list-item title="Gestión Pedidos" to="/gestion"></v-list-item>
                    </v-list>

                    <v-list density="compact" nav value="productos">
                        <v-list-item title="Productos" to="/productos"></v-list-item>
                    </v-list>
                </v-container>
            </v-navigation-drawer>

            <v-main class="tamanho">
                <v-col cols="12" lg="12" v-if="route.path !== '/'">
                    <v-row>

                        <v-col cols="12" class="text-end">
                            <v-btn color="primary" size="small" class="mr-2">Mi Cuenta </v-btn>
                            <v-btn color="red" size="small" @click="salirApp()">Salir </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <router-view></router-view>

            </v-main>
        </v-layout>
    </v-card>
</template>

<script lang="ts" setup>
import router from '@/router';


const drawer = ref(false);
const expand = ref(false);
const route = useRoute();

const keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        drawer.value = false;
    }
};

onMounted(() => {
    setTimeout(() => {
        expand.value = true;

    }, 600);
    window.addEventListener('keydown', keyDownHandler);


    console.log('MenuComponent');
});


const salirApp = () => {
    localStorage.clear();
    router.push({ path: '/login' })
};



</script>

<style></style>