<template>
  <v-app>
    <h1
      style="
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-bottom-color: rgb(56, 68, 77);"
    >
      <router-link to="/home">
        Gyumeshi Record
      </router-link>
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
  created () {
    // IEを〇す
    const ua = navigator.userAgent.toLowerCase()
    const isIE = (ua.indexOf('msie') >= 0 || ua.indexOf('trident') >= 0)

    if (isIE) {
      location.href = 'https://www.google.com/intl/ja_jp/chrome/'
    }
  },
  methods: {
    updateIsLoading (val) {
      this.isLoading = val
    }
  }
}
</script>
