// src/stores/boxStore.js
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useBoxStore = defineStore('box', {
    state: () => ({
        boxes: useStorage('boxes', []),
    }),
    actions: {
        addBox(box) {
            this.boxes.push({ ...box, id: Date.now(), items: [],description:'',itemCount:0 });
        },
        deleteBox(boxId) {
            this.boxes = this.boxes.filter(box => box.id !== boxId);
        },
        addItem(boxId, item) {
            const box = this.boxes.find(box => box.id === boxId);
            if (box) {
                box.items.push({ ...item, id: Date.now() });
            }
        },
        deleteItem(boxId, itemId) {
            const box = this.boxes.find(box => box.id === boxId);
            if (box) {
                box.items = box.items.filter(item => item.id !== itemId);
            }
        },
        updateItem(boxId, updatedItem) {
            const box = this.boxes.find(box => box.id === boxId);
            if (box) {
                const itemIndex = box.items.findIndex(item => item.id === updatedItem.id);
                if (itemIndex !== -1) {
                    box.items[itemIndex] = updatedItem;
                }
            }
        },
        updateBox(updatedBox) {
            const boxIndex = this.boxes.findIndex(box => box.id === updatedBox.id);
            if (boxIndex !== -1) {
                this.boxes[boxIndex] = updatedBox;
            }
        },
    },
});