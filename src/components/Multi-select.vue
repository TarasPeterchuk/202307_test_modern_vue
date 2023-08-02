<template>
  <div class="muttiselect">
    <div v-if="label" class="multiselect__label">{{ label }}</div>
    <div @click.stop="toggleDropdown" class="muttiselect__element">
      <div class="multiselect__field">
        <span v-if="placeholder && !selectedItems.length" class="mutliselect__selection-text">{{
          placeholder
        }}</span>
        <div
          v-for="(item, index) in selectedItems"
          :key="item"
          :class="
            tags ? 'mutliselect__selection mutliselect__selection-tags' : 'mutliselect__selection'
          "
        >
          <span class="mutliselect__selection-text"
            >{{ item }} <span v-if="!tags && index < selectedItems.length - 1">,</span></span
          >
        </div>
      </div>
      <div class="mutliselect__append">{{ showDropdown ? '-' : '+' }}</div>
    </div>
    <div v-if="showDropdown" class="dropdown">
      <div v-if="search" class="dropdown__search-input">
        <input v-model="searchValue" @input="handleSearchChange" />
      </div>
      <div
        v-for="(element, index) in optionElementsSearch"
        :key="element.label"
        class="dropdown__element"
        @click="toggleSelection(element.value)"
        :style="`animation-delay: ${index / 50}s`"
      >
        <div v-if="multiple" class="dropdown__element-checkbox">
          <input type="checkbox" :checked="value.includes(element.value)" />
        </div>
        <div class="dropdown__element-title">{{ element.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, defineEmits } from 'vue'
import './multiselect.scss'
const props = defineProps({
  value: {
    type: [Object, Array, String, Number, null],
    default: null
  },
  modelValue: {
    type: [Object, Array, String, Number, null],
    default: null
  },
  multiple: {
    type: Boolean,
    default: false
  },
  tags: {
    type: Boolean,
    default: true
  },
  object: {
    type: Boolean,
    default: true
  },
  labelProp: {
    type: String,
    default: 'label'
  },
  valueProp: {
    type: String,
    default: 'id'
  },
  search: {
    type: Boolean,
    default: false
  },
  searchBy: {
    type: String,
    default: 'label'
  },
  hideSelected: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  default: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: null
  },
  items: {
    type: [Object, Array],
    default: () => ({})
  }
})

let value = props.modelValue ? props.modelValue : props.value
const showDropdown = ref(false)
const searchValue = ref('')

const labels = props.object ? props.items.map((el) => el[props.labelProp]) : props.items
const values = props.object ? props.items.map((el) => el[props.valueProp]) : props.items

const optionElement = labels
  .map((el, i) => ({ label: el, value: values[i] }))
  .filter((el) => (props.hideSelected ? !value.includes(el.value) : true))

const optionElementsSearch = ref(optionElement)

const selectedItemsFunc = (value) =>
  props.object
    ? props.items
        .filter((el) =>
          props.multiple ? value.includes(el[props.valueProp]) : value === el[props.valueProp]
        )
        .map((el) => el[props.labelProp])
    : labels.filter((el) => (props.multiple ? value.includes(el) : value === el))

const selectedItems = ref(selectedItemsFunc(value))

watch(
  () => props.value,
  (newValue) => {
    value = newValue
    selectedItems.value = selectedItemsFunc(newValue)
  }
)

watch(
  () => props.modelValue,
  (newValue) => {
    value = newValue
    selectedItems.value = selectedItemsFunc(newValue)
  }
)

const emit = defineEmits(['update:modelValue', 'select', 'change', 'search-change', 'deselect'])

const handleSearchChange = () => {
  emit('search-change')
  optionElementsSearch.value = optionElement.filter((el) =>
    el.label.toLowerCase().includes(searchValue.value.toLowerCase())
  )
}

const toggleDropdown = () => {
  if (!props.disabled) {
    showDropdown.value = !showDropdown.value
  }
}

const handleClickOutsideDropdown = (event) => {
  const dropdown = document.querySelector('.dropdown')
  if (dropdown && !dropdown.contains(event.target)) {
    showDropdown.value = false
  }
}

const toggleSelection = (item) => {
  let newValue = props.multiple ? [] : null
  if (!props.multiple) {
    emit('update:modelValue', item)
    emit('select', item)
    emit('change', item, value)
    showDropdown.value = false
  } else {
    if (!value.includes(item)) {
      newValue = [...value, item]
      emit('select', item)
    } else {
      newValue = value.filter((el) => el !== item)
      emit('deselect', item)
    }
    emit('update:modelValue', newValue)
    emit('change', newValue, value)
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutsideDropdown)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutsideDropdown)
})
</script>

<style></style>
