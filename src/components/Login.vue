<template>
  <div>
    <v-btn
      type="button"
      depressed
      color="amber darken-4"
      class="white--text"
      @click="login"
    >
      <slot />
    </v-btn>
  </div>
</template>

<script>
import firebase from '../firebase'
export default {
  methods: {
    async login () {
      const provider = new firebase.auth.TwitterAuthProvider()

      await firebase.auth().signInWithRedirect(provider)
        .catch(error => console.error(error))
    }

  }
}
</script>
