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
  data () {
    return {
      user: null
    }
  },
  methods: {
    async login () {
      const provider = new firebase.auth.TwitterAuthProvider()
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      // const token = result.credential.accessToken
      // const secret = result.credential.secret
      // // The signed-in user info.
      // const user = result.user
      // ...
      await firebase.auth().signInWithRedirect(provider)
        .catch(error => console.error(error))
      // Handle Errors here.
      // const errorCode = error.code
      // const errorMessage = error.message
      // // The email of the user's account used.
      // const email = error.email
      // // The firebase.auth.AuthCredential type that was used.
      // const credential = error.credential
      // ...
    }

  }
}
</script>
