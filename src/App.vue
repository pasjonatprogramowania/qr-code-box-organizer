<!-- src/App.vue -->
<template>
  <div id="app">
    <div class="section">
      <component :is="currentView" @open-box="openBoxContents"></component>
    </div>

    <div class="tabs is-boxed is-fullwidth">
      <ul>
        <li :class="{ 'is-active': currentView === QRScanner }">
          <a @click="currentView = QRScanner">
            <span class="icon is-small"><i class="fas fa-qrcode"></i></span>
            <span>Skanuj QR</span>
          </a>
        </li>
        <li :class="{ 'is-active': currentView === BoxList }">
          <a @click="currentView = BoxList">
            <span class="icon is-small"><i class="fas fa-box"></i></span>
            <span>Pudełka</span>
          </a>
        </li>
      </ul>
    </div>

    <AddBoxModal v-if="showAddBoxModal" @close="showAddBoxModal = false" />
    <ExportDataModal v-if="showExportDataModal" @close="showExportDataModal = false" />
    <BoxContentsModal v-if="selectedBox" :box="selectedBox" @close="selectedBox = null" />
    <QRCodeModal v-if="showQrCodeModal" :box="selectedBox" @close="showQrCodeModal = null" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BoxList from './components/BoxList.vue';
import QRScanner from './components/QRScanner.vue';
import AddBoxModal from './components/AddBoxModal.vue';
import ExportDataModal from './components/ExportDataModal.vue';
import BoxContentsModal from './components/BoxContentsModal.vue';
import QRCodeModal from "@/components/QRCodeModal.vue";

export default defineComponent({
  name: 'App',
  components: {
    QRCodeModal,
    BoxList,
    QRScanner,
    AddBoxModal,
    ExportDataModal,
    BoxContentsModal
  },
  setup() {
    const currentView = ref(BoxList);
    const showAddBoxModal = ref(false);
    const showExportDataModal = ref(false);
    const showQrCodeModal = ref(false);
    const selectedBox = ref(null);

    const openBoxContents = (box) => {
      selectedBox.value = box;
    };

    return {
      currentView,
      showAddBoxModal,
      showExportDataModal,
      showQrCodeModal,
      selectedBox,
      openBoxContents,
      BoxList,
      QRScanner

    };
  }
});
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';

#app {
  font-family: Arial, sans-serif;
}

.tabs {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
}

.buttons {
  margin-top: 1rem;
}
</style>