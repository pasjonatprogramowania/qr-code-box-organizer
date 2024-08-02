<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Przedmiot paczki: {{ box.name }}</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <table class="table is-fullwidth">
          <thead>
          <tr>
            <th>Opis</th>
            <th>Ilość</th>
            <th>Zdjęcie</th>
            <th>Notatka</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in box.items" :key="item.id">
            <td>{{ item.description }}</td>
            <td>{{ item.quantity }}</td>
            <td>
              <img v-if="item.image" :src="item.image" alt="Item image" style="width: 50px; height: 50px; object-fit: cover;">
            </td>
            <td>{{ item.note }}</td>
            <td>
              <div class="grid grid-cols-2">
                <button class="button is-small is-info" @click="editItem(item)">Edytuj</button>
                <button class="button is-small is-danger" @click="deleteItem(item.id)">Usuń</button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </section>
    </div>
    <EditItemModal v-if="editingItem" :item="editingItem" :boxId="box.id" @close="editingItem = null" />
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue';
import {useBoxStore} from '../stores/boxStore';
import EditItemModal from './EditItemModal.vue';

export default defineComponent({
  name: 'BoxContentsModal',
  components: { EditItemModal },
  props: ['box'],
  emits: ['close'],
  setup(props) {
    const boxStore = useBoxStore();
    const editingItem = ref(null);

    const editItem = (item) => {
      editingItem.value = {...item};
    };

    const deleteItem = (itemId) => {
      if (confirm(`Are you sure you want to delete this item?`)) {
        boxStore.deleteItem(props.box.id, itemId);
      }
    };

    return {editItem, deleteItem, editingItem};
  },
});
</script>