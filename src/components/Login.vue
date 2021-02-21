<style>
html {
  overflow-y: hidden ;
}
</style>
<template>
  <v-container fluid class="ma-auto fill-height">

    <v-row align="center" justify="center">
      <v-sheet class="align-center" min-width="30em" elevation="3">

        <v-card-text align="center" class="text-h5">登录</v-card-text>

        <v-form class="pa-6" ref="loginForm">
          <v-alert v-if="hiddenAlert" type="error">{{ alertMessage }}</v-alert>
          <v-container>
            <v-row>
              <v-text-field placeholder="用户名" :rules="usernameRule" v-model="username"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field placeholder="密码" type="password" :rules="passwordRule" v-model="password"></v-text-field>
            </v-row>
          </v-container>
          <v-btn class="mt-4" block color="primary" elevation="2" :loading="loginLoading" v-on:click="login">
            登录
          </v-btn>
        </v-form>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
import Api from "@/services/Api";
import axios from "axios";
import VueAxios from 'vue-axios'

export default {
  data() {
    return {
      alertMessage: "",
      hiddenAlert: false,
      usernameRule: [
        v => !!v || '用户名必填为空',
        v => (v && v.length >= 3) || "用户名长度需要大于3",
      ],
      passwordRule: [
        v => !!v || '密码不能为空',
        v => (v && v.length >= 8) || '密码需要长度大于8',
      ],
      loginLoading: false,
      username: "",
      password: "",
    }
  },

  methods: {

    login: function () {
      if (!this.$refs.loginForm.validate()) {
        return;
      }
      this.loginLoading = true
      this.hiddenAlert = false;
      Api.login(this.username, this.password).then(response => {
        this.loginLoading = false;
        localStorage.setItem("userToken", response.data.msg)
        console.log(response)
      }).catch((error) => {
        this.loginLoading = false;
        if (error.response.data.status === 403) {
          this.alertMessage = "用户名或密码错误！"
        } else {
          this.alertMessage = "未知错误！"
        }
        this.hiddenAlert = true;
        console.log(error.response)
      })
    }
  },
  name: "Login"
}
</script>

<style scoped>

</style>
