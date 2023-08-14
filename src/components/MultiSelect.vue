<template>
  <div class="muttiselect">
    <div @click.stop="toggleDropdown" class="muttiselect__element">
      <div class="multiselect__field">
        <span v-if="placeholder && !selectedItems.length" class="mutliselect__selection-text">{{
          placeholder
        }}</span>
        <!---->
        <div v-if="tags" class="muttiselect__chips">
          <div
            v-for="item in selectedItems"
            :key="item"
            class="mutliselect__chip"
            @click="
              (event) => {
                event.stopPropagation()
              }
            "
          >
            <span class="mutliselect__chip-text">{{ item.label }} </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 384 512"
              @click="toggleSelection(item.value)"
            >
              <path
                fill="currentColor"
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7L86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256L41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z"
              />
            </svg>
          </div>
        </div>
        <span v-else>{{
          selectedItems.length
            ? selectedItems.reduce((acc, el) => (acc === '' ? el.label : acc + ', ' + el.label), '')
            : ''
        }}</span>
        <!---->
      </div>
      <div class="mutliselect__append">
        <svg
          v-if="showDropdown"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"
          />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"
          />
        </svg>
      </div>
    </div>
    <div v-if="showDropdown" class="mutliselect__dropdown">
      <div v-if="search" class="mutliselect__dropdown-input">
        <input v-model="searchValue" @input="handleSearchChange" />
      </div>
      <div
        v-for="element in optionElementsSearch"
        :key="element.label"
        class="mutliselect__dropdown-element"
        @click="toggleSelection(element.value)"
      >
        <div v-if="multiple" class="mutliselect__dropdown-element-checkbox">
          <input type="checkbox" :checked="value.includes(element.value)" />
        </div>
        <div class="mutliselect__dropdown-element-title">{{ element.label }}</div>
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
const itemsArray = labels.map((el, index) => ({ label: el, value: values[index] }))

const optionElements = labels
  .map((el, i) => ({ label: el, value: values[i] }))
  .filter((el) => (props.hideSelected ? !value.includes(el.value) : true))

const optionElementsSearch = ref(optionElements)

// const selectedItemsFunc = (value) =>
//   props.object
//     ? props.items
//         .filter((el) =>
//           props.multiple ? value.includes(el[props.valueProp]) : value === el[props.valueProp]
//         )
//         .map((el) => el[props.labelProp])
//     : labels.filter((el) => (props.multiple ? value.includes(el) : value === el))

// const selectedItemsFunc = (value) =>
//   itemsArray.filter((el) => (props.multiple ? value.includes(el.value) : value === el.value))

const selectedItemsFunc = (value) =>
  props.multiple
    ? value.map((el) => ({
        label: itemsArray.find((element) => element.value === el).label,
        value: el
      }))
    : [{ label: itemsArray.find((element) => element.value === value).label, value: value }]

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
  optionElementsSearch.value = optionElements.filter((el) =>
    el.label.toLowerCase().includes(searchValue.value.toLowerCase())
  )
}

const toggleDropdown = () => {
  if (!props.disabled) {
    showDropdown.value = !showDropdown.value
  }
}

const handleClickOutsideDropdown = (event) => {
  const dropdown = document.querySelector('.mutliselect__dropdown')
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
