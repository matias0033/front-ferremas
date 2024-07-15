<template>
    <!-- COMPRA PRODUCTOS POR PROOVEDOR -->
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="8" >
                <v-card>
                    <v-card-text>

                        <v-col cols="12" lg="6">
                            <h2>Inventario</h2>

                            <v-divider class="mt-3"></v-divider>
                        </v-col>
                        <div class="py-5"></div>
                        <v-col cols="12">
                            <v-row>
                                <!-- titulo a la izq y iconos a la derecha en la misma fila -->
                                <v-col cols="6">
                                    <h3>Productos</h3>
                                </v-col>
                                <v-col cols="6" class="text-right">
                                    <v-btn color="primary" @click="nuevoProducto()" size="small" class="mb-1">Agregar</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <v-row>
                                <!-- titulo a la izq y iconos a la derecha en la misma fila -->
                                <v-col cols="4">
                                     <!-- v select para filtrar por ubicacion  -->
                                     <v-text-field v-model="buscar" label="Buscar" append-inner-icon="mdi-magnify" variant="underlined"></v-text-field>

                                </v-col>
                                <v-col cols="4" class="text-right">
                                    <v-select v-model="ubicacionSeleccionada" :items="ubicaciones" label="Ubicacion"
                                        variant="underlined" v-bind:value="ubicacionSeleccionada"
                                        item-title="nombreUbicacion" item-value="idUbicacion"></v-select>
                                </v-col>
                            </v-row>
                        </v-col>
                        <div class="py-2"></div>
                        <v-col cols="12">
                            <v-data-table :headers="headers" :items="filteredProductosInventario" item-key="idInventario" :search="buscar"
                                class="elevation-2" :loading="productosInventario.length === 0">
                                <template v-slot:item.actions="{ item }">
                                    <v-icon small @click="seleccionarProductoInventario(item.idInventario)" color="">mdi-pencil</v-icon>
                                    <v-icon small @click="desactivarProductoInventario(item.idInventario)" class="ml-2" color="">mdi-close-circle</v-icon>

                                </template>

                                <template v-slot:item.estadoStock="{ item }">
                                <v-chip color="red" v-if="item.comparacion_stock" class="text-right">{{ item.comparacion_stock }}</v-chip>
                                <v-chip  v-else class="text-right " color="primary">Stock Suficiente</v-chip>
                                </template>

                                <template v-slot:item.estaActivo="{ item }">
                                    <v-icon v-if="item.estaActivo === 1" color="green">mdi-check</v-icon>
                                    <v-icon v-else color="red">mdi-close</v-icon>
                                </template>

                            </v-data-table>

                        </v-col>



                    </v-card-text>



                </v-card>

            </v-col>
        </v-row>
    </v-container>


    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Crear Producto</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-select v-model="formInventario.idProducto" :items="productos" label="Producto"
                                variant="underlined" v-bind:value="formInventario.idProducto"
                                item-title="nombreProducto" item-value="idProducto"></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="formInventario.numeroSerie" label="Numero Serie" required
                                :disabled="formInventario.idInventario ? true : false"
                                variant="underlined"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="formInventario.cantidad" label="Cantidad" required
                                variant="underlined"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select v-model="formInventario.idUbicacion" :items="ubicaciones" label="Ubicacion"
                                variant="underlined" v-bind:value="formInventario.idUbicacion"
                                item-title="nombreUbicacion" item-value="idUbicacion"></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="formInventario.fechaIngreso" label="Fecha Ingreso" required
                                variant="underlined"></v-text-field>
                        </v-col>

                        <v-col cols="12" v-if="formInventario.estaActivo != null">
                            <v-checkbox v-model="computedEstaActivo" label="Activo" color="primary"></v-checkbox>
                        </v-col>

                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="guardar()">Guardar</v-btn>
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


interface IFormInventario {
    idInventario: number;
    idProducto: number;
    numeroSerie: number;
    cantidad: number;
    idUbicacion: number;
    fechaIngreso: string;
    estaActivo: number;
    comparacion_stock : string;
}

