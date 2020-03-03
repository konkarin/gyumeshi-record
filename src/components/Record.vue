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
          v-for="(score, index) in scores"
        >
          <div :key="index">
            <v-text-field
              v-model="scores[index]"
              :label="criteria[index].name"
              name="score"
              placeholder="25"
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
  data () {
    return {
      scores: ['', ''],
      criteria: [
        {
          name: '肉',
          maxScore: 70
        },
        {
          name: '味噌汁',
          maxScore: 30
        }
      ],
      memo: '',
      rules: [v => v.length <= 140 || '140字までです'],
      tweetFlg: false
    }
  },
  methods: {
    hide () {
      this.$modal.hide('tweet')
    },
    async submitRecord () {
      const data = {
        memo: this.memo,
        date: new Date(),
        scores: this.scores
      }
      const record = firebase.functions().httpsCallable('record')
      try {
        const result = await record(data)
        alert(result)
      } catch (e) {
        alert(e)
      }
      // const url = 'https://us-central1-gyumeshi-record.cloudfunctions.net/helloWorld'
      // const headers = {
      //   'Content-Type': 'application/json'
      // }
      // const res = await axios.post(url, data, headers)
      // alert(res)
    }
  }
}
</script>
