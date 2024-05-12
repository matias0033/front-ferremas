<template>
    <v-col v-col cols="12" lg="12">
        <v-row>

            <v-col cols="12" class="text-end">
                <v-btn color="primary" size="small" class="mr-2">Mi Cuenta </v-btn>
                <v-btn color="red" size="small">Salir </v-btn>
            </v-col>
        </v-row>
    </v-col>

    <v-col cols="12" lg="7">

        <v-card elevation="2">

            <v-col cols="12">
                <v-row>
                    <!-- titulo a la izq y iconos a la derecha en la misma fila -->
                    <v-col cols="6">
                        <h3>Pedidos</h3>
                        <h5>VISTA VENDEDOR</h5>
                    </v-col>
                    <v-col cols="6" class="text-right">
                        <!-- <v-btn color="primary" size="small"> Nuevo</v-btn> -->
                        <!-- <v-icon size="30" class="ml-3" color="red">mdi-file-pdf-box</v-icon>
                        <v-icon size="30" color="green">mdi-file-excel-box</v-icon> -->
                    </v-col>
                </v-row>

                <div class="py-4" />


                <v-row>
                    <!-- titulo a la izq y iconos a la derecha en la misma fila -->
                    <v-col cols="6" class="mt-6">
                        <h4>Total de pedidos: {{ totalPedidos }}</h4>
                    </v-col>
                    <v-col cols="6" class="text-right">
                        <v-text-field append-inner-icon="mdi-filter" label="Filtrar" single-line hide-details
                            variant="underlined"></v-text-field>
                    </v-col>
                </v-row>

            </v-col>

            <v-col cols="12">
                <VDataTable :headers="headersPedido" :items="itemsPedido" items-per-page="10" show-expand>

                    <template #item.nombreEstadoPedido="{ item }">
                        <v-chip color="primary" small v-if="item.idEstadoPedido">{{ item.nombreEstadoPedido }}</v-chip>
                    </template>

                    <!-- Expandir fila para mostrar más información, incluidos los productos -->
                    <template v-slot:expanded-row="{ item }">
                        <tr>
                            <td :colspan="headersPedido.length">
                                <v-data-table :headers="headersProducto" :items="item.productos" density="compact">

                                </v-data-table>
                            </td>
                        </tr>
                    </template>

                    <!-- Agregar botones de acción -->
                    <template #item.actions="{ item }">
                        <v-row class="mr-5">
                            <v-col cols="6">

                                <v-btn color="primary" @click="generarOrden(item.idPedido)"
                                    style="font-size:10px">Generar <br>
                                    Orden</v-btn>
                            </v-col>

                            <v-col cols="6">
                                <v-btn color="primary" @click="cambiarEstado(item.idEstadoPedido)"
                                    style="font-size:10px">Cambiar <br>
                                    Estado
                                </v-btn>
                            </v-col>

                        </v-row>


                    </template>

                </VDataTable>
            </v-col>

        </v-card>

    </v-col>
    <v-col cols="12" lg="5">

        <v-card elevation="2">


            <v-col cols="12">
                <v-row>
                    <!-- titulo a la izq y iconos a la derecha en la misma fila -->
                    <v-col cols="6">
                        <h3>Ordenes de pedido </h3>
                        <h5>VISTA BODEGUERO</h5>
                    </v-col>
                    <v-col cols="6" class="text-right">
                        <!-- BTN NUEVO AGREGAR CLIENTE -->
                        <v-btn color="primary" size="small"> Nuevo</v-btn>
                    </v-col>
                </v-row>

                <div class="py-4" />


                <v-row>
                    <!-- titulo a la izq y iconos a la derecha en la misma fila -->
                    <v-col cols="6" class="mt-6">
                        <h4>Total de ordenes: {{ totalOrdenesPedido }}</h4>
                    </v-col>
                    <v-col cols="6" class="text-right">
                        <v-text-field append-inner-icon="mdi-filter" label="Filtrar" single-line hide-details
                            variant="underlined"></v-text-field>
                    </v-col>
                </v-row>

            </v-col>

            <v-col cols="12">
                <VDataTable :headers="headersOrdenPedido" :items="itemsOrdenPedido" items-per-page="10">

                    <!-- v chip para los Estado de pedido idEstadoPedido 1 recibido entonces es azul -->

                    <template #item.Estado_Orden_Pedido="{ item }">
                        <v-chip color="primary" small>{{ item.Estado_Orden_Pedido }}</v-chip>
                        <!-- <v-chip color="success" small v-if="item.idEstadoPedido === 2">{{ item.nombreEstadoPedido }}</v-chip> -->
                    </template>

                    <template v-slot:expanded-row="{ item }">
                        <tr>
                            <td :colspan="headersPedido.length">
                                <v-data-table :headers="headersProducto" :items="item.productos" :key="item.idProducto"
                                    density="compact">

                                </v-data-table>
                            </td>
                        </tr>
                    </template>

                </VDataTable>
            </v-col>
        </v-card>


    </v-col>

