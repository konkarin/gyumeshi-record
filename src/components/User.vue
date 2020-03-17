<template>
  <div>
    <record-index>
      {{ $route.params.id }}
    </record-index>
  </div>
</template>

<script>
import RecordIndex from './RecordIndex'

export default {
  components: { RecordIndex },
  props: {
    isLoading: Boolean
  },
  data () {
    return {}
  },
  async created () {
    this.$emit('loading', false)
  }
}
</script>
