<template>
    <!-- COMPRA PRODUCTOS POR PROOVEDOR -->
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="8">
                <v-card>
                    <v-card-text>

                        <v-col cols="12" lg="6">
                            <h2>Roles</h2>

                            <v-divider class="mt-3"></v-divider>
                        </v-col>
                        <div class="py-5"></div>
                        <v-col cols="12">
                            <v-row>
                                <!-- titulo a la izq y iconos a la derecha en la misma fila -->
                                <v-col cols="6">
                                    <h3>Listado</h3>
                                </v-col>
                                <v-col cols="6" class="text-right">
                                    <v-btn color="primary" size="small" class="mb-1" @click="dialog = true">Nuevo
                                        Rol</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <v-row>
                                <!-- titulo a la izq y iconos a la derecha en la misma fila -->
                                <v-col cols="4">
                                    <!-- v select para filtrar por ubicacion  -->
                                    <v-text-field v-model="buscar" label="Buscar" append-inner-icon="mdi-magnify"
                                        variant="underlined"></v-text-field>
                                </v-col>

                            </v-row>
                        </v-col>
                        <div class="py-2"></div>
                        <v-col cols="12">
                            <v-data-table :headers="headersRoles" :items="roles" item-key="idRol" :search="buscar"
                                item-value="idRol" class="elevation-2" :loading="roles.length === 0">


                            </v-data-table>

                        </v-col>



                    </v-card-text>



                </v-card>

            </v-col>
        </v-row>
    </v-container>


    <v-dialog v-model="dialog" max-width="800px">
        <v-card>
            <v-card-title class="mt-2">
                <span class="headline">Nuevo Rol</span>

                <v-divider class="mt-2"></v-divider>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">

                            <v-row>
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="12" lg="6">
                                            <v-text-field v-model="rol.nombreRol" label="Nombre del Rol"
                                                variant="underlined" append-inner-icon="mdi-account"
                                                required></v-text-field>
                                        </v-col>


                                    </v-row>
                                </v-col>


                                <v-col cols="12" lg="12">
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" lg="6" md="6" xl="6" v-for="p in permisos"
                                                :key="p.idPermiso">
                                                <v-checkbox :label="p.nombrePermiso" :value="p.idPermiso"
                                                    style="font-size: 12px; width: 1000px;" class="my-checkbox"
                                                    color="#003f46" v-model="permisoSeleccionado"></v-checkbox>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-col>
                            </v-row>

                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="asignarRoles()">Guardar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


</template>

<script lang="ts" setup>


import axios from 'axios';

interface IError {
    response: {
        data: {
            message: string;
        }
    }
}
const buscar = ref('');
const dialog = ref(false);


interface IRoles {
    idRol: number;
    nombreRol: string;
}



const headersRoles = ref([
    { title: 'Nº ', value: 'idRol' },
    { title: 'Rol', value: 'nombreRol' }
]);


const roles = ref([] as IRoles[]);

const getRoles = async () => {

    try {
        const response = await axios.get('http://localhost:3001/admin/roles');
        const p = [...response.data];
        roles.value = p
    } catch (error) {
        console.error(error);
    }
};

interface IPermisos {
    idPermiso: number;
    nombrePermiso: string;
}

const rol = ref({} as IRoles);

const permisos = ref([] as IPermisos[]);


const getPermisos = async () => {

    try {
        const response = await axios.get('http://localhost:3001/admin/permissions');
        const p = [...response.data];
        permisos.value = p
    } catch (error) {
        console.error(error);
    }
}

const permisoSeleccionado = ref([] as number[]);

// const seleccionarUsuarioPorId = (idUsuario: number) => {
//     const infoUser = usuarios.value.find((usuario: IUsers) => usuario.idUsuario === idUsuario) || {} as IUsers;
//     usuario.value = { ...infoUser };
//     valorSeleccionado.value = usuario.value.roles.map((rol: IRoles) => rol.idRol);
//     dialog.value = true;
// };

onMounted(async () => {
    await getRoles();
    await getPermisos();

});



const errorMessage = (error: IError) => {
    alert(error.response.data.message);
}



</script>

<style scoped>
.my-checkbox {
    margin-left: -30px;
    margin-bottom: -50px;
}
</style>