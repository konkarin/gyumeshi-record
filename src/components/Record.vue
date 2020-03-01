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
      <form>
        <div
          style="padding: 20px;"
        >
          <template
            v-for="criteriaItem in criteriaList"
          >
            <div :key="criteriaItem.name">
              <v-text-field
                v-model="criteriaItem.score"
                :label="criteriaItem.name"
                name="score"
                placeholder="25"
                outlined
              />
            </div>
          </template>
          <v-textarea
            v-model="text"
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
            type="submit"
            class="mx-2"
            color="blue white--text"
            @click="submitRecord"
          >
            記録する
          </v-btn>
        </div>
      </form>
    </modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      criteriaList: [],
      text: '',
      rules: [v => v.length <= 140 || '140字までです'],
      tweetFlg: false
    }
  },
  mounted () {
    const list = [
      {
        name: '肉',
        score: null
      },
      {
        name: '米',
        score: null
      }
    ]
    this.criteriaList = list
  },
  methods: {
    hide () {
      this.$modal.hide('tweet')
    },
    submitRecord () {
      // https://us-central1-gyumeshi-record.cloudfunctions.net/helloWorld
    }
  }
}
</script>
