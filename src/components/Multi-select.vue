<template>
  <div class="muttiselect">
    <div @click.stop="toggleDropdown" class="muttiselect__element">
      <div class="multiselect__field">
        <span v-if="placeholder && !selectedItems.length" class="mutliselect__selection-text">{{
          placeholder
        }}</span>
        <div v-for="(item, index) in selectedItems" :key="item" class="mutliselect__selection">
          <span class="mutliselect__selection-text"
            >{{ item }} <span v-if="index < selectedItems.length - 1">,</span></span
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
        v-for="item in filteredItems"
        :key="item"
        class="dropdown__element"
        @click="toggleSelection(item)"
      >
        <div v-if="multiple" class="dropdown__element-checkbox">
          <input type="checkbox" :checked="selectedItems.includes(item)" />
        </div>
        <div class="dropdown__element-title">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineEmits } from 'vue'

const props = defineProps({
  value: {
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
  },
  selectedItems: {
    type: [Object, Array],
    default: () => ({})
  }
})

const showDropdown = ref(false)
const searchValue = ref('')
const filteredItems = ref(props.items)

const handleSearchChange = () => {
  emit('search-change')
  filteredItems.value = props.items.filter((el) =>
    el.toLowerCase().includes(searchValue.value.toLowerCase())
  )
}

const emit = defineEmits(['update:selectedItems', 'select', 'change', 'search-change', 'deselect'])

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleClickOutsideDropdown = (event) => {
  const dropdown = document.querySelector('.dropdown')
  if (dropdown && !dropdown.contains(event.target)) {
    showDropdown.value = false
  }
}

const toggleSelection = (item) => {
  const updatedItems = [...props.selectedItems]
  const index = props.selectedItems.indexOf(item)
  if (!props.multiple) {
    updatedItems.length = 0
    updatedItems.push(item)
    emit('update:selectedItems', updatedItems)
    showDropdown.value = false
    emit('select', item)
    return
  }
  if (index === -1) {
    emit('select', item)
    updatedItems.push(item)
  } else {
    emit('deselect', item)
    updatedItems.splice(index, 1)
  }
  emit('update:selectedItems', updatedItems)
}

onMounted(() => {
  document.addEventListener('click', handleClickOutsideDropdown)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutsideDropdown)
})
</script>

<style lang="scss">
.muttiselect {
  display: flex;
  flex-direction: column;
  max-width: 400px;
}
.muttiselect__element {
  display: flex;
  border: 1px #3a354199 solid;
  background-color: #f4f4f4;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  padding: 5px;
}
.multiselect__field {
  display: flex;
  flex-wrap: wrap;
}
.mutliselect__selection {
  margin-right: 2px;
}
.mutliselect__append {
  width: 20px;
  margin-left: auto;
}
.dropdown {
  position: absolute;
  max-height: 80%;
  overflow-y: auto;
  border: 1px #3a354199 solid;
  border-radius: 5px;
  padding: 5px;
  background-color: #f4f4f4;
}

.dropdown__element {
  display: flex;
  cursor: pointer;
}
.dropdown__element-checkbox {
  margin-left: 10px;
}
.dropdown__element-title {
  margin-left: 10px;
}
</style>
