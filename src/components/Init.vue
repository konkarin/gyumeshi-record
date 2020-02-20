<template>
  <div class="init">
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
              :value="item.name"
              placeholder="肉"
            >
          </td>
          <td>
            <input
              type="text"
              :value="item.maxScore"
              placeholder="20"
            >
          </td>
          <td>
            <input
              type="text"
              :value="item.memo"
              placeholder="メモ"
            >
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button @click="addItem">
        追加する
      </button>
      <button @click="removeItem">
        削除する
      </button>
    </div>
    <div>
      <button>
        完了！
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
  methods: {
    addItem () {
      const obj = {
        name: '',
        maxScore: 0,
        memo: ''
      }
      this.criteria.push(obj)
    },
    removeItem () {
      this.criteria.pop()
    }
  }
}
</script>
