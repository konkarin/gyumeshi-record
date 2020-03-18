<template>
  <div>
    <record-index
      :is-loading="isLoading"
      :uid="uid"
      :criteria-list="criteriaList"
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
      criteriaList: [],
      uid: ''
    }
  },
  async created () {
    this.$emit('loading', true)
    // FIXME: ???????????????????????????????????????
    this.uid = await this.getUid()
    // // userのcriteriaListを取得
    this.criteriaList = await this.getCriteriaList()
    this.$emit('loading', false)
  },
  methods: {
    /**
     * criteriaListを取得する
     * @returns {Array}
     */
    async getUid () {
      let result = ''
      try {
        const usersSnapshot = await firebase.firestore().collection('users')
          .where('accountId', '==', this.accountId).get()
        usersSnapshot.forEach(doc => {
          result = doc.data().uid
        })
        return result
      } catch (error) {
        console.error(error)
      }
    },
    /**
     * criteriaListを取得する
     * @returns {Array}
     */
    async getCriteriaList () {
      let result = []
      try {
        const usersSnapshot = await firebase.firestore().collection('users')
          .where('accountId', '==', this.accountId).get()
        usersSnapshot.forEach(doc => {
          result = doc.data().criteriaList
        })
        return result
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
