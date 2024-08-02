<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Dodaj nową poczke</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="addBox">
          <div class="field">
            <label class="label">Nazwa paczki</label>
            <div class="control">
              <input class="input" type="text" v-model="boxName" placeholder="Enter box name" required>
            </div>
          </div>
          <div class="field">
            <div class="control grid is-gap-2">
              <button class="button is-primary" type="submit">Dodaj nową poczke</button>
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
  name: 'AddBoxModal',
  emits: ['close'],
  setup(props, { emit }) {
    const boxStore = useBoxStore();
    const boxName = ref('');

    const addBox = () => {
      boxStore.addBox({ name: boxName.value });
      boxName.value = '';
      emit('close');
    };

    return { boxName, addBox };
  },
});
</script>