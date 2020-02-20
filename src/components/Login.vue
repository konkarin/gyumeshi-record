<template>
  <div class="login">
    <div>
      <input
        type="text"
        name
        :value="id"
        placeholder="ID"
      >
    </div>
    <div>
      <input
        type="password"
        name
        :value="password"
        placeholder="パスワード"
      >
    </div>
    <div>
      <button type="submit">
        ログイン
      </button>
    </div>
    <div>
      アカウントをお持ちでない方は
      <router-link to="/">
        こちら
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      password: ''
    }
  }
}
</script>
