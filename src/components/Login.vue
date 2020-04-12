<template>
  <div>
    <button
      type="button"
      @click="login"
    >
      <slot />
    </button>
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
