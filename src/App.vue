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
      <router-view :is-loading="isLoading" />
    </div>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      isLoading: true
    }
  },
  mounted () {
    this.isLoading = false
  }
}
</script>
