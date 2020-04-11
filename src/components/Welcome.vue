<template>
  <div class="welcome">
    <h2>君だけの点数を付けよう！</h2>
    <div>
      <login>
        Twitterでログイン
      </login>
    </div>
  </div>
</template>

<script>
import Login from './Login'
import firebase from '../firebase'

export default {
  components: { Login },
  props: {
    isLoading: Boolean
  },
  beforeCreate () {
    // ログインユーザーがいる場合はhomeへ遷移
    if (firebase.auth().currentUser) {
      this.$router.push('home')
    } else {
      this.$emit('loading', false)
    }
  }
}
</script>
