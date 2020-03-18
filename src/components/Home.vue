<template>
  <div>
    <div style="padding: 10px 0;">
      <!-- modal -->
      <record
        :user="user"
        :criteria-list="criteriaList"
      />
      <div
        style="
          border-bottom-style: solid;
          border-bottom-width: 1px;
          border-bottom-color: rgb(56, 68, 77);"
      >
        <img :src="iconURL">
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
    </div>
    <template v-if="criteriaList.length > 0">
      <v-btn
        class="mx-2"
        fab
        dark
        color="blue"
        @click="showRecord"
      >
        <v-icon dark>
          {{ mdiPencil }}
        </v-icon>
      </v-btn>
      <record-index
        :is-loading="isLoading"
        :uid="user.uid"
        :criteria-list="criteriaList"
        @loading="updateIsLoading"
      >
        記録しよう！
      </record-index>
      <div class="chart">
        <!-- <img
          width="100%"
          src="https://2.bp.blogspot.com/-2ePKnVo4ubw/VXOTvlEJxtI/AAAAAAAAuDg/-OF1k_KjePY/s800/graph10_oresen1.png"
        > -->
      </div>
    </template>
    <!-- v-if="criteriaList.length > 0" -->
    <template v-else>
      <Init
        :criteria-list="criteriaList"
        @update-criteria="updateCriteriaList"
      />
    </template>
  </div>
</template>

<script>
import Record from './Record'
import Init from './Init'
// mdiPencil https://qiita.com/nwtgck/items/e46b3ec16a0e79f482a5
import { mdiPencil } from '@mdi/js'
import firebase from '../firebase'
import RecordIndex from './RecordIndex'

export default {
  components: { RecordIndex, Record, Init },
  props: {
    isLoading: Boolean
  },
  data () {
    return {
      user: null,
      mdiPencil: mdiPencil,
      recordList: [],
      criteriaList: [],
      iconURL: ''
    }
  },
  async created () {
    // TODO: どこでローディング更新するか
    this.$emit('loading', true)
    // ユーザー取得
    this.user = await firebase.auth().currentUser
    this.iconURL = this.user.photoURL
    // // userのcriteriaListを取得
    this.criteriaList = await this.getCriteriaList()
    this.$emit('loading', false)
  },
  methods: {
    /**
     * モーダル表示
     */
    showRecord () {
      this.$modal.show('record')
    },
    /**
     * ログアウトする
     */
    logout () {
      firebase.auth().signOut()
    },
    /**
     * Init後にcriteriaLsitを更新する
     */
    updateCriteriaList (val) {
      this.criteriaList = val
    },
    /**
     * ローディングの更新
     */
    updateIsLoading (val) {
      this.$emit('loading', val)
    },
    /**
     * criteriaListを取得する
     * @returns {Array}
     */
    async getCriteriaList () {
      let result = []
      try {
        const usersSnapshot = await firebase.firestore().collection('users')
          .where('uid', '==', this.user.uid).get()
        usersSnapshot.forEach(doc => {
          result = doc.data().criteriaList
        })
        return result
      } catch (error) {
        console.error(error)
      }
    },
    /**
     * completeモーダルクローズ時にrecordを更新する
     */
    async updateRecordList () {
      this.recordList = await this.getRecordList()
      this.$emit('loading', false)
    }
  }
}
</script>
