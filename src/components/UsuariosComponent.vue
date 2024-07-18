<template>
    <!-- COMPRA PRODUCTOS POR PROOVEDOR -->
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="8">
                <v-card>
                    <v-card-text>

                        <v-col cols="12" lg="6">
                            <h2>Usuarios (Administrador)</h2>

                            <v-divider class="mt-3"></v-divider>
                        </v-col>
                        <div class="py-5"></div>
                        <v-col cols="12">
                            <v-row>
                                <!-- titulo a la izq y iconos a la derecha en la misma fila -->
                                <v-col cols="6">
                                    <h3>Listado</h3>
                                </v-col>
                                <!-- <v-col cols="6" class="text-right">
                                    <v-btn color="primary" size="small" class="mb-1">Nuevo Usuario</v-btn>
                                </v-col> -->
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
                                <!-- <v-col cols="4" class="text-right">
                                    <v-select v-model="ubicacionSeleccionada" :items="ubicaciones" label="Ubicacion"
                                        variant="underlined" v-bind:value="ubicacionSeleccionada"
                                        item-title="nombreUbicacion" item-value="idUbicacion"></v-select>
                                </v-col> -->
                            </v-row>
                        </v-col>
                        <div class="py-2"></div>
                        <v-col cols="12">
                            <v-data-table :headers="headers" :items="usuarios" item-key="idUsuario" :search="buscar"
                                item-value="idUsuario" class="elevation-2" :loading="usuarios.length === 0" show-expand>

                                <!-- asignar roles -->
                                <template #item.actions="{ item }">
                                    <v-btn color="primary"
                                        @click="seleccionarUsuarioPorId(item.idUsuario)">Asignar Roles</v-btn>

                                </template>


                                <template v-slot:expanded-row="{ columns, item }">
                                    <tr>
                                        <td :colspan="columns.length">
                                            <v-data-table :headers="headersRoles" :items="item.roles" item-key="idRol"
                                                density="compact">
                                                <template #bottom></template>

                                            </v-data-table>
                                        </td>
                                    </tr>
                                </template>

                                <template v-slot:item.nombreCompleto="{ item }">
                                    {{ item.nombres }} {{ item.apellidos }}

                                </template>

                                <template v-slot:item.activo="{ item }">
                                    <v-icon v-if="item.activo === 1" color="green">mdi-check</v-icon>
                                    <v-icon v-else color="red">mdi-close</v-icon>
                                </template>

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
                <span class="headline">Usuario Nº {{ usuario.idUsuario }}</span>

                <v-divider class="mt-2"></v-divider>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">

                            <v-row>
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="6">
                                            <h3>Roles</h3>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12">
                                    <v-data-table :headers="headersRoles" :items="roles" item-key="idRol"
                                        class="elevation-2" item-value="idRol">
                                        <template v-slot:item.seleccionar="{ item }">
                                            <v-switch :value="item.idRol" v-model="valorSeleccionado" hide-details
                                                color="primary"></v-switch>

                                        </template>
                                    </v-data-table>
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

// const expanded = ref([]  as number[]);

interface IRoles {
    idRol: number;
    nombreRol: string;
}

interface IUsers {
    idUsuario: number;
    nombres: string;
    apellidos: string;
    correo: string;
    activo: number;
    roles: IRoles[];
}


const headers = ref([
    { title: '', key: 'data-table-expand' },
    { title: 'Nº  ', value: 'idUsuario' },
    { title: 'Nombre Completo', value: 'nombreCompleto' },
    { title: 'Correo', value: 'correo' },
    { title: 'Activo', value: 'activo' },
    { title: 'Acciones', key: 'actions' },

]);

const headersRoles = ref([
    { title: 'Nº ', value: 'idRol' },
    { title: 'Rol', value: 'nombreRol' },
    { title: 'Seleccionar', key: 'seleccionar' }
]);

const usuarios = ref([] as IUsers[]);


// const productosInventario = ref([] as IFormInventario[]);

