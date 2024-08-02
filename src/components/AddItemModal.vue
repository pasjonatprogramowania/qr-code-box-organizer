<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Dodaj przedmiot do paczki: {{ box.name }}</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="addItem">
          <div class="field">
            <label class="label">Opis</label>
            <div class="control">
              <input class="input" v-model="item.description" placeholder="Description" required>
            </div>
          </div>
          <div class="field">
            <label class="label">Ilość</label>
            <div class="control">
              <input class="input" v-model.number="item.quantity" type="number" placeholder="Quantity" required>
            </div>
          </div>
          <div class="field">
            <label class="label">Wartość</label>
            <div class="control">
              <input class="input" v-model.number="item.value" type="number" step="0.01" placeholder="Value" required>
            </div>
          </div>
          <div class="field">
            <label class="label">Data dodania</label>
            <div class="control">
              <input class="input" v-model="item.dateAdded" type="date" required>
            </div>
          </div>
          <div class="field">
            <label class="label">Data usunięcia</label>
            <div class="control">
              <input class="input" v-model="item.dateRemoved" type="date">
            </div>
          </div>
          <div class="field">
            <label class="label">Zdjęcie</label>
            <div class="control">
              <input type="file" @change="handleImageUpload" accept="image/*">
            </div>
          </div>
          <div class="field">
            <label class="label">Notatka</label>
            <div class="control">
              <textarea class="textarea" type="text" v-model="item.note"></textarea>
            </div>
          </div>
          <div class="field">
            <div class="control grid is-gap-2">
              <button class="button is-primary" type="submit">Dodaj przedmiot</button>
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
  name: 'AddItemModal',
  props: ['box'],
  emits: ['close'],
  setup(props, { emit }) {
    const boxStore = useBoxStore();
    const item = ref({
      description: '',
      quantity: 1,
      value: 0,
      dateAdded: new Date().toISOString().split('T')[0],
      dateRemoved: '',
      image: null,
      note:''
    });

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        item.value.image = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    const addItem = () => {
      boxStore.addItem(props.box.id, { ...item.value });
      emit('close');
    };

    return { item, handleImageUpload, addItem };
  },
});
</script>