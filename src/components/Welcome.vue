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
      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="showPassword ? 'text' : 'password'"
        name="password"
        label="パスワード"
        hint="8文字以上"
        counter
        @click:append="showPassword = !showPassword"
      />
    </div>
    <div>
      <button type="submit">
        登録する
      </button>
      <!-- <v-btn type="submit">
        登録する
      </v-btn> -->
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
      password: '',
      showPassword: '',
      rules: {
        required: value => !!value || '8文字以上',
        min: v => v.length >= 8 || '8文字以上'
      }
    }
  }
}
</script>
