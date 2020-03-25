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
    <template v-if="criteriaList.length === 0">
      <Init
        :criteria-list="criteriaList"
        @update-criteria="updateCriteriaList"
      />
    </template>
    <template v-else>
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
        :record-list="recordList"
        :criteria-list="criteriaList"
        @loading="updateIsLoading"
        @update-record="updateRecordList"
      >
        記録しよう！
      </record-index>
      <div class="chart" />
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
    // user取得
    this.user = await firebase.auth().currentUser
    this.iconURL = this.user.photoURL
    // userのcriteriaListを取得
    this.criteriaList = await this.getCriteriaList(this.user.uid)
    // userのrecordListを取得
    this.recordList = await this.getRecordList(this.user.uid)
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
    async getCriteriaList (uid) {
      let result = []
      try {
        const usersSnapshot = await firebase.firestore().collection('users')
          .where('uid', '==', uid).get()
        usersSnapshot.forEach(doc => {
          result = doc.data().criteriaList
        })
        return result
      } catch (error) {
        console.error(error)
      }
    },
    /**
     * recordListを取得する
     * @returns {Array}
     */
    async getRecordList (uid) {
      let result = []
      if (!uid) {
        return result
      }
      try {
        const recordsSnapshot = await firebase.firestore().collection('users')
          .doc(uid).collection('records').orderBy('date', 'desc').get()

        result = recordsSnapshot.docs.map(doc => {
          return { data: doc.data(), id: doc.id }
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
      this.recordList = await this.getRecordList(this.user.uid)
      this.$emit('loading', false)
    }
  }
}
</script>
