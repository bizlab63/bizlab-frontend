<script setup>
defineProps({
  full: Boolean,
  active: String,
  domain: String
})
</script>

<script>
import { Cookie } from "../../../helpers/cookieHelper.js";
import {logout} from "../../../helpers/authHelper.js";

let cookie = new Cookie();
let uid = cookie.getCookie('uid');
let token = cookie.getCookie('token');

export default {
  data() {
    return {
      auth: false,
      dropdown: false
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
      <router-link :to="'/' + domain + '/'"><span class="info__element" :class="active === 'kanban' ? 'info__element-active' : ''">Доска</span></router-link>
      <router-link :to="'/' + domain + '/calendar'"><span class="info__element" :class="active === 'calendar' ? 'info__element-active' : ''">Календарь</span></router-link>
      <router-link :to="'/' + domain + '/chat'"><span class="info__element" :class="active === 'chat' ? 'info__element-active' : ''">Чат</span></router-link>
      <router-link :to="'/' + domain + '/departments'"><span class="info__element" :class="active === 'departments' ? 'info__element-active' : ''">Отделы</span></router-link>
    </div>
    <div class="header__profile" v-show="auth">
      <img class="profile__icon" src="../../../assets/icons/user.png" @click="dropdown = !dropdown">

      <div class="profile__dropdown" v-show="dropdown">
        <span class="dropdown__option">Профиль</span>
        <span class="dropdown__option">Настройки</span>
        <span class="dropdown__option" @click="logout">Выйти</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 51, 153, 0.05);
  width: 100vw;
  height: 57px;
  padding: 12px 15vw;
}

.header__info {
  display: flex;
}

.header__logo {
  font-family: "Inter", sans-serif;
  color: #0d1f3acc;
  font-weight: 700;
}

.profile__icon {
  cursor: pointer;
}

.profile__dropdown {
  padding: 16px 20px;
  box-shadow: 0 4px 16px rgba(0, 51, 153, 0.05);
  border-radius: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 7%;
  right: 15%;
}

.dropdown__option {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: rgba(13, 31, 58, 0.6);
  margin-bottom: 8.5px;
  cursor: pointer;
}

.dropdown__option:last-child {
  color: rgba(255, 104, 104, 0.6);
  margin-bottom: 0;
}

.info__element {
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 500;
  padding: 9px 0;
  color: rgba(13, 31, 58, 0.5);
  width: 130px;
  text-align: center;
}

.info__element-active {
  border-radius: 8px;
  background: rgba(14, 193, 172, 0.1);
  color: rgba(13, 31, 58, 0.7);
}

</style>