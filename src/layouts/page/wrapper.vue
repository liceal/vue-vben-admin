<!--

  tsx渲染切换时候导致页面空白，挂载到这下面就好了
<template>
  <slot></slot>
</template>
-->
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    setup(props, { slots }) {
      return () => slots.default?.();
    },
  });
</script>

<style lang="scss" scoped></style>
