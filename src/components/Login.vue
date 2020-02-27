<template>
  <div class="login">
    <login-form :button-name="buttonName" />
    <div>
      アカウントをお持ちでない方は
      <router-link to="/">
        こちら
      </router-link>
    </div>
  </div>
</template>

<script>
// import firebase from '../firebase'
import LoginForm from './LoginForm'
export default {
  components: { LoginForm },
  data () {
    return {
      buttonName: 'ログイン'
    }
  }
}
</script>
