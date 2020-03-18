<template>
  <div class="init">
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>項目</th>
          <th>点数</th>
        </tr>
      </thead>
      <tbody>
        <!-- TODO:後でindex直す -->
        <tr
          v-for="(criteria, index) in inputCriteriaList"
          :key="index"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <v-text-field
              v-model="criteria.name"
              name="name"
              placeholder="肉"
              outlined
              autocomplete="off"
            />
          </td>
          <td>
            <v-text-field
              v-model="criteria.maxScore"
              name="max-score"
              placeholder="20"
              maxlength="3"
              outlined
              autocomplete="off"
              @input="removeLetter($event, index)"
            />
          </td>
        </tr>
      </tbody>
    </table>
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
        :disabled="isDisabled"
        @click="createCriteria"
      >
        完了！
      </v-btn>
    </div>
    <complete :modal-name="modalName">
      <div>
        設定完了！
      </div>
    </complete>
  </div>
</template>

<script>
import firebase from '../firebase'
import Complete from './Complete'

export default {
  components: { Complete },
  props: {
    isLoading: Boolean,
    criteriaList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      user: null,
      color: '',
      inputCriteriaList: [
        {
          name: '肉',
          maxScore: 50
        },
        {
          name: '味噌汁',
          maxScore: 25
        },
        {
          name: '米',
          maxScore: 25
        }
      ],
      modalName: 'init'
    }
  },
  computed: {
    isDisabled () {
      return !(this.validateSumMaxScore && this.validateEachMaxScore)
    },
    /**
     * maxScoreの合計を計算する
     * @returns {Number}
     */
    calcSumMaxScore () {
      let sum = 0
      for (const criteria of this.inputCriteriaList) {
        // parseIntしてNaNの値は計算に含めない
        if (!isNaN(parseInt(criteria.maxScore))) {
          sum += parseInt(criteria.maxScore)
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
      for (const criteria of this.inputCriteriaList) {
        // maxScoreが数字かつ0でない時trueを返す
        return !isNaN(criteria.maxScore) && criteria.maxScore !== 0
      }
      return false
    }
  },
  async created () {
    this.user = await firebase.auth().currentUser
    this.$emit('loading', false)
  },
  methods: {
    /**
     * criteriaに要素を追加する
     */
    addItem () {
      const obj = {
        name: '',
        maxScore: 0
      }
      this.inputCriteriaList.push(obj)
    },
    /**
     * criteriaから要素を除去する
     */
    removeItem () {
      this.inputCriteriaList.pop()
    },
    /**
     * 採点基準を作成する
     */
    async createCriteria () {
      const db = firebase.firestore()
      try {
        await db.collection('users').doc(this.user.uid).set({
          criteriaList: this.inputCriteriaList,
          name: this.user.displayName,
          uid: this.user.uid
        })
        this.$modal.show(this.modalName)
        // ドキュメント作成後に画面にcriteriaListを渡す
        this.$emit('update-criteria', this.inputCriteriaList)
      } catch (error) {
        console.error(error)
      }
    },
    // TODO: initの更新の実装
    async updateCriteria () {

    }
  }
}
</script>
