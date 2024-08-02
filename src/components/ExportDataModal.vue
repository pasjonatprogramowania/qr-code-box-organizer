<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Wyeksporuj dane</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <div class="buttons">
          <button class="button is-primary" @click="exportCSV">Export do CSV</button>
          <button class="button is-info" @click="exportToGoogleSheets">Export do Google Sheets</button>
          <button class="button is-danger" @click="$emit('close')">Anuluj</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {useBoxStore} from '../stores/boxStore';
import {saveAs} from 'file-saver';
import {utils, write} from 'xlsx';

export default defineComponent({
  name: 'ExportDataModal',
  emits: ['close'],
  setup(props, { emit }) {
    const boxStore = useBoxStore();

    const exportCSV = () => {
      const data = boxStore.boxes.flatMap(box =>
          box.items.map(item => ({
            'Box Name': box.name,
            'Item Description': item.description,
            'Quantity': item.quantity,
            'Value': item.value,
            'Date Added': item.dateAdded,
            'Date Removed': item.dateRemoved
          }))
      );

      const worksheet = utils.json_to_sheet(data);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, 'Boxes');
      const excelBuffer = write(workbook, { bookType: 'csv', type: 'array' });
      saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'boxes.csv');
      emit('close');
    };

    const exportToGoogleSheets = () => {
      // Implement Google Sheets API integration here
      console.log('Exporting to Google Sheets...');
      emit('close');
    };

    return { exportCSV, exportToGoogleSheets };
  },
});
</script>