<template>
  <div>
    <div>
      <record />
      <v-btn
        class="mx-2"
        fab
        dark
        color="blue"
        @click="record"
      >
        <v-icon dark>
          {{ mdiPencil }}
        </v-icon>
      </v-btn>
    </div>
    <div
      v-for="item in timeline"
      :key="item.id"
      class="timeline"
    >
      <div>
        {{ item.tweet }}
        <v-btn>edit</v-btn>
      </div>
    </div>
    <v-btn
      type="button"
      depressed
      color="amber darken-4"
      class="white--text"
      @click="logout"
    >
      ログアウト
    </v-btn>
    <div class="chart">
      <img
        width="100%"
        src="https://2.bp.blogspot.com/-2ePKnVo4ubw/VXOTvlEJxtI/AAAAAAAAuDg/-OF1k_KjePY/s800/graph10_oresen1.png"
      >
    </div>
  </div>
</template>

<script>
import Record from './Record'
// https://qiita.com/nwtgck/items/e46b3ec16a0e79f482a5
import { mdiPencil } from '@mdi/js'
import firebase from '../firebase'
export default {
  components: { Record },
  props: {
    isLoading: Boolean
  },
  data () {
    return {
      mdiPencil: mdiPencil,
      timeline: [
        {
          id: 0,
          tweet: '今日も牛めしがうまい'
        },
        {
          id: 1,
          tweet: '明日も牛めしがうまい'
        }
      ]
    }
  },
  created () {
    this.$emit('loading', false)
  },
  methods: {
    record () {
      this.$modal.show('tweet')
    },
    logout () {
      firebase.auth().signOut()
    }
  }
}
</script>
