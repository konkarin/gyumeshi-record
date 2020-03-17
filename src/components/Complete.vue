<template>
  <div>
    <modal
      name="complete"
      height="auto"
      width="300"
      :scrollable="true"
    >
      <slot />
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
  }
}
</script>
