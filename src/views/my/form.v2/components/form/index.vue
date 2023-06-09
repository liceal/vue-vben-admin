<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Form, Row, Col, Input, InputNumber, Button, Select, Checkbox } from 'ant-design-vue';

  export default defineComponent({
    props: {
      modelValue: { type: Object, default: () => ({}) },
      config: { type: Object, default: () => {} },
    },
    setup(props) {
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

      // let exFormRef = ref(null);

      // // 测试数据
      // let modelValue = reactive({
      //   name: '张三',
      //   age: 8,
      //   sex: 1,
      //   marry: false,
      // });
      // let config = {
      //   // form: {
      //   //   labelCol: { span: 6, offset: 1 },
      //   //   labelAlign: 'left',
      //   // },
      //   // row: {
      //   //   justify: 'end',
      //   // },
      //   formRef: exFormRef,
      //   col: {
      //     span: 6,
      //   },
      //   items: [
      //     {
      //       label: '名字',
      //       field: 'name',
      //       component: 'input',
      //       rules: [{ required: true, message: '必填' }],
      //       formItem: {
      //         help: '这个是名字的自定义提示信息',
      //       },
      //     },
      //     {
      //       label: '年龄',
      //       field: 'age',
      //       component: 'inputNumber',
      //       rules: [{ required: true, message: '必填', trigger: 'blur' }],
      //     },
      //     {
      //       label: '性别',
      //       field: 'sex',
      //       component: {
      //         name: 'select',
      //         attrs: {
      //           options: [
      //             {
      //               label: '男',
      //               value: 1,
      //               pppp: '其他属性',
      //               asdlasdlkj: 'zcxv',
      //             },
      //             {
      //               label: '女',
      //               value: 2,
      //               zxczxc: '啊啊啊？',
      //               werwqer: '啦啦啦',
      //             },
      //           ],
      //           onChange: (e, v) => {
      //             console.log(e, v);
      //           },
      //         },
      //       },
      //       rules: [{ required: true, message: '必填', trigger: 'blur' }],
      //     },
      //     {
      //       label: '是否结婚',
      //       field: 'marry',
      //       component: {
      //         name: 'checkbox',
      //         content: '是/否',
      //         attrs: {
      //           onChange: (e) => {
      //             console.log(e);
      //           },
      //         },
      //       },
      //       rules: [{ required: true, message: '必填', trigger: 'blur' }],
      //     },
      //     {
      //       label: '带属性的输入',
      //       field: 'shux',
      //       component: {
      //         name: 'input',
      //         attrs: {
      //           addonAfter: '啊啊啊',
      //           addonBefore: '啦啦啦',
      //           onChange: (e) => {
      //             console.log(e);
      //           },
      //         },
      //       },
      //       rules: [{ required: true, message: '必填' }],
      //     },
      //     {
      //       label: '自定义',
      //       field: 'custom-11',
      //       span: 8,
      //       component: (data, field) => {
      //         return [<Button>自定义</Button>, data[field], <Input v-model:value={data[field]} />];
      //       },
      //       formItem: {},
      //     },
      //     {
      //       label: '复杂的输入组',
      //       col: { span: 8 },
      //       component: {
      //         name: 'inputGroup',
      //         attrs: { compact: false },
      //         row: { wrap: false },
      //         items: [
      //           {
      //             field: 'sex',
      //             component: {
      //               name: 'select',
      //               attrs: {
      //                 options: [
      //                   {
      //                     label: '男',
      //                     value: 1,
      //                     pppp: '其他属性',
      //                     asdlasdlkj: 'zcxv',
      //                   },
      //                   {
      //                     label: '女',
      //                     value: 2,
      //                     zxczxc: '啊啊啊？',
      //                     werwqer: '啦啦啦',
      //                   },
      //                   {
      //                     label: '奥斯陆扩大拉萨看得见离开',
      //                     value: 3,
      //                   },
      //                 ],
      //                 onChange: (e, v) => {
      //                   console.log(e, v);
      //                 },
      //               },
      //             },
      //             rules: [{ required: true, message: '必填', trigger: 'blur' }],
      //           },
      //           {
      //             field: 'fuza-2',
      //             component: {
      //               name: 'input',
      //               attrs: {
      //                 addonAfter: '啊啊啊',
      //                 addonBefore: '啦啦啦',
      //                 onChange: (e) => {
      //                   console.log(e);
      //                 },
      //               },
      //             },
      //             rules: [{ required: true, message: '必填' }],
      //             col: { flex: 'auto' },
      //           },
      //         ],
      //       },
      //     },
      //   ],
      // };

      // 配置
      function renderForm() {
        const { items, row, form, formRef } = props.config;
        return [
          <Form model={props.modelValue} {...form} ref={formRef}>
            <Row {...row}>{items.map((v) => renderItem(v, props.modelValue))}</Row>
          </Form>,
        ];
      }

      function renderItem(item, data, inheritCol = true) {
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
        const { field, rules, label, formItem: itemFormItem } = item;
        function formItemAttrs() {
          const { formItem } = props.config;
          return {
            name: field,
            rules,
            label,
            ...formItem,
            ...itemFormItem,
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
        if (Object.prototype.toString.call(component) === '[object String]') {
          name = component;
          Comp = componentMap.get(name);
        } else if (Object.prototype.toString.call(component) === '[object Object]') {
          name = component.name;
          attrs = component.attrs || {};
          content = component.content;
          items = component.items;
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
              return [<Comp {...compProps}>{items()}</Comp>];
            } else if (Object.prototype.toString.call(items) === '[object Array]' && items.length) {
              return [
                <Comp {...compProps}>
                  <Row {...component.row}>{items.map((v) => renderItem(v, data, false))}</Row>
                </Comp>,
              ];
            }
          }
          return [<Comp {...compProps} />];
        }
      }

      return () => [
        renderForm(),
        <Button
          onClick={() => {
            console.log(props.modelValue);
          }}
        >
          验证数据
        </Button>,
      ];
    },
  });
</script>

<style lang="scss" scoped>
  .ant-form-item .ant-input-group .ant-select {
    width: 100%;
  }
</style>
