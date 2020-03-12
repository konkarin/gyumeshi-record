<template>
  <div>
    <div style="padding: 10px 0;">
      <record
        :user="user"
        :criteria-list="criteriaList"
      />
      <img :src="iconUrl">
      <v-btn
        type="button"
        depressed
        color="amber darken-4"
        class="white--text"
        @click="logout"
      >
        ログアウト
      </v-btn>
    </div>
    <template v-if="criteriaList.length > 0">
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
      <div
        v-for="item in recordList"
        :key="item.id"
        style="
      padding: 10px 0;
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-bottom-color: rgb(56, 68, 77);"
      >
        <div style="padding: 0px 10px;">
          <div>
            {{ new Date(item.data.date.seconds * 1000).toLocaleString() }}
          </div>
          <div
            v-for="(criteria, index) in criteriaList"
            :key="index"
          >
            {{ criteria.name }}：{{ item.data.scores[index] }} / {{ criteria.maxScore }}点
          </div>
          <div>
            計：{{ item.data.scores.reduce((acc, cur) => parseInt(acc) + parseInt(cur)) }}点
          </div>
          <div>
            {{ item.data.memo }}
          </div>
          <span style="display: flex">
            <v-btn
              style="margin-left: auto;"
              @click="deleteRecord(item.id)"
            >
              delete
            </v-btn>
          </span>
        </div>
      </div>

      <div class="chart">
        <img
          width="100%"
          src="https://2.bp.blogspot.com/-2ePKnVo4ubw/VXOTvlEJxtI/AAAAAAAAuDg/-OF1k_KjePY/s800/graph10_oresen1.png"
        >
      </div>
    </template>
    <template v-else>
      <a href="/init">さきに採点基準を作ろう！</a>
    </template>
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
      criteriaList: [],
      iconUrl: ''
    }
  },
  async created () {
    this.user = await firebase.auth().currentUser
    this.iconUrl = this.user.photoURL
    // 記録の取得
    firebase.firestore().collection('records')
      .where('uid', '==', this.user.uid).get().then(snapshot => {
        snapshot.forEach(doc => {
          this.recordList.push(
            { data: doc.data(), id: doc.id }
          )
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
  mounted () {
    this.$emit('loading', false)
  },
  methods: {
    record () {
      this.$modal.show('record')
    },
    logout () {
      firebase.auth().signOut()
    },
    async deleteRecord (id) {
      const del = firebase.functions().httpsCallable('deleteRecord')
      try {
        const result = await del(id)
        console.log(result)
        alert(result)
        // this.$modal.hide('record')
      } catch (e) {
        console.log(e)
        alert(e)
      }
    }
  }
}
</script>
