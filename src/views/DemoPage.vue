<script setup lang="ts">
import PhoneInput from "@/components/PhoneInput.vue";
import {ref} from "vue";

const phoneNumber = ref<string>('');
</script>

<template>
  <main>
    <h2>Enter your phone number</h2>
    <PhoneInput v-model="phoneNumber" />
  </main>
</template>
