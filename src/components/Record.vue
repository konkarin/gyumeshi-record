<template>
  <div>
    <modal
      name="tweet"
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
    isDisabled () {
      return !this.validSumScore
    },
    validSumScore () {
      // scoresが初期値の場合、評価しない
      if (this.scores.length === 0) {
        return false
      } else {
        const sum = this.scores.reduce((accumlator, currentVal) => {
          return parseInt(accumlator) + parseInt(currentVal)
        })
        return sum <= 100
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
    hide () {
      this.$modal.hide('tweet')
    },
    async submitRecord () {
      const data = {
        memo: this.memo,
        scores: this.scores.map(score => parseInt(score))
      }
      const func = firebase.functions().httpsCallable('record')
      // 引数を付けて呼び出し
      func(data).then(res => {
        console.log(res)
      }).catch(e => {
        console.log(e)
      })
      // const record = firebase.functions().httpsCallable('record')
      // try {
      //   const result = await record(data)
      //   alert(result)
      // } catch (e) {
      //   alert(e)
      // }
    }
  }
}
</script>