const getUsers = async () => {

    try {
        const response = await axios.get('http://localhost:3001/admin/users');
        const p = [...response.data];
        console.log(p);
        usuarios.value = p
    } catch (error) {
        console.error(error);
    }
};

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

const usuario = ref({} as IUsers);

const valorSeleccionado = ref([] as number[]);

const seleccionarUsuarioPorId = (idUsuario: number) => {
    const infoUser = usuarios.value.find((usuario: IUsers) => usuario.idUsuario === idUsuario) || {} as IUsers;
    usuario.value = { ...infoUser };
    valorSeleccionado.value = usuario.value.roles.map((rol: IRoles) => rol.idRol);
    dialog.value = true;
};

const asignarRoles = async () => {

    console.log(valorSeleccionado.value);
    try {
        const response = await axios.post(`http://localhost:3001/admin/users/asignar-rol`, {
            idUsuario: usuario.value.idUsuario,
            roles: valorSeleccionado.value
        });
        console.log(response.data);
        alert('Roles asignados correctamente');
        dialog.value = false;
        await getUsers();
    } catch (error) {
        console.error(error);
    }
};


onMounted(async () => {
    await getUsers();
    await getRoles();

});

// const agregarProductoInventario = async () => {
//     const form = {
//         idProducto: formInventario.value.idProducto,
//         numeroSerie: parseInt(formInventario.value.numeroSerie.toString()),
//         cantidad: parseInt(formInventario.value.cantidad.toString()),
//         idUbicacion: formInventario.value.idUbicacion,
//         fechaIngreso: formInventario.value.fechaIngreso
//     }

//     try {
//         const response = await axios.post('http://localhost:3003/inventario/crear/producto', form)
//         console.log(response.data);
//         alert('Producto agregado correctamente');
//         dialog.value = false;
//         await getProductosInventario();
//     } catch (error) {
//         errorMessage(error as IError)
//     }

// };

// const seleccionarProductoInventario = async (idInventario: number) => {
//     const producto = productosInventario.value.find((producto: IFormInventario) => producto.idInventario === idInventario) || {} as IFormInventario;
//     formInventario.value = { ...producto };

//     console.log(formInventario.value);

//     dialog.value = true;
// };

// const ubicacionSeleccionada = ref<number | null>(null);

// const filteredProductosInventario = computed(() => {
//     if (ubicacionSeleccionada.value) {
//         return productosInventario.value.filter((producto: IFormInventario) => producto.idUbicacion === ubicacionSeleccionada.value);
//     }else {
//         return productosInventario.value;
//     }
// });


// const actualizarProductoInventario = async () => {
//     try {
//         const response = await axios.put(`http://localhost:3003/inventario/modificar/${formInventario.value.idInventario}/producto`, formInventario.value);
//         console.log(response.data);
//         alert('Producto actualizado correctamente');
//         dialog.value = false;
//         await getProductosInventario();
//     } catch (error) {
//         console.error(error);
//     }
// };


// const desactivarProductoInventario = async (idInventario: number) => {
//     try {
//         const response = await axios.post(`http://localhost:3003/inventario/desactivar/${idInventario}/producto`);
//         console.log(response.data);
//         alert('Producto desactivado correctamente');
//         await getProductosInventario();
//     } catch (error) {
//         console.error(error);
//     }
// };


// const guardar = async () => {
//     if (formInventario.value.idInventario) {
//         await actualizarProductoInventario();
//     } else {
//         await agregarProductoInventario();
//     }
// };


// const nuevoProducto = () => {
//     formInventario.value = {} as IFormInventario;
//     dialog.value = true;
// };


// const computedEstaActivo = computed({
//     get() {
//         return formInventario.value.estaActivo === 1;
//     },
//     set(value) {
//         formInventario.value.estaActivo = value ? 1 : 0;
//     },
// });


const errorMessage = (error: IError) => {
    alert(error.response.data.message);
}



</script>