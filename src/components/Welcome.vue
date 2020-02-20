<template>
  <div class="welcome">
    <h2>君だけの点数を付けよう！</h2>
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
        登録する
      </button>
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
export default {
  data () {
    return {
      id: '',
      password: ''
    }
  }
}
</script>
