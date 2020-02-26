<template>
  <div>
    <div>
      <modal
        name="tweet"
        height="auto"
        width="300"
        :scrollable="true"
      >
        <form>
          <div
            style="padding: 20px;"
          >
            <template
              v-for="item in criteria"
            >
              <div :key="item.name">
                <v-text-field
                  :label="item.name"
                  name="score"
                  placeholder="25"
                  outlined
                />
                <v-text-field
                  v-model="item.memo"
                  label="メモ"
                  name="memo"
                  placeholder="おいしい"
                  outlined
                />
              </div>
            </template>
            <v-file-input
              accept="image/jpeg,image/png,image/webp,image/gif"
              label="File input"
              @change="getFileName"
            />
            <v-checkbox
              v-model="tweetFlg"
              name="tweet-flg"
              label="ツイートする"
            />

            <v-btn
              type="submit"
              class="mx-2"
              color="blue white--text"
            >
              記録する
            </v-btn>
          </div>
        </form>
      </modal>
      <v-btn
        class="mx-2"
        fab
        dark
        color="blue"
        @click="record"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
    <div
      v-for="item in timeline"
      :key="item"
      class="timeline"
    >
      <div>
        {{ item }}
      </div>
    </div>
    <div class="chart">
      chart area
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      criteria: [],
      timeline: [0, 1, 2],
      tweetFlg: false
    }
  },
  mounted () {
    const list = [
      {
        name: '肉',
        memo: ''
      },
      {
        name: '米',
        memo: ''
      }
    ]
    this.criteria = list
  },
  methods: {
    record () {
      this.$modal.show('tweet')
    }
  }
}
</script>
