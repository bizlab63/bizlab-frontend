<script setup>
defineProps({
  domain: String,
  section: String
})

import Header from "../blocks/header/Header.vue";
</script>

<script>
</script>

<template>
  <div class="wrapper">
    <Header full :active="section || 'kanban'" :domain="domain"  />
    {{ domain }}
  </div>
</template>