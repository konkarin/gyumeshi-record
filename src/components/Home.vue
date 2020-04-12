<template>
  <div>
    <div style="padding: 10px 0;">
      <!-- modal -->
      <record
        :user="user"
        :criteria-list="criteriaList"
        @update-record="updateRecordList"
      />
      <div
        style="
          border-bottom-style: solid;
          border-bottom-width: 1px;
          border-bottom-color: rgb(56, 68, 77);"
      >
        <!-- <router-link to="/settings"> -->
        <img :src="iconURL">
        <!-- </router-link> -->
        <button
          @click="logout"
        >
          ログアウト
        </button>
      </div>
    </div>
    <template v-if="criteriaList.length === 0">
      <Init
        :criteria-list="criteriaList"
        @update-criteria="updateCriteriaList"
      />
    </template>
    <template v-else>
      <button
        @click="showRecord"
      >
        記録する
      </button>
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
      iconURL: '',
      mdiPencil: mdiPencil,
      recordList: [],
      criteriaList: []
    }
  },
  async created () {
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
     * @param {Array} val criteriaList
     */
    updateCriteriaList (val) {
      this.criteriaList = val
    },
    /**
     * ローディングの更新
     * @param {Boolean} val
     */
    updateIsLoading (val) {
      this.$emit('loading', val)
    },
    /**
     * criteriaListを取得する
     * @param {String} uid uid
     * @returns {Array}
     */
    async getCriteriaList (uid) {
      let result = []
      try {
        // userコレクションから採点基準を取得
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
     * @param {String} uid uid
     * @returns {Array}
     */
    async getRecordList (uid) {
      const result = []
      if (!uid) {
        return result
      }
      try {
        // userコレクションのrecordサブコレクションからrecordを取得
        const recordsSnapshot = await firebase.firestore().collection('users')
          .doc(uid).collection('records').orderBy('date', 'desc').get()
        recordsSnapshot.forEach(doc => {
          result.push({ data: doc.data(), id: doc.id })
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
