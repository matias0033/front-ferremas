<template>
    <v-container fluid>
        <v-row justify="center">

            <GestionComponent/>
            

        </v-row>
    </v-container>


</template>

<script lang="ts" setup>

// muestrame la data de la url
// const route = useRoute();
// const id = ref(route.params.id);
// onMounted(() => {
//     console.log('DashboardView', id.value);

// });



</script>


<style scoped>
.sidebar {
    width: 250px;
    /* height: 100vh; */
    background-color: #2c3e50;
    color: #fff;
    padding: 20px;
    /* position: fixed; */
    top: 0;
    left: 0;
    overflow-y: auto;
}

.sidebar .logo {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}

.sidebar .logo img {
    width: 50px;
    margin-right: 10px;
}

.sidebar h2 {
    margin: 0;
    font-size: 1.5rem;
}

.nav-link {
    display: block;
    color: #fff;
    text-decoration: none;
    padding: 10px 0;
}

.nav-link:hover {
    background-color: #34495e;
}

.active {
    background-color: #2980b9;
}

/* Estilos para el contenido */
.content {
    margin-left: 250px;
    padding: 20px;
}

.v-card {

    padding: 10px;
}

.equal-card {
    height: 100%;
}
</style>