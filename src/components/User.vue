<template>
  <div>
    <record-index
      :is-loading="isLoading"
      :uid="userInfo.uid"
      :record-list="recordList"
      :criteria-list="userInfo.criteriaList"
    >
      {{ $route.params.accountId }}
    </record-index>
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
    // userInfo
    this.userInfo = await this.getUserInfo(this.accountId)
    this.recordList = await this.getRecordList(this.userInfo.uid)
    this.$emit('loading', false)
  },
  methods: {
    /**
     * userInfoを取得する
     * @returns {Array}
     */
    async getUserInfo (accountId) {
      const result = {}
      try {
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
     * @returns {Array}
     */
    async getRecordList (uid) {
      const result = []
      if (!uid) {
        return result
      }
      try {
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
