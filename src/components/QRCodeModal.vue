<!-- src/components/QRCodeModal.vue -->
<template>
  <div class="modal is-active" >
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Kod QR dla {{ box?.name || 'Pudełka' }}</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Tytuł</label>
          <div class="control">
            <input class="input" type="text" v-model="title" placeholder="Wprowadź tytuł">
          </div>
        </div>
        <div class="qr-code-container grid is-gap-3" id="printRange">
          <h3>{{box?.name}}</h3>
          <vue-qrcode :value="qrValue" :scale="number"></vue-qrcode>
          <p>{{box?.description}}</p>
        </div>
        <div class="field">
          <label class="label">Rozmiar</label>
          <div class="control">
            <input class="input" v-model="number" min="0" max="12" type="number" placeholder="Podaj rozmiar"></input>
          </div>
          <label class="label">Opis</label>
          <div class="control">
            <textarea class="textarea" v-model="description" placeholder="Wprowadź opis"></textarea>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="saveQRCode">Zapisz</button>
        <button class="button is-info" v-print="'#printRange'">Wydrukuj QR Code</button>
        <button class="button is-danger" @click="$emit('close')">Anuluj</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import VueQrcode from "vue-qrcode";
import print from 'vue3-print-nb';
import { useBoxStore } from '../stores/boxStore';
export default defineComponent({
  name: 'QRCodeModal',
  components: { VueQrcode },
  directives: {print},
  props: {
    box: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const boxStore = useBoxStore();
    const title = ref(props.box?.name||'');
    const description = ref(props.box?.description||'');
    const number = ref(6)
    const qrValue = computed(() => {
      return JSON.stringify({
        id: props.box?.id,
      });
    });

    const saveQRCode = () => {
      const updatedBox = {
        ...props.box,
        description: description.value,
        name:title.value,
        itemCount: props.box?.items?.length || 0,
      };
      boxStore.updateBox(updatedBox);
      console.log('Zapisywanie danych kodu QR:', { title: title.value, description: description.value });
      emit('close');
    };

    const printQRCode = () => {
      usePrint().print('print-section');
    };

    return {
      title,
      description,
      qrValue,
      saveQRCode,
      printQRCode,
      number
    };
  },
});
</script>

<style scoped>
.qr-code-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}
</style>