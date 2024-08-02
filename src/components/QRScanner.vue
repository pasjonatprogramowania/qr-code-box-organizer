<template>
  <div class="qr-scanner is-grid">
    <h2 class="title is-4">Zeskanuj kod</h2>
    <QrStream :constraints="{ facingMode }" @error="onError" @decode="onDecode" @init="onInit">
    </QrStream>
  </div>
</template>

<script>
import { QrStream } from 'vue3-qr-reader';
import { useBoxStore } from '../stores/boxStore';
import {ref} from "vue";

export default {
  components: { QrStream },
  setup(props, { emit }) {
    const boxStore = useBoxStore();
    const facingMode =  ref('environment');
    const result = ref('')
    function switchCamera() {
      switch (facingMode) {
        case 'environment':
          facingMode.value = 'user'
          break
        case 'user':
          facingMode.value = 'environment'
          break
      }
    }

    function onDecode (detectedCodes){
      console.log(JSON.parse(detectedCodes)?.id);
      const box = boxStore.boxes.find(box => box.id === JSON.parse(detectedCodes)?.id);
      if (box) {
        emit('open-box', box);
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

    return { onDecode, onInit,switchCamera,result };
  }
};
</script>