<template>
  <div>
    <modal
      :name="modalName"
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
    modalName: {
      type: String,
      default: ''
    }
  }
}
</script>
