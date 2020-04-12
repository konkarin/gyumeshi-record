<template>
  <div>
    <modal
      name="record"
      height="auto"
      width="300"
      :scrollable="true"
    >
      <div @click="hide">
        ×
      </div>
      <div
        style="padding: 20px;"
      >
        <template
          v-for="(criteria, index) in criteriaList"
        >
          <div :key="index">
            <input
              v-model="scores[index]"
              :label="criteria.name"
              name="score"
              :placeholder="String(criteria.maxScore)"
              autocomplete="off"
            >
          </div>
        </template>
        <input
          v-model="memo"
          label="コメント"
          :rules="rules"
        >
        <button
          type="button"
          class="mx-2"
          color="blue white--text"
          :disabled="isDisabled"
          @click="record"
        >
          記録する
        </button>
      </div>
    </modal>
    <complete :modal-name="modalName">
      <div>
        記録完了！
      </div>
      <div>
        <a
          :href="shareURL"
          target="_blank"
          class="twitter-share-button"
        >Tweetする</a>
      </div>
    </complete>
  </div>
</template>

<script>
// import axios from 'axios'
import firebase from '../firebase'
import Complete from './Complete'

export default {
  components: { Complete },
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    criteriaList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      scores: [],
      memo: '',
      rules: [v => v.length <= 140 || '140字までです'],
      modalName: 'record-complete'
    }
  },
  computed: {
    /**
     * 記録するボタンの活性非活性
     * @returns {Boolean}
     */
    isDisabled () {
      return !(this.validSumScore && this.validScore && this.compareCriteriaWithScore)
    },
    /**
     * criteria.maxScoreを超えていないか検証
     * @returns {Boolean}
     */
    compareCriteriaWithScore () {
      if (this.criteriaList.length !== 0 && this.scores.length !== 0) {
        return this.scores.every((score, index) => this.criteriaList[index].maxScore > parseInt(score))
      }
      return false
    },
    /**
     * 合計点の算出
     * @returns {Number}
     */
    sumScore () {
      if (this.scores.length !== 0) {
        return this.scores.reduce((acc, cur) => parseInt(acc) + parseInt(cur))
      }
      return NaN
    },
    /**
     * 点数を検証
     * @returns {Boolean}
     */
    validScore () {
      return this.scores.every(element => parseInt(element) >= 0)
    },
    /**
     * 合計点を検証
     * @returns {Boolean}
     */
    validSumScore () {
      // scoresが初期値の場合、評価しない
      if (isNaN(this.sumScore)) {
        return false
        // 合計が100を超えている場合false
      } else {
        return this.sumScore <= 100 && this.sumScore >= 0
      }
    },
    shareURL () {
      const url = `https://twitter.com/share?text=${this.sumScore}点の牛めしを食いました。&url=https://gyumeshi-record.web.app/&hashtags=GyumeshiRecord`
      return encodeURI(url)
    }
  },
  watch: {
    // HACK: createdとmountedだとダメだったからとりあえずwatch
    criteriaList (newCriteriaList) {
      const length = Object.keys(newCriteriaList).length
      for (let i = 0; i < length; i++) {
        this.scores.push('')
      }
    }
  },
  methods: {
    /**
     * モーダルを隠す
     */
    hide () {
      this.$modal.hide('record')
    },
    /**
     * 点数を記録する
     */
    async record () {
      if (this.isDisabled) {
        alert('HTMLを変更しましたね？')
        return
      }
      const data = {
        memo: this.memo,
        scores: this.scores.map(score => parseInt(score)),
        date: new Date()
      }
      const db = firebase.firestore()
      try {
        await db.collection('users').doc(this.user.uid)
          .collection('records').add(data)
        this.$modal.hide('record')
        this.$modal.show(this.modalName)
        this.$emit('update-record')
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
