<script setup>
  defineProps({
    name: String,
    domain: String
  })
</script>

<template>
  <div class="project">
    <h1 class="project__heading">{{name}}</h1>
    <router-link :to="domain"><img src="../../../assets/icons/enter.png" class="project__link" alt=""></router-link>
  </div>
</template>

<style scoped>
.project {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  padding: 0 40px;
  box-shadow: 0 4px 25px rgba(0, 51, 153, 0.05);
}

.project__heading {
  font-family: 'Inter', sans-serif;
  color: #3D4C61;
  font-size: 24px;
}

.project__link {
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  width: 30px;
  height: 30px;
  font-weight: 900;
  color: #9EA5B0;
  border-radius: 13px;
  text-align: center;
  line-height: 27.5px;
}
</style>