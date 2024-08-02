<template>
  <div class="qr-scanner is-grid">
    <h2 class="title is-4">Scan QR Code</h2>
    <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';
import { useBoxStore } from '../stores/boxStore';

export default {
  components: { QrcodeStream },
  setup() {
    const boxStore = useBoxStore();

    const onDecode = (decodedString) => {
      const box = boxStore.boxes.find(box => box.id.toString() === decodedString);
      if (box) {
        // Emit an event to open the box contents
        this.$emit('open-box', box);
      } else {
        alert('Box not found');
      }
    };

    const onInit = async (promise) => {
      try {
        await promise;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          alert('ERROR: you need to grant camera access permission');
        } else if (error.name === 'NotFoundError') {
          alert('ERROR: no camera on this device');
        } else if (error.name === 'NotSupportedError') {
          alert('ERROR: secure context required (HTTPS, localhost)');
        } else if (error.name === 'NotReadableError') {
          alert('ERROR: is the camera already in use?');
        } else if (error.name === 'OverconstrainedError') {
          alert('ERROR: installed cameras are not suitable');
        } else if (error.name === 'StreamApiNotSupportedError') {
          alert('ERROR: Stream API is not supported in this browser');
        } else if (error.name === 'InsecureContextError') {
          alert('ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.');
        } else {
          alert(`ERROR: Camera error (${error.name})`);
        }
      }
    };

    return { onDecode, onInit };
  }
};
</script>