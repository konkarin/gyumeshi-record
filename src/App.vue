<template>
  <v-app>
    <h1>
      Gyumeshi Record
    </h1>
    <div class="container">
      <div
        v-show="isLoading"
        class="loader"
      />
      <router-view
        :is-loading="isLoading"
        @loading="updateIsLoading"
      />
    </div>
  </v-app>
</template>

<script>
// import firebase from './firebase'
export default {
  data () {
    return {
      isLoading: true
    }
  },
  methods: {
    updateIsLoading (val) {
      this.isLoading = val
    }
  }
}
</script>
