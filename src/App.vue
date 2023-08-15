<template>
  <div
    :style="{
      width: '400px'
    }"
  >
    <Multiselect
      :items="itemsObjects"
      v-model="value"
      :tags="true"
      multiple
      :disabled="false"
      placeholder="select item"
      :object="true"
      :hideSelected="false"
      labelProp="name"
      @select="handleSelect"
      @deselect="handleDeselect"
      @search-change="handleSearchChange"
      @change="handleChange"
    />
    <!-- 
      label="-label-"
      search
      v-model : 
        v-model="value"
      or value:
        :value="value"
        @update:modelValue="value = $event"
     -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Multiselect from './components/MultiSelect.vue'

const itemsArray = [1, '2', 3]
const itemsObjects = [
  { id: '1', name: 'Label 1' },
  { id: '2', name: 'Label 2' },
  { id: '3', name: 'Label 3' },
  { id: '4', name: 'Label 4' },
  { id: '5', name: 'Label 5' },
  { id: '6', name: 'Label 6' }
]

const value = ref(['2'])

const handleSelect = (option) => {
  console.log(`event select: ${option}`)
}
const handleDeselect = (option) => {
  console.log(`event deselect: ${option}`)
}
const handleSearchChange = () => {
  console.log('event search-change')
}
const handleChange = (newValue, oldValue) => {
  console.log(`event change: new:${newValue}, old:${oldValue}`)
}
</script>
