<template>
  <v-app>
    <h1
      style="
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-bottom-color: rgb(56, 68, 77);"
    >
      Gyumeshi Record
    </h1>
    <div>
      <!-- TODO: 不透明オーバーレイつける -->
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