const buscar = ref('');
const formInventario = ref({} as IFormInventario);
const dialog = ref(false);


const productos = ref([]);
const ubicaciones = ref([]);

const getProductos = async () => {
    const response = await axios.get(`http://localhost:3003/productos`);
    console.log(response.data);
    productos.value = response.data;
};

const getUbiaciones = async () => {
    const response = await axios.get(`http://localhost:3003/inventario/ubicaciones`);
    console.log(response.data);
    ubicaciones.value = response.data;
};

onMounted(async () => {
    await getProductosInventario();
    await getProductos();
    await getUbiaciones();

});


const headers = ref([
    { title: 'Nº Serie ', value: 'numeroSerie' },
    { title: 'Nombre Producto', value: 'nombreProducto' },
    { title: 'Proveedor', value: 'nombreProveedor' },
    { title: 'Ubicacion', value: 'nombreUbicacion' },
    { title: 'Cantidad', value: 'cantidad' },
    { title: 'Fecha Ingreso', value: 'fechaIngreso' },
    { title: 'Estado', value: 'estaActivo' },
    { title: '', value: 'estadoStock' },
    { title: 'Acciones', value: 'actions', sortable: false },
]);


const productosInventario = ref([] as IFormInventario[]);

const getProductosInventario = async () => {

    try {
        const response = await axios.get('http://localhost:3003/inventario/productos');
        const p = [...response.data];
        productosInventario.value = p
    } catch (error) {
        console.error(error);
    }
};

const agregarProductoInventario = async () => {
    const form = {
        idProducto: formInventario.value.idProducto,
        numeroSerie: parseInt(formInventario.value.numeroSerie.toString()),
        cantidad: parseInt(formInventario.value.cantidad.toString()),
        idUbicacion: formInventario.value.idUbicacion,
        fechaIngreso: formInventario.value.fechaIngreso
    }

    try {
        const response = await axios.post('http://localhost:3003/inventario/crear/producto', form)
        console.log(response.data);
        alert('Producto agregado correctamente');
        dialog.value = false;
        await getProductosInventario();
    } catch (error) {
        errorMessage(error as IError)
    }

};

const seleccionarProductoInventario = async (idInventario: number) => {
    const producto = productosInventario.value.find((producto: IFormInventario) => producto.idInventario === idInventario) || {} as IFormInventario;
    formInventario.value = { ...producto };

    console.log(formInventario.value);

    dialog.value = true;
};

const ubicacionSeleccionada = ref<number | null>(null);

const filteredProductosInventario = computed(() => {
    if (ubicacionSeleccionada.value) {
        return productosInventario.value.filter((producto: IFormInventario) => producto.idUbicacion === ubicacionSeleccionada.value);
    }else {
        return productosInventario.value;
    }
});


const actualizarProductoInventario = async () => {
    try {
        const response = await axios.put(`http://localhost:3003/inventario/modificar/${formInventario.value.idInventario}/producto`, formInventario.value);
        console.log(response.data);
        alert('Producto actualizado correctamente');
        dialog.value = false;
        await getProductosInventario();
    } catch (error) {
        console.error(error);
    }
};


const desactivarProductoInventario = async (idInventario: number) => {
    try {
        const response = await axios.post(`http://localhost:3003/inventario/desactivar/${idInventario}/producto`);
        console.log(response.data);
        alert('Producto desactivado correctamente');
        await getProductosInventario();
    } catch (error) {
        console.error(error);
    }
};


const guardar = async () => {
    if (formInventario.value.idInventario) {
        await actualizarProductoInventario();
    } else {
        await agregarProductoInventario();
    }
};


const nuevoProducto = () => {
    formInventario.value = {} as IFormInventario;
    dialog.value = true;
};


const computedEstaActivo = computed({
    get() {
        return formInventario.value.estaActivo === 1;
    },
    set(value) {
        formInventario.value.estaActivo = value ? 1 : 0;
    },
});


const errorMessage = (error: IError) => {
    alert(error.response.data.message);
}



</script>