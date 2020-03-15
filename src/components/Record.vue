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
            <v-text-field
              v-model="scores[index]"
              :label="criteria.name"
              name="score"
              :placeholder="String(criteria.maxScore)"
              outlined
              autocomplete="off"
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
        <v-btn
          type="button"
          class="mx-2"
          color="blue white--text"
          :disabled="isDisabled"
          @click="record"
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
      rules: [v => v.length <= 140 || '140字までです']
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
        return this.scores.every((element, index) => this.criteriaList[index].maxScore > parseInt(element))
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
        this.$emit('complete', '完了')
        this.$modal.show('complete')
      } catch (e) {
        console.error(e)
        // TODO: debug用後で消す
        alert(e)
      }
    }
  }
}
</script>
