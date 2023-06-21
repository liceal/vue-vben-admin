<script lang="tsx">
  import { defineComponent, reactive } from 'vue';
  import {
    VxeGrid,
    VxeGridProps,
    // VxeGridMethods,
    VxeForm,
    VxeFormProps,
  } from '/@/components/VxeTable';
  import { Splitpanes, Pane } from '/@/components/Splitpanes';
  import { Input } from 'ant-design-vue';

  export default defineComponent({
    name: 'MyTable2',
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

      // grid配置
      // const vxeGridRef = ref<VxeGridMethods>();
      const vxeData = reactive(dataGenerate());

      const vxeGridProps: VxeGridProps = {
        data: vxeData,
        height: 'auto',
        columns: [
          {
            field: 'name',
            title: '名字',
            children: [
              {
                field: 'name',
                width: '100px',
                slots: {
                  header: () => [<Input size="small" />],
                },
              },
            ],
          },
          {
            title: '操作',
            width: '100px',
            cellRender: {
              name: '$button',
              props: {
                status: 'primary',
              },
              events: {
                click: () => {
                  console.log(1);
                },
              },
            },
          },
        ],
      };

      // vxeform配置
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
        price: '',
        price1: '',
        price2: '',
      });
      const vxeFormProps: VxeFormProps = {
        data: vxeFormData,
        className: 'vxe-form--vertical',
        items: [
          {
            field: 'name',
            title: '多行文本',
            resetValue: '我是默认文本啦~',
            itemRender: {
              name: 'ATextarea',
              props: {},
            },
          },
          {
            field: 'email',
            title: '邮箱',
            itemRender: {
              name: 'AInput',
              props: {
                size: 'small',
              },
            },
          },
          {
            field: 'type',
            title: '下拉选项',
            itemRender: {
              name: 'ASelect',
              props: {
                size: 'small',
                showSearch: true,
                options: [
                  {
                    label: '阿松大',
                    value: 1,
                  },
                  {
                    label: '阿斯顿飞过',
                    value: 2,
                  },
                ],
              },
            },
          },
          {
            field: 'type1',
            title: '下拉选项多选',
            itemRender: {
              name: 'ASelect',
              props: {
                size: 'small',
                showSearch: true,
                mode: 'multiple',
                options: [
                  {
                    label: '阿松大',
                    value: 1,
                  },
                  {
                    label: '阿斯顿飞过',
                    value: 2,
                  },
                ],
              },
            },
          },
          {
            field: 'daterange',
            title: '日期范围',
            itemRender: {
              name: 'ARangePicker',
              props: {
                size: 'small',
              },
            },
          },
          {
            field: 'price',
            title: '输入框范围',
            itemRender: {
              name: 'AInputRange',
              props: {
                size: 'small',
                separator: '-',
                right: {
                  field: 'price1',
                  component: 'number',
                  attrs: {},
                },
                left: {
                  field: 'price2',
                  component: 'number',
                  attrs: {},
                },
              },
            },
          },
          {
            itemRender: {
              name: 'formSearchReset',
              props: {
                searchValid(data) {
                  console.log(data);
                },
              },
            },
          },
        ],
        rules: {
          name: [{ required: true, content: '多行文本必填' }],
        },
        validConfig: {
          showMessage: false,
        },
      };

      return () => [
        <Splitpanes style="height: 100%">
          <Pane minSize="15" class="bg-white p-2">
            <VxeForm {...vxeFormProps} />
          </Pane>
          <Pane size="70">
            <Splitpanes horizontal>
              <Pane minSize="30">
                <VxeGrid {...vxeGridProps} />
              </Pane>
              <Pane minSize="30">
                <VxeGrid {...vxeGridProps} />
              </Pane>
            </Splitpanes>
          </Pane>
          <Pane minSize="15">5</Pane>
        </Splitpanes>,
      ];
    },
  });
</script>

<style lang="scss" scoped></style>
