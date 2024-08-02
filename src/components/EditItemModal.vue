<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edytuj przedmiot: </p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="updateItem">
          <div class="field">
            <label class="label">Opis</label>
            <div class="control">
              <input class="input" v-model="editedItem.description" required>
            </div>
          </div>
          <div class="field">
            <label class="label">Ilość</label>
            <div class="control">
              <input class="input" type="number" v-model.number="editedItem.quantity" required>
            </div>
          </div>
          <div class="field">
            <label class="label">Wartość</label>
            <div class="control">
              <input class="input" type="number" step="0.01" v-model.number="editedItem.value" required>
            </div>
          </div>
          <div class="field">
            <label class="label">Data dodania</label>
            <div class="control">
              <input class="input" type="date" v-model="editedItem.dateAdded" required>
            </div>
          </div>
          <div class="field">
            <label class="label">Data usunięcia</label>
            <div class="control">
              <input class="input" type="date" v-model="editedItem.dateRemoved">
            </div>
          </div>
          <div class="field">
            <label class="label">Zdjęcie</label>
            <div class="control">
              <input type="file" @change="handleImageUpload" accept="image/*">
            </div>
          </div>
          <div v-if="editedItem.image" class="field">
            <img :src="editedItem.image" alt="Item image" style="width: 100px; height: 100px; object-fit: cover;">
          </div>
          <div class="field">
            <label class="label">Notatka</label>
            <div class="control">
              <textarea class="textarea" type="text" v-model="editedItem.note"></textarea>
            </div>
          </div>
          <div class="field">
            <div class="grid">
              <button class="button is-primary" type="submit">Zapisz zmiany</button>
              <button class="button is-danger" @click="$emit('close')">Anuluj</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue';
import {useBoxStore} from '../stores/boxStore';

export default defineComponent({
  name: 'EditItemModal',
  props: ['item', 'boxId'],
  emits: ['close'],
  setup(props, { emit }) {
    const boxStore = useBoxStore();
    const editedItem = ref({ ...props.item });

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          editedItem.value.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const updateItem = () => {
      boxStore.updateItem(props.boxId, editedItem.value);
      emit('close');
    };

    return { editedItem, handleImageUpload, updateItem };
  },
});
</script>