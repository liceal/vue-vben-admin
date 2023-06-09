<template>
  <div>
    <Form />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Form from './components/form/index.vue';

  export default defineComponent({
    name: 'Formv2',
    components: {
      Form,
    },
    setup() {
      // const formData = reactive({
      //   a: 1,
      // });
      // const formConfig = {
      //   attrs: {
      //     labelAlign: 'left',
      //   },
      // };
      // return {
      //   formData,
      // };
    },
  });
</script>

<style lang="scss" scoped></style>
