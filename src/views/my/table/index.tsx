import { defineComponent, reactive, ref } from 'vue';
// import { VxeGrid, vxeGridProps, VxeGridEventProps } from 'vxe-table';
import {
  // VxeBasicTable,
  VxeGrid,
  VxeGridProps,
  VxeGridEventProps,
  VxeGridMethods,
  // JmVxeGrid,
  JmVxeModal,
  JmVxeModalProps,
  VxeModal,
  VxeModalProps,
  VxeModalEventProps,
  VxeModalMethods,
  VxeModalInstance,
} from '/@/components/VxeTable';
import { useMessage } from '/@/hooks/web/useMessage';

import { Button, Input, Select, RangePicker } from 'ant-design-vue';
import { debounce } from 'lodash-es';

export default defineComponent({
  name: 'MyTable',
  // components: { VxeGrid, JmVxeModal, VxeBasicTable },
  setup() {
    const dataGenerate = () => {
      const data = [
        {
          id: 10000,
          parentId: null,
          name: 'test abc1',
          type: 'mp3',
          size: 1024,
          date: '2020-08-01',
        },
        { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: 0, date: '2021-04-01' },
        {
          id: 24300,
          parentId: 10050,
          name: 'Test3',
          type: 'avi',
          size: 1024,
          date: '2020-03-01',
        },
        {
          id: 20045,
          parentId: 24300,
          name: 'test abc4',
          type: 'html',
          size: 600,
          date: '2021-04-01',
        },
        {
          id: 10053,
          parentId: 24300,
          name: 'test abc96',
          type: 'avi',
          size: 0,
          date: '2021-04-01',
        },
        {
          id: 24330,
          parentId: 10053,
          name: 'test abc5',
          type: 'txt',
          size: 25,
          date: '2021-10-01',
        },
        { id: 21011, parentId: 10053, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
        { id: 22200, parentId: 10053, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        {
          id: 23666,
          parentId: null,
          name: 'Test8',
          type: 'xlsx',
          size: 2048,
          date: '2020-11-01',
        },
        { id: 23677, parentId: 23666, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23671, parentId: 23677, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23672, parentId: 23677, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23688, parentId: 23666, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23681, parentId: 23688, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23682, parentId: 23688, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        {
          id: 24555,
          parentId: null,
          name: 'test abc9',
          type: 'avi',
          size: 224,
          date: '2020-10-01',
        },
        { id: 24566, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 24577, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
      ];
      return data;
    };

    const { createMessage } = useMessage();

    const vxeGridRef = ref<VxeGridMethods>();
    const vxeData = reactive(dataGenerate());
    const vxeFormData = reactive({
      name: '张三',
      email: '111@example.com',
      groupSelect: 1,
      groupInput: '啊实打实的',
      type: '',
      size: '',
      date: '',
      sexOp: 1,
      sexIn: '',
    });

    //生成带搜索列配置
    function renderHeaderFilter(field, data) {
      return {
        field: field,
        slots: {
          header: () => [<Input v-model:value={data[field]} size="small" />],
        },
      };
    }

    // grid配置
    const vxeGridProps: VxeGridProps = {
      // data: vxeData,
      // height: 'auto',
      autoResize: true,
      syncResize: true,
      resizeConfig: {
        refreshDelay: 0,
      },
      editConfig: {
        trigger: 'click',
        mode: 'cell',
      },
      checkboxConfig: {
        range: true,
        labelField: 'id',
      },
      treeConfig: {
        transform: true,
        accordion: true,
        line: true,
        iconOpen: 'vxe-icon-square-minus',
        iconClose: 'vxe-icon-square-plus',
      },
      pagerConfig: {},
      tooltipConfig: {
        showAll: false,
      },
      toolbarConfig: {
        buttons: [
          {
            content: '打开窗口jm的',
            buttonRender: {
              name: 'AButton',
              props: {
                type: 'warning',
                preIcon: 'ion:accessibility',
              },
              events: {
                click: () => {
                  console.log(jmVxeModalRef.value);
                  jmVxeModalRef.value?.open();
                },
              },
            },
          },
          {
            content: '打开窗口原生的',
            buttonRender: {
              name: 'AButton',
              props: {
                type: 'danger',
                preIcon: 'ion:accessibility',
              },
              events: {
                click: () => {
                  console.log(vxeModalRef.value);
                  vxeModalRef.value?.open();
                },
              },
            },
          },
          {
            name: '下拉按钮',
            disabled: true,
            dropdowns: [
              {
                name: '按钮1',
                type: 'button',
                status: 'info',
              },
              {
                name: '按钮1啊十分士大夫',
                type: 'button',
                status: 'primary',
              },
            ],
          },
          {
            content: '验证数据',
            buttonRender: {
              name: 'AButton',
              props: {
                type: 'primary',
                preIcon: 'mdi:page-next-outline',
              },
              events: {
                click: () => {
                  console.log(vxeData);
                },
              },
            },
          },
          {
            content: '查看check的数据',
            buttonRender: {
              name: 'AButton',
              props: {
                type: 'primary',
                preIcon: 'mdi:page-next-outline',
              },
              events: {
                click: () => {
                  console.log(vxeGridRef.value);
                  const data = vxeGridRef.value?.getCheckboxRecords();
                  console.log(data);
                },
              },
            },
          },
          {
            buttonRender: {
              name: 'dropDownButton',
              props: {
                label: '按钮名字',
              },
              children: [{ label: '第一个按钮' }],
            },
          },
        ],
        tools: [
          {
            name: 't1',
            type: 'button',
            status: 'success',
          },
          {
            name: 't1',
            type: 'button',
            status: 'success',
          },
        ],
      },
      columns: [
        {
          type: 'checkbox',
          treeNode: true,
        },
        {
          title: '名字',
          field: 'name',
          slots: {
            header: () => [<span>名字</span>, <Input v-model:value={vxeFormData.name} />],
          },
          editRender: {
            name: 'AInput',
          },
        },
        {
          title: '类型',
          field: 'type',
          width: '100px',
          children: [
            {
              field: 'type',
              width: '100px',
              slots: {
                header: () => [
                  <Select
                    v-model:value={vxeFormData.type}
                    size="small"
                    showSearch={true}
                    style={{ width: '100%' }}
                  >
                    <Select.Option value="1">一</Select.Option>
                    <Select.Option value="2">二</Select.Option>
                  </Select>,
                ],
              },
            },
          ],
        },
        {
          ...renderHeaderFilter('size', vxeFormData),
          children: [
            {
              title: '大小',
              field: 'size',
              width: '100px',
            },
          ],
        },
        {
          title: '时间',
          field: 'date',
          width: '150px',
          children: [
            {
              field: 'date',
              width: '150px',
              slots: {
                header: () => [
                  <RangePicker
                    v-model:value={vxeFormData.date}
                    style={{ width: '100%' }}
                    size="small"
                  />,
                ],
              },
            },
          ],
        },
        {
          title: '年龄',
          field: 'sex',
          children: [
            {
              field: 'sex',
              width: '100px',
              slots: {
                header: () => [
                  <Input.Group style={{ display: 'flex' }}>
                    <Select
                      v-model:value={vxeFormData.sexOp}
                      size="small"
                      style={{ width: '3em' }}
                      showArrow={false}
                      dropdownMatchSelectWidth={false}
                    >
                      <Select.Option value={1}>男</Select.Option>
                      <Select.Option value={0}>女</Select.Option>
                      <Select.Option value={2}>隐藏</Select.Option>
                    </Select>
                    <Input v-model={vxeFormData.sexIn} size="small" style={{ flex: 1 }} />
                  </Input.Group>,
                  <Input v-model:value={vxeFormData.sexIn} size="small">
                    {{
                      addonBefore: () => [
                        <Select
                          v-model:value={vxeFormData.sexOp}
                          size="small"
                          showArrow={false}
                          dropdownMatchSelectWidth={false}
                        >
                          <Select.Option value={1}>男</Select.Option>
                          <Select.Option value={0}>女</Select.Option>
                          <Select.Option value={2}>隐藏</Select.Option>
                        </Select>,
                      ],
                    }}
                  </Input>,
                ],
              },
            },
          ],
        },
        {
          title: '操作',
          slots: {
            default: ({ row }) => [
              <Button
                onClick={() => {
                  console.log(row);
                }}
              >
                阿松大
              </Button>,
              <Button>阿松大</Button>,
            ],
          },
        },
      ],
      proxyConfig: {
        ajax: {
          query: (params) => {
            console.log('query', params);
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  total: 100000,
                  result: vxeData,
                });
              }, 1000);
            });
          },
        },
      },
      formConfig: {
        data: vxeFormData,
        titleWidth: 100,
        titleAlign: 'right',
        span: 8,
        items: [
          {
            field: 'name',
            title: '名字',
            titlePrefix: {
              message: '名字',
              icon: 'vxe-icon-question-circle-fill',
            },
            itemRender: {
              name: 'AInput',
              props: {
                placeholder: '请输入名字',
              },
            },
          },
          {
            field: 'type',
            title: '类型',
            titlePrefix: {
              useHTML: true,
              message:
                '点击链接：<a class="link" href="https://vxetable.cn" target="_blank">vxe-table官网</a>',
              icon: 'vxe-icon-question-circle-fill',
            },
            itemRender: {
              name: '$input',
              props: {
                placeholder: '请输入邮件',
              },
            },
          },
          {
            field: 'size',
            title: '大小',
            itemRender: {
              name: 'AInput',
            },
          },
          {
            field: 'groupSelectInput',
            title: '输入框组',
            itemRender: {
              name: 'AInputGroup',
              props: {
                style: 'display:flex',
              },
              children: [
                {
                  field: 'groupSelect',
                  name: 'ASelect',
                  props: {
                    style: { minWidth: '100px' },
                    options: [
                      {
                        label: '张三',
                        value: 1,
                      },
                      {
                        label: '张三张三张三张三张三张三张三张三张三',
                        value: 2,
                      },
                    ],
                  },
                },
                {
                  field: 'groupInput',
                  name: 'AInput',
                  props: {
                    style: { flex: 1 },
                    placeholder: '请输入****',
                  },
                },
              ],
            },
          },
          {
            field: 'sex',
            title: '性别',
            folding: true,
            titleSuffix: { message: '注意，必填信息！', icon: 'vxe-icon-question-circle-fill' },
            itemRender: {
              name: 'ASelect',
              props: {
                options: [
                  {
                    label: '男',
                    value: 1,
                  },
                  {
                    label: '女',
                    value: 0,
                  },
                ],
              },
            },
          },
          {
            field: 'age',
            title: '年龄',
            folding: true,
            itemRender: {
              name: 'AInputNumber',
              props: { type: 'number', min: 1, max: 10, placeholder: '请输入年龄' },
            },
          },
          {
            span: 24,
            align: 'right',
            collapseNode: true,
            itemRender: {
              name: 'AButtonGroup',
              children: [
                {
                  props: {
                    type: 'primary',
                    content: '查询',
                    htmlType: 'submit',
                  },
                  // events: {
                  //   click: (e) => {
                  //     console.log(e);

                  //     e.$form.validate((err) => {
                  //       if (err) {
                  //         console.log(err);
                  //         createMessage.warn('请填写数据');
                  //       } else {
                  //         createMessage.success('提交成功5s', 5);
                  //         console.log(vxeFormData);
                  //         e.$grid.commitProxy('query');
                  //       }
                  //     });
                  //   },
                  // },
                },
                {
                  props: { htmlType: 'reset', content: '重置' },
                  events: {
                    click: (e) => {
                      console.log(e);
                      const { data } = e;
                      data.groupInput = '';
                      data.groupSelect = 1;
                    },
                  },
                },
              ],
            },
          },
        ],
        rules: {
          email: [{ required: true, content: '名字必须填', trigger: 'change' }],
          name: [{ required: true, content: '名字必须填', trigger: 'change' }],
          groupSelectInput: [
            {
              required: true,
              trigger: 'change',
              validator: ({ data }) => {
                if (!data.groupSelect || !data.groupInput) {
                  return Promise.reject(new Error('必填'));
                }
              },
            },
          ],
          sex: [{ required: true, content: '性别必须选择', trigger: 'change' }],
          age: [{ required: true, content: '必填', trigger: 'change' }],
        },
      },
      menuConfig: {
        header: {
          options: [
            [
              {
                name: '头部按钮1',
                code: 'header-1',
                children: [
                  {
                    name: '头部按钮1',
                    code: 'header-1',
                  },
                ],
              },
              {
                name: '头部按钮1',
                code: 'header-1',
              },
            ],
            [
              {
                name: '头部按钮1',
                code: 'header-1',
              },
            ],
          ],
        },
        body: {
          options: [
            [
              {
                name: '头部按钮1',
                children: [
                  {
                    name: '头部按钮1',
                    code: 'header-1',
                  },
                ],
              },
              {
                name: '头部按钮1',
                code: 'header-1',
              },
            ],
            [
              {
                name: '头部按钮1',
                code: 'header-1',
              },
            ],
          ],
        },
      },
    };

    const vxeGridEvents: VxeGridEventProps = {
      onToolbarButtonClick: (aaa) => {
        console.log(aaa);
      },
      onCheckboxChange: (e) => {
        console.log(e);
      },
      onFormReset: (e) => {
        console.log('formreset', e);
      },
      onMenuClick: (e) => {
        console.log('menu click', e);
        const { menu } = e;
        if (menu.code === 'header-1') {
          console.log('头部 header-1');
        }
      },
      onFormSubmitInvalid: (e) => {
        console.log('formsubmit', e);
        createMessage.warning('表单校验失败');
      },
    };

    const jmVxeModalRef = ref<VxeModalMethods>();
    const jmVxeModalProps: JmVxeModalProps = {
      vxeModalRef: jmVxeModalRef,
    };
    const jmVxeModalEvent: VxeModalEventProps = {};

    const vxeModalRef = ref<VxeModalInstance>();
    const vxeModalProps: VxeModalProps = {
      width: '1200px',
      slots: {
        default: () => [
          <div class="h-500px">
            <VxeGrid ref={vxeGridRef} {...vxeGridProps} {...vxeGridEvents} />
          </div>,
        ],
      },
    };
    const VxeModalEvent: VxeModalEventProps = {};

    // const vxeGridVisible = ref(true);
    const autoHeight = ref('');
    const debounceHandleResize = debounce(() => {
      const contentElement = document.querySelector('.vben-layout-content');
      const parentElement = contentElement?.parentElement;
      const parentHeight = parentElement?.clientHeight || 0;
      const contentHeight = parentHeight * 1; // 1 表示 100%
      console.log(contentHeight + 'px');
      autoHeight.value = contentHeight + 'px';
    }, 500);
    window.addEventListener('resize', () => {
      debounceHandleResize();
    });

    return () => [
      <div class="px-4 bg-white h-full">
        <VxeGrid height={autoHeight.value} ref={vxeGridRef} {...vxeGridProps} {...vxeGridEvents} />
      </div>,

      // <br />,
      // <JmVxeGrid ref={vxeGridRef} {...vxeGridProps} {...vxeGridEvents} />,
      // <br />,
      // <VxeBasicTable {...vxeGridProps} />,
      <JmVxeModal {...jmVxeModalProps} {...jmVxeModalEvent} />,
      <VxeModal ref={vxeModalRef} {...vxeModalProps} {...VxeModalEvent} />,
      // <VxeModal ref={vxeModalRef} />,
    ];
  },
});
