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
          v-for="(item, index) in criteria"
        >
          <div :key="index">
            <v-text-field
              v-model="scores[index]"
              :label="criteria[index].name"
              name="score"
              :placeholder="String(criteria[index].maxScore)"
              outlined
            />
          </div>
        </template>
        <v-textarea
          v-model="memo"
          counter
          label="感想"
          :rules="rules"
        />
        <label class="input-image ">
          <v-icon
            color="blue"
            large
          >fas fa-image</v-icon>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
          >
        </label>
        <v-checkbox
          v-model="tweetFlg"
          name="tweet-flg"
          label="ツイートする"
        />
        <v-btn
          type="button"
          class="mx-2"
          color="blue white--text"
          :disabled="isDisabled"
          @click="submitRecord"
        >
          記録する
        </v-btn>
      </div>
    </modal>
  </div>
</template>

<script>
// import axios from 'axios'
import firebase from '../firebase'
export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      scores: [],
      criteria: [],
      memo: '',
      rules: [v => v.length <= 140 || '140字までです'],
      tweetFlg: false
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
      if (this.criteria.length !== 0 && this.scores.length !== 0) {
        return this.scores.every((element, index) => this.criteria[index].maxScore > parseInt(element))
      }
      return false
    },
    /**
     * scoreの値を検証
     * @returns {Boolean}
     */
    validScore () {
      return this.scores.every(element => parseInt(element) >= 0)
    },
    /**
     * 合計値を検証
     * @returns {Boolean}
     */
    validSumScore () {
      // scoresが初期値の場合、評価しない
      if (this.scores.length === 0) {
        return false
        // 合計が100を超えている場合false
      } else {
        const sum = this.scores.reduce((accumlator, currentVal) => {
          return parseInt(accumlator) + parseInt(currentVal)
        })
        return sum <= 100 && sum >= 0
      }
    }
  },
  async mounted () {
    // userごとのcriteriaの取得
    const snapshot = await firebase.firestore().collection('users')
      .where('uid', '==', this.user.uid).get()
    snapshot.forEach(doc => {
      this.criteria = doc.data().criteria
    })
    // criteriaの長さに応じたscoresを生成
    const length = Object.keys(this.criteria).length
    for (let i = 0; i < length; i++) {
      this.scores.push('')
    }
  },
  methods: {
    // モーダルを隠す
    hide () {
      this.$modal.hide('record')
    },
    // 点数を記録する
    async submitRecord () {
      const data = {
        memo: this.memo,
        scores: this.scores.map(score => parseInt(score))
      }
      const record = firebase.functions().httpsCallable('record')
      try {
        const result = await record(data)
        console.log(result)
        alert(result)
        // this.$modal.hide('record')
      } catch (e) {
        console.log(e)
        alert(e)
      }
    }
  }
}
</script>
