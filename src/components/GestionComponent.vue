<template>

    <!-- V DIALOG PARA ACTUALIZAR ESTADO -->
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Cambiar Estado Pedido </span>
            </v-card-title>
            <v-card-text>
                <v-select v-model="estadoSeleccionado" :items="estadosPedido" item-value="idEstadoPedido"
                    item-title="nombreEstadoPedido" label="Estado" variant="underlined" required></v-select>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="dialog = false">Cancelar</v-btn>
                <v-btn color="blue darken-1" @click="cambiarEstado('PEDIDO')">Actualizar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="dialogOrden" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Cambiar Estado Orden </span>
            </v-card-title>
            <v-card-text>
                <v-select v-model="estadoOrdenPedidoSeleccionado" :items="estadosOrdenPedido" item-value="idOrdenPedido"
                    item-title="nombreEstOrdenPedido" label="Estado" variant="underlined" required></v-select>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="dialogOrden = false">Cancelar</v-btn>
                <v-btn color="blue darken-1" @click="cambiarEstado('ORDEN_PEDIDO')">Actualizar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

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
                <VDataTable :headers="headersPedido" :items="itemsPedido" items-per-page="10" item-key="idPedido"
                    item-value="idPedido" show-expand :expanded.sync="expanded">

                    <template #item.nombreEstadoPedido="{ item }">
                        <v-chip color="primary" small v-if="item.idEstadoPedido">{{ item.nombreEstadoPedido }}</v-chip>
                    </template>


                    <template v-slot:expanded-row="{ columns, item }">
                        <tr>
                            <td :colspan="columns.length">
                                <v-data-table :headers="headersProducto" :items="item.productos" density="compact">
                                </v-data-table>
                            </td>
                        </tr>
                    </template>

                    <!-- Agregar botones de acción -->
                    <template v-slot:item.actions="{ item }">
                        <v-row class="mr-5">
                            <v-col cols="6">

                                <v-btn color="primary" @click="generarOrden(item.idPedido)"
                                    style="font-size:10px">Generar <br>
                                    Orden</v-btn>
                            </v-col>

                            <v-col cols="6">
                                <v-btn color="primary" @click="abrirModal(item.idPedido, item.idEstadoPedido, 'PEDIDO')"
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
                        <!-- <v-btn color="primary" size="small"> Nuevo</v-btn> -->
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
                <VDataTable :headers="headersOrdenPedido" :items="itemsOrdenPedido" items-per-page="10"
                    item-key="idPedido" item-value="idPedido" show-expand :expanded.sync="expanded">

                    <!-- v chip para los Estado de pedido idEstadoPedido 1 recibido entonces es azul -->

                    <template #item.Estado_Orden_Pedido="{ item }">
                        <v-chip color="primary" small>{{ item.Estado_Orden_Pedido }}</v-chip>
                        <!-- <v-chip color="success" small v-if="item.idEstadoPedido === 2">{{ item.nombreEstadoPedido }}</v-chip> -->
                    </template>

                    <!-- Agregar botones de acción -->
                    <template v-slot:item.actions="{ item }">
                        <v-row class="mr-5">

                            <v-col cols="6">
                                <v-btn color="primary"
                                    @click="abrirModal(item.idOrdenPedido, item.idEstOrdenPedido, 'ORDEN_PEDIDO')"
                                    style="font-size:10px">Cambiar <br>
                                    Estado
                                </v-btn>
                            </v-col>

                        </v-row>


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
    { title: 'Acciones', key: 'actions' },


] as any[]);

const headersProducto = ref([
    { title: 'Producto', value: 'nombreProducto' },
    { title: 'Cantidad', value: 'Cantidad_Productos' },
    { title: 'Precio Unit.', value: 'Precio_Unitario' },
    { title: 'Precio Total', value: 'Precio_Total_Por_Producto' },

    // Agrega más columnas según sea necesario
] as any[]);


const estadosPedido = ref([
    { idEstadoPedido: 1, nombreEstadoPedido: 'Recibido' },
    { idEstadoPedido: 2, nombreEstadoPedido: 'Aprobado' },
    { idEstadoPedido: 3, nombreEstadoPedido: 'Rechazado' },
    { idEstadoPedido: 4, nombreEstadoPedido: 'En preparacion' },
    { idEstadoPedido: 5, nombreEstadoPedido: 'En transito' },
    { idEstadoPedido: 6, nombreEstadoPedido: 'Entregado' },
] as any[]);


const estadosOrdenPedido = ref([
    { idOrdenPedido: 1, nombreEstOrdenPedido: 'En espera de aceptación' },
    { idOrdenPedido: 2, nombreEstOrdenPedido: 'Aceptado' },
    { idOrdenPedido: 4, nombreEstOrdenPedido: 'Entregado al Vendedor' },
] as any[]);

const itemsPedido = ref([
] as any[]);

const itemsOrdenPedido = ref([] as any[]);

const totalPedidos = computed(() => itemsPedido.value.length);

const totalOrdenesPedido = computed(() => itemsOrdenPedido.value.length);


const expanded = ref([] as any);

const obtenerPedidos = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_APP_API_PEDIDOS}/pedido/obtener`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const copiaArray = [...data]
        itemsPedido.value = copiaArray;

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
        const copiaArray = [...data]
        itemsOrdenPedido.value = copiaArray;

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

        alert('Orden generada correctamente');
        obtenerOrdenesPedido();
    } catch (error: any) {

        alert(error.response.data.message);
    }
};

const dialog = ref(false);

const estadoSeleccionado = ref(0);
const idPedidoSeleccionado = ref(0);

const estadoOrdenPedidoSeleccionado = ref(0);
const idOrdenPedidoSeleccionado = ref(0);

const dialogOrden = ref(false);

const cambiarEstado = async (accion: string) => {
    if (accion === 'PEDIDO') {
        actualizarEstadoPedido();
    } else if (accion === 'ORDEN_PEDIDO') {
        actualizarEstadoOrdenPedido();
    }
};

const actualizarEstadoPedido = async () => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_APP_API_PEDIDOS}/pedido/cambiar-estado`, {
            idPedido: idPedidoSeleccionado.value,
            idEstadoPedido: estadoSeleccionado.value
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(data);
        dialog.value = false;
        obtenerPedidos();
    } catch (error: any) {
        console.log(error.response);
        alert(error.response.data.message);
    }
};

const actualizarEstadoOrdenPedido = async () => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_APP_API_PEDIDOS}/orden-pedido/cambiar-estado`, {
            idOrdenPedido: idOrdenPedidoSeleccionado.value,
            idEstOrdenPedido: estadoOrdenPedidoSeleccionado.value
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(data);
        dialogOrden.value = false;
        obtenerOrdenesPedido();
    } catch (error: any) {
        console.log(error.response);
        alert(error.response.data.message);
    }
};

const abrirModal = async (idPedido: number, idEstadoPedido: number, accion: string) => {
    if (accion === 'PEDIDO') {
        idPedidoSeleccionado.value = idPedido;
        estadoSeleccionado.value = idEstadoPedido;
        dialog.value = true;
    } else if (accion === 'ORDEN_PEDIDO') {
        idOrdenPedidoSeleccionado.value = idPedido;
        estadoOrdenPedidoSeleccionado.value = idEstadoPedido;
        dialogOrden.value = true;
    }

};

onMounted(() => {
    obtenerPedidos();
    obtenerOrdenesPedido();
});






</script>
