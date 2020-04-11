<template>
  <div>
    <record-index
      :is-loading="isLoading"
      :record-list="recordList"
      :criteria-list="userInfo.criteriaList"
    />
  </div>
</template>

<script>
import RecordIndex from './RecordIndex'
import firebase from '../firebase'

export default {
  components: { RecordIndex },
  props: {
    isLoading: Boolean
  },
  data () {
    return {
      accountId: this.$route.params.accountId,
      recordList: [],
      userInfo: {
        uid: '',
        criteriaList: []
      }
    }
  },
  async created () {
    this.$emit('loading', true)
    // user情報を取得
    this.userInfo = await this.getUserInfo(this.accountId)
    // userのrecordListを取得
    this.recordList = await this.getRecordList(this.userInfo.uid)
    this.$emit('loading', false)
  },
  methods: {
    /**
     * userInfoを取得する
     * @param {String} accountId
     * @returns {Array}
     */
    async getUserInfo (accountId) {
      const result = {}
      try {
        // userコレクションからuser情報を取得
        const usersSnapshot = await firebase.firestore().collection('users')
          .where('accountId', '==', accountId).get()
        usersSnapshot.forEach(doc => {
          result.uid = doc.data().uid
          result.criteriaList = doc.data().criteriaList
        })
        return result
      } catch (error) {
        console.error(error)
      }
    },
    /**
     * recordListを取得する
     * @param {String} uid
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
    }
  }
}
</script>
