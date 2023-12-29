<script setup>
import Header from "../blocks/header/Header.vue";
import Project from "../blocks/project/Project.vue";
import CreateProject from "../blocks/project/CreateProject.vue";
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
      creating: false,
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

      this.projects = await fetch(backendUrl + '/api/project/all', {
        method: 'POST',
        body: formData
      }).then(res => {
        return res.json()
      })

      if (this.projects.length === 0) {
        this.isProjectsEmpty = true
      }
    },

    startCreating() {
      this.creating = !this.creating
      this.isProjectsEmpty = !this.isProjectsEmpty;
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
      <div class="content__empty" v-show="isProjectsEmpty">
        <div class="empty__tip">
          <img src="../../assets/icons/info.png" alt="" class="tip__icon">
          <span class="tip__text">У вас нет ни одного проекта, но вы можете с лёгкостью создать и настроить его, прямо на этой странице!</span>
        </div>
        <button class="empty__link" @click="startCreating">Создать проект</button>
      </div>
      <div class="content__projects" v-show="!isProjectsEmpty">
        <Project v-for="project in projects" :key="project.id" :name="project.name" :domain="project.domain" />
        <CreateProject />
      </div>
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
  grid-auto-rows: 120px;
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
  border: 0;
  background: rgba(14, 193, 172, 0.8);
}
</style>