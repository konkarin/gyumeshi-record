<template>
  <div>
    <div>
      <record
        :user="user"
        :criteria-list="criteriaList"
      />
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
      v-for="item in recordList"
      :key="item.date.seconds"
      class="timeline"
    >
      <div>
        <div
          v-for="(criteria, index) in criteriaList"
          :key="index"
        >
          {{ item.scores[index] }} / {{ criteria.maxScore }}点
        </div>
        <div>
          {{ item.memo }}
          {{ new Date(item.date.seconds * 1000) }}
        </div>
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
// mdiPencil https://qiita.com/nwtgck/items/e46b3ec16a0e79f482a5
import { mdiPencil } from '@mdi/js'
import firebase from '../firebase'
export default {
  components: { Record },
  props: {
    isLoading: Boolean
  },
  data () {
    return {
      user: null,
      mdiPencil: mdiPencil,
      recordList: [],
      criteriaList: []
    }
  },
  async created () {
    this.$emit('loading', false)
    this.user = await firebase.auth().currentUser
    // 記録の取得
    firebase.firestore().collection('records')
      .where('uid', '==', this.user.uid).get().then(snapshot => {
        snapshot.forEach(doc => {
          this.recordList.push(doc.data())
        })
      })
    // userごとのcriteriaを取得
    const snapshot = await firebase.firestore().collection('users')
      .where('uid', '==', this.user.uid).get()
    snapshot.forEach(doc => {
      // TODO: criteriaListに統一
      this.criteriaList = doc.data().criteria
    })
  },
  methods: {
    record () {
      this.$modal.show('record')
    },
    logout () {
      firebase.auth().signOut()
    }
  }
}
</script>
