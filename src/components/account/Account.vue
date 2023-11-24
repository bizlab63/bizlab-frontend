<script setup>
import Header from "../blocks/header/Header.vue";
import Project from "../blocks/project/Project.vue";
</script>

<script>
import {Cookie} from "../../helpers/cookieHelper.js";
import {checkAuthentication} from "../../helpers/authHelper.js";

import {backendUrl} from "../../helpers/config.js";

export default {
  data() {
    return {
      uid: 0,
      token: "",
      projects: null,
      isProjectsEmpty: false,
    }
  },
  created() {
    let check = checkAuthentication(this.$router)

    if (check) {
      let cookie = new Cookie()

      this.uid = cookie.getCookie('uid')
      this.token = cookie.getCookie('token')

      this.fetchProjects()
    }
  },
  methods: {
    async fetchProjects() {
      let formData = new FormData();

      formData.append('uid', this.uid)
      formData.append('token', this.token)

      this.projects = await fetch(backendUrl + '/api/company/all', {
        method: 'POST',
        body: formData
      }).then(res => {
        return res.json()
      })

      if (this.projects.length === 0) {
        this.isProjectsEmpty = true
      }
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <Header />
    <div class="content">
      <h1 class="content__heading">Главная</h1>
      <h3 class="content__subheading">Ваши проекты</h3>
      <div class="content__empty" v-if="isProjectsEmpty">
        <div class="empty__tip">
          <img src="../../assets/icons/info.png" alt="" class="tip__icon">
          <span class="tip__text">У вас нет ни одного проекта, но вы можете с лёгкостью создать и настроить его, прямо на этой странице!</span>
        </div>
        <router-link to="/system/create_project" class="empty__link">Создать проект</router-link>
      </div>
      <div class="content__projects" v-else>
        <Project v-for="project in projects" :key="project.id" :name="project.name" :domain="project.domain" />
      </div>
      <router-link to="/system/create_project" v-if="!isProjectsEmpty">
        <div class="content__button">
          <img src="../../assets/icons/add.png" class="button__icon" alt="">
        </div>
      </router-link>
    </div>
  </div>

</template>

<style scoped>
.content {
  margin: 32px 15%;
}

.content__heading {
  font-size: 36px;
  color: #0D1F3A;
  font-family: 'Inter', sans-serif;
}

.content__subheading {
  font-size: 20px;
  color: rgba(13, 31, 58, 0.6);
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
}

.content__projects {
  margin-top: 32px;
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: 90px;
  column-gap: 5%;
  row-gap: 3vh;
}

.content__empty {
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.empty__tip {
  width: 750px;
  padding: 32px 55px;
  display: flex;
  border-radius: 10px;
  margin-bottom: 16px;
  background: rgba(14, 193, 172, 0.1);
}

.tip__icon {
  width: 30px;
  height: 30px;
}

.tip__text {
  padding-left: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #0d1f3acc;
}

.empty__link {
  display: block;
  width: 225px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 16px;
  padding: 16px 32px;
  border-radius: 10px;
  margin: 0 auto;
  color: #fff;
  background: rgba(14, 193, 172, 0.8);
}

.content__button {
  margin: 0 auto;
  margin-top: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 25px rgba(0, 51, 153, 0.05);
  width: 40px;
  background: #fff;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button__icon {
  width: 28px;
  height: 28px;
}
</style>