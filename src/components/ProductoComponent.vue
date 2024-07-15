<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="8">
                <v-card>



                    <v-card-text>


                        <v-col>
                            <v-row>
                                <!-- titulo a la izq y iconos a la derecha en la misma fila -->
                                <v-col cols="6">
                                    <h2>Productos</h2>
                                    <v-divider class="mt-3"></v-divider>
                                </v-col>
                                <v-col cols="6" class="text-right">
                                    <v-btn color="primary" size="small" @click="nuevoProducto()"> Nuevo</v-btn>
                                </v-col>
                            </v-row>
                            <div class="py-5"></div>
                            <v-data-table :headers="headersProducto" :items="itemsProducto" item-key="idProducto" class="elevation-2">
                            <template v-slot:top>
                                <v-dialog v-model="dialog" max-width="500px">
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">{{ editedItem.idProducto ? 'Editar Producto' : 'Nuevo Producto' }}</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-container>
                                                <v-row>

                                                    <v-col cols="12">
                                                        <v-text-field v-model="editedItem.nombreProducto"
                                                            label="Nombre Producto" variant="underlined"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-select v-model="editedItem.idCategoria"
                                                            :items="categoriasOptions" label="Categoría"
                                                            variant="underlined" v-bind:value="editedItem.idCategoria"
                                                            item-title="nombreCategoria"
                                                            item-value="idCategoria"></v-select>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-select v-model="editedItem.idProveedor"
                                                            :items="proveedorOptions" label="Proveedor"
                                                            variant="underlined" v-bind:value="editedItem.idProveedor"
                                                            item-title="nombre" item-value="idProveedor"></v-select>
                                                    </v-col>

                                                    <v-col cols="12">
                                                        <v-text-field v-model="editedItem.descripcionProducto"
                                                            label="Descripcion" variant="underlined"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="6">
                                                        <v-text-field v-model="editedItem.precio"
                                                            label="Precio Unitario" variant="underlined"></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" @click="close">Cancelar</v-btn>
                                            <v-btn color="blue darken-1" @click="save">Guardar</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                                <!-- historial -->
                                <v-icon small class="mr-2"
                                    @click="obtenerHistorialPrecios(item.idProducto)">mdi-history</v-icon>
                            </template>
                        </v-data-table>
                        </v-col>


           
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>


    <v-dialog v-model="dialogHistorialPrecios" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Historial de Precios</span>
            </v-card-title>
            <v-card-text>
                <v-data-table :headers="headersHistorialPrecios" :items="historialPrecios" item-key="idHistorialPrecio">
                    <template v-slot:item.fechaRegistro="{ item }">
                        {{ moment(item.fechaRegistro).format('DD/MM/YYYY ') }}
                        <!-- Fecha y hora -->
                        {{ moment(item.fechaRegistro).format('HH:mm:ss') }}
                    </template>
                    <!-- no paginacion no footer-->

                </v-data-table>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="dialogHistorialPrecios = false">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import moment from 'moment';


const categoriasOptions = ref([]);
const proveedorOptions = ref([]);

const headersHistorialPrecios = ref([
    { title: 'Fecha', value: 'fechaRegistro' },
    { title: 'Precio', value: 'precio' },
]);

const headersProducto = ref([
    { title: 'ID Producto', value: 'idProducto' },
    { title: 'Nombre Producto', value: 'nombreProducto' },
    { title: 'Categoria', value: 'nombreCategoria' },
    { title: 'Proveedor', value: 'nombre' },
    { title: 'Descripcion', value: 'descripcionProducto' },
    { title: 'Precio Unitario', value: 'precio' },
    { title: 'Acciones', value: 'actions', sortable: false },
]);

const itemsProducto = ref([]);
const dialog = ref(false);
const editedItem = ref({
    idProducto: 0,
    nombreProducto: '',
    descripcionProducto: '',
    precio: 0,
    idCategoria: null,
    idProveedor: null,
});

const obtenerProductos = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_INVENTARIO}/productos`);
        itemsProducto.value = response.data;
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

const obtenerCategorias = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_INVENTARIO}/productos/categorias`);
        categoriasOptions.value = response.data;

        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};


const historialPrecios = ref([]);
const dialogHistorialPrecios = ref(false);

const obtenerHistorialPrecios = async (idProducto: number) => {

    dialogHistorialPrecios.value = true;
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_INVENTARIO}/productos/${idProducto}/historial/precios`);
        historialPrecios.value = response.data;
        console.log(historialPrecios.value);
    } catch (error) {
        console.error(error);
    }
};

const obtenerProveedor = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_INVENTARIO}/proveedores`);
        proveedorOptions.value = response.data;

    } catch (error) {
        console.error(error);
    }
};

const save = async () => {
    try {
        if (editedItem.value.idProducto) {
            await axios.put(`${import.meta.env.VITE_APP_API_INVENTARIO}/productos/modificar/${editedItem.value.idProducto}`, editedItem.value);
            alert('Producto modificado');
        } else {
            await axios.post(`${import.meta.env.VITE_APP_API_INVENTARIO}/productos/crear`, editedItem.value);
            alert('Producto creado');
        }
        obtenerProductos();
        close();
    } catch (error) {
        console.error(error);
    }
};

const close = () => {
    dialog.value = false;
    resetEditedItem();
};

const editItem = (item: any) => {
    editedItem.value = { ...item };
    dialog.value = true;
};

const nuevoProducto = () => {
    resetEditedItem();
    dialog.value = true;
};

const resetEditedItem = () => {
    editedItem.value = {
        idProducto: 0,
        nombreProducto: '',
        descripcionProducto: '',
        precio: 0,
        idCategoria: null,
    } as any;
};

onMounted(() => {
    obtenerProductos();
    obtenerCategorias();
    obtenerProveedor();
});
</script>