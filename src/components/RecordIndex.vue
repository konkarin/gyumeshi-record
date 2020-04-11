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
        <span
          v-if="uid !== ''"
          style="display: flex"
        >
          <v-btn
            style="margin-left: auto;"
            @click="deleteRecord(item.id, uid)"
          >
            delete
          </v-btn>
        </span>
      </div>
    </div>
    <slot v-if="recordList.length === 0" />
    <Complete :modal-name="completeModalName">
      <div>
        削除完了！
      </div>
    </Complete>
  </div>
</template>

<script>
import firebase from '../firebase'
import Complete from './Complete'

export default {
  components: { Complete },
  props: {
    isLoading: Boolean,
    uid: {
      type: String,
      default: () => ''
    },
    criteriaList: {
      type: Array,
      default: () => []
    },
    recordList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      completeModalName: 'delete-complete'
    }
  },
  methods: {
    /**
     * firestoreから記録を削除する
     */
    async deleteRecord (recordId, uid) {
      const deleteFunction = firebase.functions().httpsCallable('deleteRecord')
      try {
        await deleteFunction({ recordId, uid })
        this.$modal.show(this.completeModalName)
      } catch (e) {
        console.error(e)
        alert(e)
      }
    },
    /**
     * completeモーダルクローズ時にrecordを更新する
     */
    async updateRecordList () {
      this.$emit('update-record')
    }
  }
}
</script>
