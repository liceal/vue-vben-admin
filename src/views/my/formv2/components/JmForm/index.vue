<script lang="tsx">
  import { defineComponent, reactive } from 'vue';
  import {
    Form,
    Row,
    Col,
    Input,
    InputNumber,
    Button,
    Select,
    Checkbox,
    FormInstance,
    FormProps,
    FormItemProps,
    RowProps,
    ColProps,
  } from 'ant-design-vue';
  import { merge } from 'lodash-es';

  export interface JmFormConfigProps {
    formRef: FormInstance;
    form: FormProps;
    row: RowProps;
    formItem: FormItemProps;
    col: ColProps;
    items: {
      label: string;
      field: string;
      span: number;
      component:
        | {
            name: string;
            attrs: Object;
            content: string; //显示的内容
            modelKey: 'value' | 'checked';
            items: Array; //递归组件
          }
        | Function
        | String;
      rules: Object;
      formItem: FormItemProps;
      col: ColProps;
    }[];
  }

  export default defineComponent({
    props: {
      modelValue: {
        type: Object,
        default: () =>
          reactive({
            a: 1,
            b: 2,
          }),
      },
      config: {
        type: Object as () => JmFormConfigProps,
        default: () => ({
          col: { span: 8 },
          items: [
            {
              label: '自由的',
              field: 'a',
              component: 'input',
            },
            {
              col: { span: 24 },
              component: {
                preset: 'formButtons',
              },
            },
          ],
        }),
      },
    },
    setup(props) {
      const presets = {
        formButtons: {
          row: {
            justify: 'end',
          },
          items: [
            {
              component: {
                name: 'button',
                content: 'asd阿松大',
              },
            },
            {
              component: {
                name: 'button',
                content: 'asd阿松大',
              },
            },
          ],
        },
      };

      // const modelValue = toRef(props, 'modelValue');
      // const config = toRef(props, 'config');

      // console.log(modelValue, config);

      // 组件字典
      const componentMap = new Map();
      componentMap.set('input', Input);
      componentMap.set('inputNumber', InputNumber);
      componentMap.set('select', Select);
      componentMap.set('checkbox', Checkbox);
      componentMap.set('inputGroup', Input.Group);
      componentMap.set('button', Button);

      // 配置
      function renderForm() {
        const { items = [], row = {}, form = {}, formRef = {} } = props.config;
        return [
          <Form model={props.modelValue} {...form} ref={formRef}>
            <Row {...row}>{items.map((v) => renderItem(v, props.modelValue))}</Row>
          </Form>,
        ];
      }

      function renderItem(item, data, inheritCol = true) {
        console.log(item);
        const { span, col: itemCol } = item;

        function colAttrs() {
          const { col } = props.config;

          return {
            ...(inheritCol ? col : {}),
            ...itemCol,
            ...(span ? { span: span } : {}),
          };
        }

        return [<Col {...colAttrs()}>{renderFormItem(item, data)}</Col>];
      }

      function renderFormItem(item, data) {
        const { field, rules, label, formItem: itemFormItem, verify = true } = item;
        function formItemAttrs() {
          const { formItem } = props.config;
          return {
            name: field,
            rules,
            label,
            ...formItem,
            ...itemFormItem,
            style: {
              ...(verify ? {} : { marginBottom: 0 }),
              ...(field ? {} : { marginBottom: 0 }),
            },
          };
        }

        return [<Form.Item {...formItemAttrs()}>{renderComponent(item, data)}</Form.Item>];
      }

      function renderComponent(item, data) {
        const { component, field } = item;

        let name;
        let attrs = {};
        let content = '';
        let modelKey;
        let Comp;
        let items;
        let row;
        if (Object.prototype.toString.call(component) === '[object String]') {
          name = component;
          Comp = componentMap.get(name);
        } else if (Object.prototype.toString.call(component) === '[object Object]') {
          const _component = merge(component, presets[component.preset]);
          console.log(_component);
          name = _component.name;
          attrs = _component.attrs || {};
          content = _component.content;
          items = _component.items;
          row = _component.row;
          Comp = componentMap.get(name);
        } else if (Object.prototype.toString.call(component) === '[object Function]') {
          return [component(data, field)];
        }

        if (name === 'checkbox') {
          modelKey = 'checked';
        } else {
          modelKey = 'value';
        }

        const compProps = {
          ...attrs,
          ...{
            [`onUpdate:${modelKey}`]: (value) => {
              data[field] = value;
            },
            [modelKey]: data[field],
          },
        };

        if (Comp) {
          if (content) {
            if (Object.prototype.toString.call(content) === '[object Function]') {
              return [<Comp {...compProps}>{content()}</Comp>];
            } else {
              return [<Comp {...compProps}>{content}</Comp>];
            }
          }
          if (items) {
            if (Object.prototype.toString.call(items) === '[object Function]') {
              return [
                <Comp {...compProps}>
                  <Row {...row}>{items()}</Row>
                </Comp>,
              ];
            } else if (Object.prototype.toString.call(items) === '[object Array]' && items.length) {
              return [
                <Comp {...compProps}>
                  <Row {...row}>{items.map((v) => renderItem(v, data, false))}</Row>
                </Comp>,
              ];
            }
          }
          return [<Comp {...compProps} />];
        } else {
          if (items) {
            if (Object.prototype.toString.call(items) === '[object Function]') {
              return [<Row {...row}>{items()}</Row>];
            } else if (Object.prototype.toString.call(items) === '[object Array]' && items.length) {
              return [<Row {...row}>{items.map((v) => renderItem(v, data, false))}</Row>];
            }
          }
        }
      }

      return () => [
        renderForm(),
        // <Button
        //   onClick={() => {
        //     console.log(props.modelValue);
        //   }}
        // >
        //   验证数据内部
        // </Button>,
      ];
    },
  });
</script>

<style lang="scss" scoped>
  .ant-form-item .ant-input-group .ant-select {
    width: 100%;
  }
</style>
