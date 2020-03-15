<template>
  <div>
    <div style="padding: 10px 0;">
      <!-- modal -->
      <record
        :user="user"
        :criteria-list="criteriaList"
        @complete="setCompleteMessage"
      />
      <!-- modal -->
      <complete
        :complete-message="completeMessage"
        @update-record="updateRecordList"
      />
      <div
        style="
          border-bottom-style: solid;
          border-bottom-width: 1px;
          border-bottom-color: rgb(56, 68, 77);"
      >
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
      <template v-if="recordList.length > 0">
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
      </template>
      <template v-else>
        記録しよう！
      </template>
      <div class="chart">
        <!-- <img
          width="100%"
          src="https://2.bp.blogspot.com/-2ePKnVo4ubw/VXOTvlEJxtI/AAAAAAAAuDg/-OF1k_KjePY/s800/graph10_oresen1.png"
        > -->
      </div>
    </template>
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
import Complete from './Complete'
import Init from './Init'
// mdiPencil https://qiita.com/nwtgck/items/e46b3ec16a0e79f482a5
import { mdiPencil } from '@mdi/js'
import firebase from '../firebase'

export default {
  components: { Record, Init, Complete },
  props: {
    isLoading: Boolean
  },
  data () {
    return {
      user: null,
      mdiPencil: mdiPencil,
      recordList: [],
      criteriaList: [],
      iconUrl: '',
      id: '',
      completeMessage: ''
    }
  },
  async created () {
    // ユーザー取得
    this.user = await firebase.auth().currentUser
    this.iconUrl = this.user.photoURL
    // recordの取得
    this.recordList = await this.getRecordList()
    // userのcriteriaListを取得
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
     * firestoreから記録を削除する
     */
    async deleteRecord (id) {
      const del = firebase.functions().httpsCallable('deleteRecord')
      try {
        await del(id)
        this.setCompleteMessage('削除完了！')
        this.$modal.show('complete')
      } catch (e) {
        console.error(e)
        alert(e)
      }
    },
    /**
     * Init後にcriteriaLsitを更新する
     */
    updateCriteriaList (val) {
      this.criteriaList = val
    },
    /**
     * 完了時のメッセージをセット
     */
    setCompleteMessage (val) {
      this.completeMessage = val
    },
    /**
     * recordListを取得する
     * @returns {Array}
     */
    async getRecordList () {
      this.$emit('loading', true)
      try {
        const recordsSnapshot = await firebase.firestore().collection('users')
          .doc(this.user.uid).collection('records').get()
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
      // TODO: 並び順も考慮する
      const result = []
      try {
        const usersSnapshot = await firebase.firestore().collection('users')
          .where('uid', '==', this.user.uid).get()
        usersSnapshot.forEach(doc => {
          result.push(doc.data().criteriaList)
        })
        return result
      // TODO: どっちがいい？？？？？
      // const result1 = usersSnapshot.docs.map(doc => {
      //   return doc.data().criteriaList
      // })
      // return result.pop() // or result.shift()
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
