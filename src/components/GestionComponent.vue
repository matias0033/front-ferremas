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

    <v-container>
        <v-row justify="center">

            <v-col cols="12" lg="8">

                <v-card elevation="2">
                    <v-card-text>

                        <v-col cols="12">
                            <v-row>
                                <v-col cols="12" lg="6">
                                    <h2>Ordenes de compra (Comprador)</h2>

                                    <v-divider class="mt-3"></v-divider>
                                </v-col>

                                <v-col cols="12" lg="6"  class="text-right" >
                                    <v-btn color="primary" to="/orden-compra" size="small" class="mb-1">
                                        <v-icon left>mdi-plus</v-icon>
                                        Nueva Orden

                                    </v-btn>
                                </v-col>


                            </v-row>
                            <div class="py-5"></div>


                            <v-row>
                                <!-- titulo a la izq y iconos a la derecha en la misma fila -->
                                <v-col cols="6" class="mt-6">
                                    <h3>Total de compras: {{ totalPedidos }}</h3>
                                </v-col>
                                <v-col cols="6" class="text-right">
                                    <v-text-field append-inner-icon="mdi-filter" label="Filtrar" single-line
                                        hide-details variant="underlined"></v-text-field>
                                </v-col>
                            </v-row>

                        </v-col>

                        <v-col cols="12">
                            <VDataTable :headers="headersPedido" :items="itemsPedido" items-per-page="10"
                                item-key="idPedido" class="elevation-2" item-value="idPedido" show-expand
                                :expanded.sync="expanded">

                                <template #item.nombreEstadoPedido="{ item }">
                                    <v-chip color="primary" small v-if="item.idEstadoPedido">{{ item.nombreEstadoPedido
                                        }}</v-chip>
                                </template>


                                <template v-slot:expanded-row="{ columns, item }">
                                    <tr>
                                        <td :colspan="columns.length">
                                            <v-data-table :headers="headersProducto" :items="item.productos"
                                                density="compact">
                                                <template #bottom></template>

                                            </v-data-table>
                                        </td>
                                    </tr>
                                </template>

                                <!-- Agregar botones de acción -->
                                <template v-slot:item.actions="{ item }">
                                    <v-row class="mr-5">

                                        <v-col cols="6">
                                            <v-btn color="primary"
                                                @click="abrirModal(item.idPedido, item.idEstadoPedido, 'PEDIDO')"
                                                style="font-size:10px">Cambiar <br>
                                                Estado
                                            </v-btn>
                                        </v-col>

                                    </v-row>


                                </template>

                            </VDataTable>
                        </v-col>
                    </v-card-text>

                </v-card>

            </v-col>
        </v-row>
    </v-container>


</template>


<script lang="ts" setup>
import axios from 'axios';

const headersPedido = ref([
    { title: '', key: 'data-table-expand' },
    { title: 'Nº Orden', align: 'start', sortable: false, value: 'idPedido' },
    { title: 'Estado', align: 'start', value: 'nombreEstadoPedido' },
    { title: 'Total + IVA', align: 'start', value: 'total' },
    { title: 'Acciones', key: 'actions' },


] as any[]);


const headersProducto = ref([
    { title: 'Producto', value: 'nombreProducto' },
    { title: 'Cantidad', value: 'Cantidad_Productos' },
    { title: 'Precio Unit.', value: 'Precio_Unitario' },
    { title: 'Total ', value: 'Precio_Total_Por_Producto' },
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

// const itemsOrdenPedido = ref([] as any[]);

const totalPedidos = computed(() => itemsPedido.value.length);



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



// const generarOrden = async (idPedido: number) => {
//     try {
//         const { data } = await axios.post(`${import.meta.env.VITE_APP_API_PEDIDOS}/orden-pedido/generar`, {
//             idPedido
//         }, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         });
//         console.log(data);

//         alert('Orden generada correctamente');
//         obtenerOrdenesPedido();
//     } catch (error: any) {

//         alert(error.response.data.message);
//     }
// };

const dialog = ref(false);

const estadoSeleccionado = ref(0);
const idPedidoSeleccionado = ref(0);

const estadoOrdenPedidoSeleccionado = ref(0);
const idOrdenPedidoSeleccionado = ref(0);

const dialogOrden = ref(false);

const cambiarEstado = async (accion: string) => {
    if (accion === 'PEDIDO') {
        actualizarEstadoPedido();
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

});






</script>
