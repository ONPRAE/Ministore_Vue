<template>
  <div class="q-pa-md">
    <div class="q-py-md">
      <q-btn icon="add" @click="onCreateCustomer" label="Add Customer" />
    </div>
    <q-table
      title="Customers"
      :rows="customerRows"
      :columns="customerColumns"
      row-key="customer_id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="edit" @click="onEditCustomer(props.row.customer_id)" />
          <q-btn icon="delete" @click="onDeleteCustomer(props.row.customer_id)" />
        </q-td>
      </template>
    </q-table>

    <div class="q-py-md">
      <q-btn icon="add" @click="onCreateProduct" label="Add Product" />
    </div>
    <q-table
      title="Products"
      :rows="productRows"
      :columns="productColumns"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="edit" @click="onEditProduct(props.row.id)" />
          <q-btn icon="delete" @click="onDeleteProduct(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router';

const customerColumns = ref([
  { name: 'customer_id', align: 'center', label: 'Customer ID', field: 'customer_id', sortable: true },
  { name: 'first_name', align: 'left', label: 'First Name', field: 'first_name', sortable: true },
  { name: 'last_name', align: 'left', label: 'Last Name', field: 'last_name', sortable: true },
  { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
  { name: 'address', align: 'left', label: 'Address', field: 'address', sortable: true },
  { name: 'phone_number', align: 'left', label: 'Phone Number', field: 'phone_number', sortable: true },
  { name: 'actions', align: 'center', label: 'Actions', field: 'actions', sortable: false },
]);
const customerRows = ref([]);

const productColumns = ref([
  { name: 'product_id', align: 'center', label: 'Product ID', field: 'product_id', sortable: true },
  { name: 'name', align: 'left', label: 'Product Name', field: 'name', sortable: true },
  { name: 'description', align: 'right', label: 'Description', field: 'description', sortable: true },
  { name: 'price', align: 'right', label: 'Price', field: 'price', sortable: true },
  { name: 'category', align: 'right', label: 'Category', field: 'category', sortable: true },
  { name: 'image_url', align: 'right', label: 'image_url', field: 'image_url', sortable: true },
  { name: 'actions', align: 'center', label: 'Actions', field: 'actions', sortable: false }, 
]);
const productRows = ref([]);

const fetchCustomers = () => {
  fetch('http://localhost:8800/api/v1/customers')
    .then(res => res.json())
    .then(result => {
      customerRows.value = result;
    })
    .catch(error => console.error('Error fetching customers:', error));
};

const fetchProducts = () => {
  fetch('http://localhost:8800/api/v1/products')
    .then(res => res.json())
    .then(result => {
      productRows.value = result;
    })
    .catch(error => console.error('Error fetching products:', error));
};

// Initial fetch
fetchCustomers();
fetchProducts();

const onEditCustomer = (id) => {
  router.push(`/update/${id}`);
};

const onDeleteCustomer = (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(`http://localhost:8800/api/v1/customers/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      fetchCustomers(); // Refresh customer data
    })
    .catch(error => console.error('Error deleting customer:', error));
};

const onCreateCustomer = () => {
  router.push('/create');
};


const onEditProduct = (id) => {
  router.push(`/update/${id}`);
};

const onDeleteProduct = (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(`http://localhost:8800/api/v1/customers/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      fetchCustomers(); // Refresh customer data
    })
    .catch(error => console.error('Error deleting customer:', error));
};

const onCreateProduct = () => {
  router.push('/create');
};

</script>