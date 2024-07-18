<template>
    <!-- COMPRA PRODUCTOS POR PROOVEDOR -->
    <v-container>
        <v-row justify="center">


            <v-col cols="12" lg="8">
                <v-card>
                    <v-card-text>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="12" lg="6">
                                    <h2>Crear nueva orden de compra (Comprar) </h2>

                                    <v-divider class="mt-3"></v-divider>
                                </v-col>
                            </v-row>
                            <div class="py-5"></div>


                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-select v-model="selected" :items="proveedores" label="Proveedores"
                                        item-title="nombre" variant="underlined" item-value="idProveedor"></v-select>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-select v-model="selectedProduct" :items="productos" label="Productos"
                                        item-title="nombreProducto" variant="underlined"
                                        item-value="idProducto"></v-select>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="cantidad" label="Cantidad" type="number"
                                        variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn color="primary" @click="agregarProductoCarro()" class="mt-5"
                                        size="small">Agregar</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>


                        <v-col cols="12">
                            <v-row>
                                <!-- titulo a la izq y iconos a la derecha en la misma fila -->
                                <v-col cols="6">
                                    <h3>Productos seleccionados</h3>
                                    <!-- <v-divider class="mb-3 mt-3"></v-divider> -->
                                </v-col>
                            </v-row>
                        </v-col>
                        <div class="py-1"></div>
                        <v-row>
                            <v-col cols="12" lg="8">
                                <VDataTable :headers="headers" :items="productosCarro" items-per-page="10"
                                    no-data-text="No hay productos seleccionados." class="elevation-3">
                                    <template v-slot:item.actions="{ item }">
                                        <v-icon @click="eliminarProductoCarro(item.idDetalleCarro)"
                                            color="red">mdi-delete</v-icon>
                                    </template>

                                </VDataTable>
                            </v-col>
                            <v-col cols="12" lg="4">

                                <!-- sub total , iva, total -->
                                <v-card class="elevation-2">
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12">
                                                <h3>Resumen de compra</h3>
                                                <v-divider class=" mt-3"></v-divider>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-row>
                                                    <v-col cols="6">
                                                        <h4>Subtotal</h4>
                                                    </v-col>
                                                    <v-col cols="6" class="text-end">
                                                        <h4>$ {{ productosCarro.reduce((acc, p) => acc + p.precio * p.cantidad, 0) }}</h4>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-row>
                                                    <v-col cols="6">
                                                        <h4>IVA</h4>
                                                    </v-col>
                                                    <v-col cols="6" class="text-end">
                                                        <h4>$ {{ productosCarro.reduce((acc, p) => acc + p.precio * p.cantidad * 0.19, 0) }}</h4>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-row>
                                                    <v-col cols="6">
                                                        <h4>Total</h4>
                                                    </v-col>
                                                    <v-col cols="6" class="text-end">
                                                        <h4>$ {{ productosCarro.reduce((acc, p) => acc + p.precio * p.cantidad * 1.19, 0) }}</h4>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>

                                </v-card>

                            </v-col>
                        </v-row>

                        <div class="py-5"></div>

                        <v-col class="text-end">
                            <v-btn color="red" to="/gestion" size="small" class="mr-3">
                                VOLVER 
                            </v-btn>
                            <v-btn color="primary" @click="guardarCompra" size="small">
                                GENERAR ORDEN
                            </v-btn>
                        </v-col>





                    </v-card-text>


                </v-card>

            </v-col>
        </v-row>
    </v-container>


</template>

<script lang="ts" setup>

import router from '@/router';
import axios from 'axios';


const selected = ref(null);

const selectedProduct = ref(null);

const proveedores = ref([]);

// const fecha = ref('');

const cantidad = ref(null);

const idUsuario = ref(parseInt(localStorage.getItem('idUsuario')?.toString() || ''));

watch(() => selected.value, (newValue) => {
    console.log(newValue);
    if (newValue) {
        getProductos(newValue);
    }
});


const getProveedores = async () => {
    const response = await axios.get('http://localhost:3003/proveedores');
    proveedores.value = response.data;

};

const getProductos = async (idProovedor: number) => {
    const response = await axios.get(`http://localhost:3003/productos/${idProovedor}/proveedor`);
    console.log(response.data);
    productos.value = response.data;
};


const getProductosCarro = async (idUsuario: number) => {
    const response = await axios.get('http://localhost:3003/carro/' + idUsuario);
    // console.log(response.data);
    productosCarro.value = response.data;
    productosCarro.value.some((p: any) => selected.value = p.idProveedor);
};

const agregarProductoCarro = async () => {
    // alert('agregarProducto' + ' ' + selectedProduct.value + ' '+ cantidad.value);
    await axios.post('http://localhost:3003/carro/agregar/' + idUsuario.value, {
        idProducto: selectedProduct.value,
        cantidad: cantidad.value,
    }).then((response) => {
        console.log(response.data);
        getProductosCarro(idUsuario.value);

        selectedProduct.value = null;
        cantidad.value = null;
    }).catch((error) => {
        alert(error.response.data.message);
    })
};

const eliminarProductoCarro = async (idDetalleCarro: number) => {
    await axios.delete('http://localhost:3003/carro/eliminar/' + idDetalleCarro).then((response) => {
        console.log(response.data);
        getProductosCarro(idUsuario.value);
    }).catch((error) => {
        console.log(error);
    })
};


// watch que si cambia el idProveedor y los productos del carro son diferentes a los del proveedor seleccionado
// entonces tira un error
watch(() => selected.value, (newValue, oldValue) => {
    if (newValue && oldValue) {
        if (productosCarro.value.length > 0) {
            if (productosCarro.value.some((p: any) => p.idProveedor != newValue)) {
                alert('No se puede cambiar de proveedor, ya que tiene productos en el carro de compra.');
                selected.value = oldValue;
            }
        }
    }
});


onMounted(() => {
    getProveedores();

    getProductosCarro(idUsuario.value);
});


const headers = ref([
    { title: 'Nombre Producto', value: 'nombreProducto' },
    { title: 'Precio Unit.', value: 'precio' },
    { title: 'Cantidad', value: 'cantidad' },
    { title: 'Acciones', value: 'actions', sortable: false },
]);

const productos = ref([
]);

const productosCarro = ref([]);


const guardarCompra = async () => {
    console.log('guardarCompra');

    axios.post('http://localhost:3002/pedido/generar', {
        idUsuario: idUsuario.value
    }).then((response) => {
        console.log(response.data);
        alert('Compra guardada correctamente');
        router.push('/gestion');
    }).catch((error) => {
        alert(error.response.data.message);
    })



};


</script>