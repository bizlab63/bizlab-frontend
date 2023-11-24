<script setup>
defineProps({
  domain: String
})

import Header from "../blocks/header/Header.vue";
</script>

<template>
  <div class="wrapper">
    <Header full />
    {{ domain }}
  </div>
</template>