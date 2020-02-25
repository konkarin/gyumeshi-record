<template>
  <div class="welcome">
    <h2>君だけの点数を付けよう！</h2>
    <div>
      <login-form :button-name="buttonName" />
    </div>
    <div>
      アカウントをお持ちですか？
      <router-link to="/login">
        ログインする
      </router-link>
    </div>
  </div>
</template>

<script>
import LoginForm from './LoginForm'

export default {
  components: { LoginForm },
  data () {
    return {
      id: '',
      password: '',
      showPassword: '',
      rules: {
        required: value => !!value || '8文字以上',
        min: v => v.length >= 8 || '8文字以上'
      },
      buttonName: '登録する'
    }
  }
}
</script>
