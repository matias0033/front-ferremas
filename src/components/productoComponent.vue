<template>
    <v-container>
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="10">
              <h3>Productos</h3>
            </v-col>
            <v-col cols="2">
              <v-btn @click="dialog = true" color="primary">Nuevo</v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-data-table :headers="headersProducto" :items="itemsProducto" item-key="idProducto">
            <template v-slot:top>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ editedItem.idProducto ? 'Editar Producto' : 'Nuevo Producto' }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        
                        <v-col cols="12" >
                          <v-text-field v-model="editedItem.nombreProducto" label="Nombre Producto"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-model="editedItem.idCategoria"
                            :items="categoriasOptions"
                            label="Categoría"
                            v-bind:value="editedItem.idCategoria"
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model="editedItem.descripcionProducto" label="Descripcion"></v-text-field>
                        </v-col>
                        <v-col cols="6" >
                          <v-text-field v-model="editedItem.stock" label="Cantidad"></v-text-field>
                        </v-col>
                        <v-col cols="6" >
                          <v-text-field v-model="editedItem.precio" label="Precio Unitario"></v-text-field>
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
            </template>
            <template v-slot:item.idCategoria="{ item }">
              {{ categorias[item.idCategoria] }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const categorias = {
  3: 'Polera',
  4: 'Pantalon',
  5: 'Calcetas',
};

const categoriasOptions = Object.keys(categorias).map(key => ({ title: categorias[key], value: parseInt(key) }));

  
  const headersProducto = ref([
    { title: 'ID Producto', value: 'idProducto' },
    { title: 'Nombre Producto', value: 'nombreProducto' },
    { title: 'Categoria', value: 'idCategoria'  },
    { title: 'Descripcion', value: 'descripcionProducto' },
    { title: 'Cantidad', value: 'stock' },
    { title: 'Precio Unitario', value: 'precio' },
    { title: 'Acciones', value: 'actions', sortable: false },
  ]);
  
  const itemsProducto = ref([]);
  const dialog = ref(false);
  const editedItem = ref({
    idProducto: 0,
    nombreProducto: '',
    descripcionProducto: '',
    stock: 0,
    precio: 0,
    idCategoria: null,
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
  
  const save = async () => {
    try {
      if (editedItem.value.idProducto) {
        await axios.put(`${import.meta.env.VITE_APP_API_INVENTARIO}/productos/modificar/${editedItem.value.idProducto}`, editedItem.value);
      } else {
        await axios.post(`${import.meta.env.VITE_APP_API_INVENTARIO}/productos/crear`, editedItem.value);
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
  
  const editItem = (item) => {
    editedItem.value = { ...item };
    dialog.value = true;
  };
  
  const resetEditedItem = () => {
    editedItem.value = {
      idProducto: 0,
      nombreProducto: '',
      descripcionProducto: '',
      stock: 0,
      precio: 0,
      idCategoria: null,
    };
  };
  
  onMounted(() => {
    obtenerProductos();
  });
  </script>
  