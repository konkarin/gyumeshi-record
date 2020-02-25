<template>
  <div>
    <div>
      <modal
        name="tweet"
        height="auto"
        :scrollable="true"
      >
        <div
          v-for="item in criteria"
          :key="item"
        >
          <div>
            {{ item.name }}
          </div>
          <v-text-field
            label="点数"
            name="score"
            placeholder="25"
            outlined
          />
          <v-text-field
            label="メモ"
            name="memo"
            placeholder="メモ"
            outlined
          />
        </div>
      </modal>
      <v-btn
        class="mx-2"
        fab
        dark
        color="blue"
        @click="addTweet"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
    <div
      v-for="item in tweetList"
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
      tweetList: [0, 1, 2]
    }
  },
  mounted () {
    const list = [0, 1, 2]
    this.criteria = list
  },
  methods: {
    addTweet () {
      this.$modal.show('tweet')
    }
  }
}
</script>
