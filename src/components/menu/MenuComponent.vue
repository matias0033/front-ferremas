<template>
    <v-card>
        <v-layout>
            <v-app-bar color="primary">
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" v-if="route.path == '/gestion' || 
                                                                                        route.path == '/productos' ||
                                                                                        route.path == '/inventario'||
                                                                                        route.path == '/orden-compra' ||
                                                                                        route.path == '/usuarios' ||
                                                                                        route.path == '/roles'   ">
                </v-app-bar-nav-icon>


                <LogoComponent class="ml-10" />

                <v-spacer></v-spacer>


            </v-app-bar>

            <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>

                <v-divider></v-divider>

                <v-container>
                    <v-list dense nav>
                        <v-list-item title="Inicio" to="/inicio"></v-list-item>
                        <v-list-item title="Productos" to="/productos" ></v-list-item>
                        <v-list-item title="Inventario" to="/inventario"></v-list-item>
                        <v-list-item title="Mis compras" to="/gestion"></v-list-item>

                        <v-list-item title="Usuarios" to="/usuarios"></v-list-item>
                        <v-list-item title="Roles" to="/roles"></v-list-item>
                        <!-- <v-list-item title="Orden de compra" to="/orden-compra"></v-list-item> -->
                    </v-list>
                </v-container>
            </v-navigation-drawer>

            <v-main class="tamanho">
                <br>
                <router-view></router-view>

            </v-main>
        </v-layout>
    </v-card>
</template>

<script lang="ts" setup>
// import router from '@/router';


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


// const salirApp = () => {
//     localStorage.clear();
//     router.push({ path: '/login' })
// };



</script>

<style></style>