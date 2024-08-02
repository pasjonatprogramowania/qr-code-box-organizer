<!-- src/components/BoxList.vue -->
<template>
  <div class="box-list">
    <div class="level">
      <div class="level-left">
        <h2 class="title is-4">Pudełka</h2>
      </div>
    </div>
    <div class="columns is-multiline">
      <div v-for="box in boxStore.boxes" :key="box.id" class="column is-one-third">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              {{ box.name }}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              Przedmioty: {{ box.items.length }}
            </div>
          </div>
          <footer class="card-footer grid has-text-centered ">
            <a class="card-footer-item button p-4 " @click="addItemsToBox(box)">Dodaj przedmioty</a>
            <a class="card-footer-item button p-4" @click="viewDetails(box)">Szczegóły</a>
            <a class="card-footer-item button p-4" @click="showQRCode(box)">Kod QR</a>
            <a class="card-footer-item is-danger button p-4" @click="deleteBox(box.id)">Usuń</a>
          </footer>
        </div>
      </div>
    </div>
    <div class="grid">
        <button class="button is-primary" @click="openAddBoxModal">
          Dodaj pudełko
        </button>
        <button class="button is-info" @click="openExportDataModal">
          Eksportuj do CSV
        </button>
      </div>
    <AddItemModal v-if="selectedBox" :box="selectedBox" @close="selectedBox = null" />
    <QRCodeModal v-if="showQRCodeModal" :box="selectedQRBox" @close="closeQRCodeModal" />
    <AddBoxModal v-if="showAddBoxModal" @close="closeAddBoxModal" />
    <ExportDataModal v-if="showExportDataModal" @close="closeExportDataModal" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useBoxStore } from '../stores/boxStore';
import AddItemModal from './AddItemModal.vue';
import QRCodeModal from './QRCodeModal.vue';
import AddBoxModal from './AddBoxModal.vue';
import ExportDataModal from './ExportDataModal.vue';

export default defineComponent({
  name: 'BoxList',
  components: { AddItemModal, QRCodeModal, AddBoxModal, ExportDataModal },
  emits: ['open-box'],
  setup(props, { emit }) {
    const boxStore = useBoxStore();
    const selectedBox = ref(null);
    const showQRCodeModal = ref(false);
    const selectedQRBox = ref(null);
    const showAddBoxModal = ref(false);
    const showExportDataModal = ref(false);

    const viewDetails = (box) => {
      emit('open-box', box);
    };

    const addItemsToBox = (box) => {
      selectedBox.value = box;
    };

    const deleteBox = (boxId) => {
      if (confirm(`Czy na pewno chcesz usunąć to pudełko?`)) {
        boxStore.deleteBox(boxId);
      }
    };

    const showQRCode = (box) => {
      selectedQRBox.value = box;
      showQRCodeModal.value = true;
    };

    const closeQRCodeModal = () => {
      showQRCodeModal.value = false;
      selectedQRBox.value = null;
    };

    const openAddBoxModal = () => {
      showAddBoxModal.value = true;
    };

    const closeAddBoxModal = () => {
      showAddBoxModal.value = false;
    };

    const openExportDataModal = () => {
      showExportDataModal.value = true;
    };

    const closeExportDataModal = () => {
      showExportDataModal.value = false;
    };

    return {
      boxStore,
      selectedBox,
      addItemsToBox,
      viewDetails,
      deleteBox,
      showQRCode,
      showQRCodeModal,
      selectedQRBox,
      closeQRCodeModal,
      showAddBoxModal,
      openAddBoxModal,
      closeAddBoxModal,
      showExportDataModal,
      openExportDataModal,
      closeExportDataModal,
    };
  },
});
</script>

<style scoped>
.fixed-grid {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
</style>