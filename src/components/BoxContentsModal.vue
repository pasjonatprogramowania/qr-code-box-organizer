<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <h2 class="modal-card-title">Przedmiot paczki: {{ box.name }}</h2>
      <header class="modal-card-head">
        <section class="modal-card-body">
          <div>
            <div class="card" v-for="item in box.items" :key="item.id">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img v-if="item.image" class="image" :src="loadImgULR(item.image)" alt="Item image">
                </figure>
              </div>
              <div class="content">
                <p>Opis: {{ item.description }}</p>
                <p>Notatka: {{ item.note }}</p>

              </div>
              <div class="grid">
                <button class="button is-info" @click="editItem(item)">Edytuj/Zobacz</button>
                <button class="button is-danger" @click="deleteItem(item.id)">Usuń</button>
              </div>
              </div>
          </div>
          <div class="grid mt-6">
            <button class="is-danger button" aria-label="close" @click="$emit('close')">Zamknij okno</button>
          </div>
        </section>
      </header>
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
    function loadImgULR(img){
      return  new URL(img,import.meta.url).href;
    }

    const editItem = (item) => {
      editingItem.value = {...item};
    };

    const deleteItem = (itemId) => {
      if (confirm(`Are you sure you want to delete this item?`)) {
        boxStore.deleteItem(props.box.id, itemId);
      }
    };

    return {editItem, deleteItem, editingItem,loadImgULR};
  },
});
</script>