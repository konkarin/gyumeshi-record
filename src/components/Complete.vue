<template>
  <div>
    <modal
      name="complete"
      height="auto"
      width="300"
      :scrollable="true"
      @before-close="updateRecordList"
    >
      {{ completeMessage }}
      <div>
        <a
          href="https://twitter.com/share?text=牛めしを食いました。80点&url=https://gyumeshi-record.web.app/&hashtags=GyumeshiRecord"
          target="_blank"
          class="twitter-share-button"
        >Tweetする</a>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  props: {
    completeMessage: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  methods: {
    updateRecordList () {
      this.$emit('update-record', true)
    }
  }
}
</script>
