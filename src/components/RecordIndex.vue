<template>
  <div>
    <div
      v-for="item in recordList"
      :key="item.id"
      class="record-list"
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
        <!-- TODO: ログイン中のみ表示 -->
        <!-- <span style="display: flex">
          <v-btn
            style="margin-left: auto;"
            @click="deleteRecord(item.id)"
          >
            delete
          </v-btn>
        </span> -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../firebase'
export default {
  props: {
    recordList: {
      type: Array,
      default: () => []
    },
    criteriaList: {
      type: Array,
      default: () => []
    }
  },
  async created () {
    // this.$emit('loading', true)
    // // ユーザー取得
    // // this.user = await firebase.auth().currentUser
    // this.iconURL = this.user.photoURL
    // // recordの取得
    // this.recordList = await this.getRecordList()
    // // userのcriteriaListを取得
    // this.criteriaList = await this.getCriteriaList()
    // // this.$emit('loading', false)
  },
  methods: {
    /**
     * recordListを取得する
     * @returns {Array}
     */
    async getRecordList () {
      try {
        const recordsSnapshot = await firebase.firestore().collection('users')
          .doc(this.user.uid).collection('records').orderBy('date', 'desc').get()
        const result = recordsSnapshot.docs.map(doc => {
          return { data: doc.data(), id: doc.id }
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
          .where('uid', '==', this.user.uid).get()
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
