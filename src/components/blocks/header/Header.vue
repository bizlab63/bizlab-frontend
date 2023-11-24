<script setup>
defineProps({
  full: Boolean
})
</script>

<script>
import { Cookie } from "../../../helpers/cookieHelper.js";

let cookie = new Cookie();
let uid = cookie.getCookie('uid');
let token = cookie.getCookie('token');

export default {
  data() {
    return {
      auth: false
    }
  },

  created() {
    if (uid && token) {
      this.auth = true
    }
  }
}
</script>

<template>
  <div class="header">
    <router-link to="/">
    <span class="header__logo">БизЛаб</span>
    </router-link>
    <div class="header__info" v-show="full">
      <div class="info__elements">fff</div>
    </div>
    <div class="header__profile">

    </div>
    <div class="header__dropdown">
      {{auth}}
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 51, 153, 0.05);
  width: 100vw;
  padding: 12px 15vw;
}

.header__logo {
  font-family: "Inter", sans-serif;
  color: #0d1f3acc;
}

.header__logo {
  font-weight: 700;
}

</style>