</template>


<script lang="ts" setup>
import axios from 'axios';

const headersPedido = ref([
    { title: '', key: 'data-table-expand' },
    { title: 'Pedido', align: 'start', sortable: false, value: 'idPedido' },
    { title: 'Nombre', align: 'start', value: 'nombres' },
    { title: 'Apellido', align: 'start', value: 'apellidos' },
    // { title: 'Correo', value: 'correo' },
    { title: 'Despacho', align: 'start', value: 'Tipo_Despacho' },
    // { title: 'Direccion', value: 'Direccion' },
    // { title: 'Region', value: 'Region' },
    // { title: 'Comuna', value: 'Comuna' },
    { title: 'Estado', align: 'start', value: 'nombreEstadoPedido' },
    // { title: 'Observacion', value: 'observacion' },
    { title: 'Total', align: 'start', value: 'total' },
    { title: 'Acciones', key: 'actions' },


] as any[]);

const headersOrdenPedido = ref([
    { title: '', key: 'data-table-expand' },
    { title: 'Orden', align: 'start', sortable: false, value: 'idOrdenPedido' },
    { title: 'Pedido', align: 'start', sortable: false, value: 'idPedido' },
    { title: 'Vendedor', value: 'Vendedor' },
    { title: 'Estado Orden', value: 'Estado_Orden_Pedido' },


] as any[]);

const headersProducto = ref([
    { title: 'Producto', value: 'nombreProducto' },
    { title: 'Cantidad', value: 'Cantidad_Productos' },
    { title: 'Precio Unit.', value: 'Precio_Unitario' },
    { title: 'Precio Total', value: 'Precio_Total_Por_Producto' },

    // Agrega más columnas según sea necesario
] as any[]);

const itemsPedido = ref([] as any[]);

const itemsOrdenPedido = ref([] as any[]);

const totalPedidos = computed(() => itemsPedido.value.length);

const totalOrdenesPedido = computed(() => itemsOrdenPedido.value.length);


const obtenerPedidos = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_APP_API_PEDIDOS}/pedido/obtener`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        itemsPedido.value = data;

    } catch (error) {
        console.error(error);
    }
};

const obtenerOrdenesPedido = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_APP_API_PEDIDOS}/orden-pedido/obtener`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        itemsOrdenPedido.value = data;

    } catch (error) {
        console.error(error);
    }
};

const generarOrden = async (idPedido: number) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_APP_API_PEDIDOS}/orden-pedido/generar`, {
            idPedido
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(data);
        obtenerOrdenesPedido();
    } catch (error) {
        console.error(error);
    }
};

const cambiarEstado = async (idEstadoPedido: number) => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_APP_API_PEDIDOS}/pedido/cambiar-estado`, {
            idEstadoPedido
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(data);
        obtenerPedidos();
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    obtenerPedidos();
    obtenerOrdenesPedido();
});






</script>
