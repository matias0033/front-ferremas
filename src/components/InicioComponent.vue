<template>
  <v-container fluid>


    <v-row justify="center">
      <v-col cols="12" lg="3">


        <v-card class="equal-card" elevation="2" rounded="lg">

          <div style="position: relative;">
            <div
              style="border-top: 120px solid rgb(var(--v-theme-primary)) !important; position: absolute; top: 0; left: 0; right: 0; z-index: -1;">
            </div>
            <v-container>
              <div class="py-2"></div>
              <v-col cols="12" xl="12">
                <v-row class="justify-center mt-2">
                  <v-avatar size="100" style="background-color: aliceblue">
                    <h1>MV</h1>
                  </v-avatar>
                </v-row>
              </v-col>

              <v-col cols="12" xl="12">
                <div class="text-center">
                  <p style="color: gray">{{ emailUser   }}</p>
                  <strong style="font-size: 22px">{{nameUser?.toUpperCase()}}</strong>
                </div>
              </v-col>

              <v-col cols="12" xl="12">
                <v-divider></v-divider>

                <div class="text-center" style="margin-top: 15px">
                  <!-- ICONO SALIR -->
                  <v-icon size="35" class="ml-5 mt-7" @click="salirApp()">mdi-exit-to-app</v-icon>
                </div>

              </v-col>
            </v-container>
          </div>
        </v-card>


      </v-col>

      <v-col cols="12" lg="6">
        <v-row class="text-center">

          <v-col cols="4">
            <v-card elevation="2" class="py-8" @click="navegarRuta('/gestion')"
              rel="noopener noreferrer" rounded="lg" subtitle="" target="_blank" title="Mis compras">
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card elevation="2" class="py-8" @click="navegarRuta('/productos')" rel="noopener noreferrer"
              rounded="lg" subtitle="" target="_blank" title="Productos">
            </v-card>
          </v-col>
          <!-- <v-col cols="4">
            <v-card elevation="2" class="py-8" @click="navegarRuta('/orden-compra')"
              rel="noopener noreferrer" rounded="lg" subtitle="" target="_blank" title="Orden de compra">
            </v-card>
          </v-col> -->
          <v-col cols="4">
            <v-card elevation="2" class="py-8" @click="navegarRuta('/inventario')"
              rel="noopener noreferrer" rounded="lg" subtitle="" target="_blank" title="Inventario">
            </v-card>
          </v-col>



        </v-row>
      </v-col>

      <v-col cols="12" lg="3">
        <v-card width="100%" elevation="2" rounded="lg">
          <v-date-picker v-model="date" flat width="100%" show-adjacent-months color="primary" no-title
            style="margin-top: -120px; margin-bottom: 8px;"></v-date-picker>
        </v-card>


      </v-col>

    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import router from '@/router';


const date = ref(new Date() as Date);

onMounted(() => {
  // console.log('HOLA');
});

const navegarRuta = (ruta: string) => {
  router.push( { path: ruta });
};

const salirApp = () => {
  localStorage.clear();
  router.push( { path: '/login' });
};

const nameUser = localStorage.getItem('nameUser');
const emailUser = localStorage.getItem('emailUser');

</script>

<style scoped>
.vdp-datepicker input[type="text"]:read-only {
  width: 200px;
  cursor: pointer;
}
</style>
