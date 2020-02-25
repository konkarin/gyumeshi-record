<template>
  <div>
    <form>
      <div>
        <v-text-field
          v-model="id"
          :rules="[rules.required, rules.min]"
          name="id"
          label="ID"
          hint="8文字以上"
          counter
          required
        />
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
          required
          @click:append="showPassword = !showPassword"
        />
        <div>
          <v-btn
            type="submit"
            depressed
            color="amber darken-4"
            class="white--text"
          >
            {{ buttonName }}
          </v-btn>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    buttonName: {
      type: String,
      default: ''
    }
  },
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
