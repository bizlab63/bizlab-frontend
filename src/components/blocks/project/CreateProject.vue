<script>
import {backendUrl} from "../../../helpers/config.js";
import {Cookie} from "../../../helpers/cookieHelper.js";

let cookie = new Cookie();

export default {
  data () {
    return {
      activated: false,
      name: null,
      domain: null
    }
  },

  methods: {
    toggle() {
      this.activated = !this.activated;
    },

    updateData(e) {
      if (e.target.getAttribute('data-field') === 'name')
        this.name = e.target.value
      else if (e.target.getAttribute('data-field') === 'domain')
        this.domain = e.target.value
    },

    async push() {
      let formData = new FormData();

      formData.append('uid', cookie.getCookie('uid'))
      formData.append('token', cookie.getCookie('token'))
      formData.append('name', this.name);
      formData.append('domain', this.domain);

      let result = await fetch(backendUrl + '/api/project/create', {
        method: 'POST',
        body: formData
      }).then(res => res.json())

      if (result.code === 'true') {
        this.activated = false;
        this.$router.go(0);
      }
    }
  }
}
</script>

<template>
  <div class="project" v-if="activated">
    <input type="text" class="project__heading" @input="(e) => updateData(e)" data-field="name" placeholder="Название проекта">
    <input type="text" class="project__subheading" @input="(e) => updateData(e)" data-field="domain" placeholder="Домен проекта">
  </div>
  <button class="create" @click="() => toggle()" v-if="!activated">
    <img src="../../../assets/icons/add.png" class="create__icon" alt="">
  </button>
  <div class="push" v-if="activated">
    <img class="push__apply" @click="() => push()" src="" alt="">
    <img class="push__cancel" @click="() => toggle()" src="" alt="">
  </div>
</template>

<style scoped>
.project {
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 25px rgba(0, 51, 153, 0.05);
}

.project__heading {
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: rgba(13, 31, 58, 0.6);
}

.project__subheading {
  font-family: 'Montserrat', sans-serif;
  color: rgba(13, 31, 58, 0.4);
  margin-top: 10px;
}

.push {
  display: flex;
  justify-content: center;
}

.push__apply {
  width: 40px;
  height: 40px;
  background: rgba(14, 193, 172, 0.8);
  border-radius: 12px;
  box-shadow: 0 4px 25px rgba(0, 51, 153, 0.05);
  margin-top: 40px;
  border: 0;
  margin-right: 10px;
  cursor: pointer;
}

.push__cancel {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 25px rgba(0, 51, 153, 0.05);
  margin-top: 40px;
  border: 0;
  margin-left: 10px;
  cursor: pointer;
}

.create {
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
  cursor: pointer;
  border: 0;
}

.create__icon {
  width: 28px;
  height: 28px;
}
</style>