<template>
  <div>
    <Multiselect
      :items="items"
      :selectedItems="selectedItems"
      @update:selectedItems="selectedItems = $event"
      multiple
      search
      placeholder="select item"
      @select="handleSelect"
      @deselect="handleDeselect"
      @search-change="handleSearchChange"
    />
  </div>
  <!-- @change="handleChange"-->
</template>

<script setup>
import { ref } from 'vue'
import Multiselect from './components/Multi-select.vue'

const items = ['Apple', 'Banana', 'Cherry', 'Durian', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Orange']

const selectedItems = ref(['Cherry'])

const handleSelect = (option) => {
  console.log('Selected option:', option)
}
const handleDeselect = (option) => {
  console.log('Deselectsd option:', option)
}
const handleSearchChange = () => {
  console.log('Search value changed')
}
</script>
