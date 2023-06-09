<template>
  <div>
    <Form v-model="formData" :config="config" />
  </div>
</template>

<script lang="tsx">
  import { defineComponent, ref, reactive } from 'vue';
  import Form from './components/form/index.vue';
  import { Input, InputNumber, Button, Select, Checkbox } from 'ant-design-vue';

  export default defineComponent({
    name: 'Formv2',
    components: {
      Form,
    },
    setup() {
      // 组件字典
      const componentMap = new Map();
      componentMap.set('input', Input);
      componentMap.set('inputNumber', InputNumber);
      componentMap.set('select', Select);
      componentMap.set('checkbox', Checkbox);
      componentMap.set('inputGroup', Input.Group);

      let exFormRef = ref(null);

      // 测试数据
      let formData = reactive({
        name: '张三',
        age: 8,
        sex: 1,
        marry: false,
      });
      let config = {
        // form: {
        //   labelCol: { span: 6, offset: 1 },
        //   labelAlign: 'left',
        // },
        // row: {
        //   justify: 'end',
        // },
        formRef: exFormRef,
        col: {
          span: 6,
        },
        items: [
          {
            label: '名字',
            field: 'name',
            component: 'input',
            rules: [{ required: true, message: '必填' }],
            formItem: {
              help: '这个是名字的自定义提示信息',
            },
          },
          {
            label: '年龄',
            field: 'age',
            component: 'inputNumber',
            rules: [{ required: true, message: '必填', trigger: 'blur' }],
          },
          {
            label: '性别',
            field: 'sex',
            component: {
              name: 'select',
              attrs: {
                options: [
                  {
                    label: '男',
                    value: 1,
                    pppp: '其他属性',
                    asdlasdlkj: 'zcxv',
                  },
                  {
                    label: '女',
                    value: 2,
                    zxczxc: '啊啊啊？',
                    werwqer: '啦啦啦',
                  },
                ],
                onChange: (e, v) => {
                  console.log(e, v);
                },
              },
            },
            rules: [{ required: true, message: '必填', trigger: 'blur' }],
          },
          {
            label: '是否结婚',
            field: 'marry',
            component: {
              name: 'checkbox',
              content: '是/否',
              attrs: {
                onChange: (e) => {
                  console.log(e);
                },
              },
            },
            rules: [{ required: true, message: '必填', trigger: 'blur' }],
          },
          {
            label: '带属性的输入',
            field: 'shux',
            component: {
              name: 'input',
              attrs: {
                addonAfter: '啊啊啊',
                addonBefore: '啦啦啦',
                onChange: (e) => {
                  console.log(e);
                },
              },
            },
            rules: [{ required: true, message: '必填' }],
          },
          {
            label: '自定义',
            field: 'custom-11',
            span: 8,
            component: (data, field) => {
              return [<Button>自定义</Button>, data[field], <Input v-model:value={data[field]} />];
            },
            formItem: {},
          },
          {
            label: '复杂的输入组',
            col: { span: 8 },
            component: {
              name: 'inputGroup',
              attrs: { compact: false },
              row: { wrap: false },
              items: [
                {
                  field: 'sex',
                  component: {
                    name: 'select',
                    attrs: {
                      options: [
                        {
                          label: '男',
                          value: 1,
                          pppp: '其他属性',
                          asdlasdlkj: 'zcxv',
                        },
                        {
                          label: '女',
                          value: 2,
                          zxczxc: '啊啊啊？',
                          werwqer: '啦啦啦',
                        },
                        {
                          label: '奥斯陆扩大拉萨看得见离开',
                          value: 3,
                        },
                      ],
                      onChange: (e, v) => {
                        console.log(e, v);
                      },
                    },
                  },
                  rules: [{ required: true, message: '必填', trigger: 'blur' }],
                },
                {
                  field: 'fuza-2',
                  component: {
                    name: 'input',
                    attrs: {
                      addonAfter: '啊啊啊',
                      addonBefore: '啦啦啦',
                      onChange: (e) => {
                        console.log(e);
                      },
                    },
                  },
                  rules: [{ required: true, message: '必填' }],
                  col: { flex: 'auto' },
                },
              ],
            },
          },
        ],
      };

      // return ()=>{
      //   exFormRef,
      //   formData,
      //   config,

      // };
      return () => [
        <Form v-model={formData} config={config} />,
        <Button
          onClick={() => {
            console.log(formData);
            console.log(exFormRef);
          }}
        >
          验证数据1111
        </Button>,
      ];
    },
  });
</script>

<style lang="scss" scoped></style>
