<template>
  <!-- 简易版封装 -->
  <MyForm :config="config" />

  <!-- 官方的封装 -->
  <BasicForm @register="register" />
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { BasicForm, useForm, FormSchema } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';
  import { MyForm, MyFormConfigProps } from './myForm';

  const schemas: FormSchema[] = [
    {
      field: 'title',
      component: 'Input',
      label: '标题',
      colProps: {
        span: 8,
      },
      componentProps: {
        placeholder: '给目标起个名字',
      },
      required: true,
    },
  ];

  export default defineComponent({
    name: 'Form',
    components: { BasicForm, MyForm },
    setup() {
      const { createMessage } = useMessage();

      const [register, { validate, setProps }] = useForm({
        schemas,
        submitButtonOptions: {
          text: '提交',
        },
        submitFunc: async () => {
          await validate();
          console.log(register);

          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });
          setTimeout(() => {
            setProps({
              submitButtonOptions: {
                loading: false,
              },
            });
            console.log();

            createMessage.success('提交成功');
          }, 1000);
        },
      });

      const myFormData = reactive({
        a: 1,
        b: 2,
      });

      const myFormConfig: MyFormConfigProps = {
        attrs: {},
        events: {},
        items: [
          {
            field: 'a',
            component: 'Input',
          },
          {
            field: 'a',
            component: 'Input',
            attrs: {
              disabled: true,
            },
          },
        ],
      };
      return {
        register,
        myFormData,
        myFormConfig,
      };
    },
  });
</script>

<style></style>
