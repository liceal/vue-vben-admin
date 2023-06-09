<!--
封装antv form 简易封装，尽量少增加数据结构 以官方为准
-->

<script lang="tsx">
  import { defineComponent, reactive, PropType, Component, toRefs } from 'vue';
  import { Input, Form, Button, Row } from 'ant-design-vue';
  import { MyFormConfigProps, MyFormItemProps, MyFormItemRenderProps } from './types/form';

  // 注册组件
  const componentMap = new Map<string, Component>();

  componentMap.set('Input', Input);

  export default defineComponent({
    name: '',
    props: {
      modelValue: {
        type: Object,
        default: () =>
          reactive({
            a: 1,
            b: 2,
            c: 3,
          }),
      },
      config: {
        type: Object as PropType<MyFormConfigProps>,
        default: () => ({
          attrs: {
            wrapperCol: { span: 24 },
          },
          events: {},
          items: [
            {
              field: 'a',
              component: 'Input',
              attrs: {
                addonAfter: '前缀',
                addonBefore: '后缀',
              },
              events: {
                change: (e) => {
                  console.log('输入：', e);
                },
              },
            },
          ],
        }),
      },
    },
    emits: [],
    setup(props) {
      const { modelValue, config } = toRefs(props);

      console.log(modelValue, config);

      function renderForm(config = {}) {
        let { attrs = {}, events = {}, items = [] } = config.value;

        return (
          <Form {...attrs} {...events}>
            <Row>{items.map((item) => [renderFormItem(item, modelValue)])}</Row>
          </Form>
        );
      }

      function renderFormItem(item: MyFormItemProps = {}) {
        return <Form.Item>{renderItem(item.render)}</Form.Item>;
      }

      function renderItem(render: MyFormItemRenderProps = {}) {
        const { component, field, attrs, events } = render;

        const Comp = componentMap.get(component);

        // return <Comp {...aa} />;
        return <Comp v-model:value={modelValue.value[field]} {...attrs} {...events} />;
      }

      return () => [
        renderForm(config),
        <Button
          onClick={() => {
            console.log(modelValue);
          }}
        >
          验证
        </Button>,
      ];
    },
  });
</script>

<style lang="scss" scoped></style>
