<template>
  <div class="init">
    <form>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>項目</th>
            <th>点数</th>
            <th>備考</th>
          </tr>
        </thead>
        <tbody>
          <!-- TODO:後でindex直す -->
          <tr
            v-for="(item, index) in criteria"
            :key="index"
          >
            <td>{{ index + 1 }}</td>
            <td>
              <input
                type="text"
                name="name"
                :value="item.name"
                placeholder="肉"
              >
            </td>
            <td>
              <input
                v-model="item.maxScore"
                name="max-score"
                placeholder="20"
                maxlength="3"
                @input="removeLetter($event, index)"
              >
            </td>
            <td>
              <input
                type="text"
                name="memo"
                :value="item.memo"
                placeholder="メモ"
              >
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <div>
      <v-btn @click="addItem">
        追加する
      </v-btn>
      <v-btn @click="removeItem">
        削除する
      </v-btn>
    </div>
    <span :style="{'color': sumMaxScoreColor}">{{ calcSumMaxScore }} / 100</span>
    <div>
      <v-btn
        type="submit"
        depressed
        color="amber darken-4"
        class="white--text"
        :disabled="!validateSumMaxScore || !validateEachMaxScore"
      >
        完了！
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      color: '',
      criteria: [
        {
          name: '肉',
          maxScore: 50,
          memo: ''
        },
        {
          name: '味噌汁',
          maxScore: 25,
          memo: ''
        },
        {
          name: '米',
          maxScore: 25,
          memo: ''
        }
      ]
    }
  },
  computed: {
    /**
     * maxScoreの合計を計算する
     * @returns {Number}
     */
    calcSumMaxScore () {
      let sum = 0
      for (const item of this.criteria) {
        // parseIntしてNaNの値は計算に含めない
        if (!isNaN(parseInt(item.maxScore))) {
          sum += parseInt(item.maxScore)
        }
      }
      return sum
    },
    /**
     * maxScoreの合計が100かどうか判定する
     * @returns {Boolean}
     */
    validateSumMaxScore () {
      if (this.calcSumMaxScore === 100) {
        return true
      }
      return false
    },
    /**
     * maxScoreの合計値によって色を返す
     * red > 100
     * blue < 100
     * green = 100
     * @returns {String}
     */
    sumMaxScoreColor () {
      if (this.calcSumMaxScore > 100) {
        return 'red'
      } else if (this.calcSumMaxScore < 100) {
        return 'blue'
      } else {
        return 'green'
      }
    },
    /**
     * 各maxScoreが入力されているか検証する
     * @returns {Boolean}
     */
    validateEachMaxScore () {
      for (const iterator of this.criteria) {
        // maxScoreが数字かつ0でない時trueを返す
        return !isNaN(iterator.maxScore) && iterator.maxScore !== 0
      }
      return false
    }
  },
  methods: {
    /**
     * 数字以外を除去する
     * @param {Object} e イベント
     * @param {Number} index 配列インデックス
     */
    removeLetter (e, index) {
      this.criteria[index].maxScore = e.target.value.replace(/\D/g, '')
    },
    /**
     * criteriaに要素を追加する
     */
    addItem () {
      const obj = {
        name: '',
        maxScore: 0,
        memo: ''
      }
      this.criteria.push(obj)
    },
    /**
     * criteriaから要素を除去する
     */
    removeItem () {
      this.criteria.pop()
    }
  }
}
</script>
