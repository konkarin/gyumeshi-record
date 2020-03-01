<template>
  <div class="welcome">
    <h2>君だけの点数を付けよう！</h2>
    <div>
      <login-form :is-loading="isLoading">
        Twitterでログイン
      </login-form>
    </div>
  </div>
</template>

<script>
import LoginForm from './LoginForm'
import firebase from '../firebase'
export default {
  components: { LoginForm },
  props: {
    isLoading: Boolean
  },
  created () {
    // ログインユーザーがいる場合はhomeへ遷移
    if (firebase.auth().currentUser) {
      this.$router.push('home')
    }
  }
}
</script>
