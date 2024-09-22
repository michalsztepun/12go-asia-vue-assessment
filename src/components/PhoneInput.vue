<script setup lang="ts">
import {ref, computed, watch, defineProps, defineEmits} from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const input = ref<string>(props.modelValue);

const placeholder = computed(() => {
  return navigator.language === 'en-US'
    ? '+1 (123) 456-7890'
    : 'Phone number';
});

const formattedValue = computed({
  get: () => input.value,
  set: (value: string) => {
    input.value = value.replace(/[^\d\s()\-+]/g, '');
    emit('update:modelValue', input.value);
  },
});

watch(
  () => props.modelValue,
  (newValue) => {
    input.value = newValue;
  }
);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  formattedValue.value = target.value;
};

const onKeyDown = (event: KeyboardEvent) => {
  if (/[^\d\s()\-+]/g.test(event.key) && event.key !== "Backspace") {
    event.preventDefault();
  }
}
</script>

<template>
  <div>
    <input
        :placeholder="placeholder"
        v-model="formattedValue"
        @input="onInput"
        @keydown="onKeyDown"
        type="text"
    />
  </div>
</template>

<style scoped>
</style>
