<script setup>
import Header from "../blocks/header/Header.vue";
</script>

<script>
import {backendUrl} from "../../helpers/config.js";

export default {
  data() {
    return {
      email: "",
      isEmailTrue: false,

      firstForm: true,
      secondForm: false,

      codeInputActive: 0,
      codeInputs: null,

      code: "",

      tipText: "Для входа вам необходимо всего лишь ввести адрес вашей электронной почты. Если у вас нет аккаунта - он создатся автоматически"
    }
  },
  methods: {
    async login(e) {
      e.preventDefault();

      let formData = new FormData();
      formData.append('email', this.email);

      let result = await fetch(backendUrl + "/api/user/login", {
        method: "POST",
        body: formData
      }).then(res => res.json())

      if (result.code === 'true') {
        this.firstForm = false;
        this.secondForm = true;

        this.codeInputs = document.querySelectorAll('.form__code')
        await this.$nextTick(() => this.codeInputs[this.codeInputActive].focus())
      }
    },

    async auth () {
      this.codeInputs.forEach((el) => {
        this.code += el.value
      })

      let formData = new FormData();
      formData.append('email', this.email);
      formData.append('code', this.code);

      let result = await fetch(backendUrl + "/api/user/auth", {
        method: "POST",
        body: formData,
      }).then(res => res.json())

      if (result.code === 'true') {
        document.cookie = 'uid=' + result.uid
        document.cookie = 'token=' + result.token

        await this.$router.push('/')
      }
    },

    selectNextInput() {
      this.codeInputActive++;
      this.codeInputs[this.codeInputActive].focus();
    },

    validateEmail(e) {
      this.email = e.target.value
      this.isEmailTrue = !!this.email;
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <Header></Header>
    <div class="content">
      <h1 class="welcome">Вход в личный кабинет</h1>
      <form class="content__form" :class="{ 'content__form-active': firstForm }" id="first">
        <input type="email" @input="(e) => validateEmail(e)" id="email" class="form__email"
               placeholder="Электронная почта"/>
        <input type="submit" @click="(e) => login(e)" class="form__submit"
               :class="{ 'form__submit-active': isEmailTrue }" value="Получить код"/>
      </form>
      <form class="content__form" :class="{ 'content__form-active': secondForm }">
        <div class="form__codes">
          <input type="text" data-number="1" @input="() => selectNextInput()" class="form__code" placeholder=""/>
          <input type="text" data-number="2" @input="() => selectNextInput()" class="form__code" placeholder=""/>
          <input type="text" data-number="3" @input="() => selectNextInput()" class="form__code" placeholder=""/>
          <input type="text" data-number="4" @input="() => auth()" class="form__code" placeholder=""/>
        </div>
      </form>
      <div class="content__tip">
        <img src="../../assets/icons/info.png" alt=""/>
        <span class="tip__text">{{ this.tipText }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  font-family: "Montserrat", sans-serif;
}

.welcome {
  margin-top: 32px;
  text-align: center;
}

.content__form {
  display: none;
  width: 30vw;
  margin: 0 auto;
  margin-top: 25vh;
}

.content__form-active {
  display: block;
}

.form__email, .form__submit {
  background: rgba(14, 193, 172, 0.1);
  width: 100%;
  padding: 18px 36px;
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
}

.form__submit {
  color: rgba(13, 31, 58, 0.6);
  background: rgba(14, 193, 172, 0.4);
  transition: 0.5s;
}

.form__submit-active {
  background: rgba(14, 193, 172, 0.8);
}

.form__codes {
  display: flex;
  justify-content: space-evenly;
}

.form__code {
  font-family: 'Montserrat', sans-serif;
  border-radius: 0;
  border-bottom: 1px solid grey;
  width: 10%;
  text-align: center;
  font-size: 20px;
  padding: 10px 0;
}

.form__submit {
  margin-top: 20px;
  cursor: pointer;
}

.content__tip {
  display: flex;
  align-items: flex-start;
  background: rgba(14, 193, 172, 0.1);
  width: 30vw;
  margin: 0 auto;
  padding: 18px 36px;
  margin-top: 40px;
  border-radius: 10px;
  transition: 1s;
}

.tip__text {
  display: block;
  margin-left: 18px;
  color: #0d1f3acc;
  font-size: 18px;
}
</style>