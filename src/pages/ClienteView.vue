<template>
    <h1> Hola </h1>
    <div class="container">
        <h1>Cliente {{ id }}</h1>
    </div>



</template>

<script lang="ts" setup>

// muestrame la data de la url
const route = useRoute();

const id = ref(route.params.id);

onMounted(() => {
    console.log('ClienteView', id.value);
});


</script>