import { RendererOptions } from 'vxe-table';
import { Button, Dropdown, Menu, Input, InputNumber } from 'ant-design-vue';
import Icon from '@/components/Icon/Icon.vue';
import { getComponent } from './common';
import { h, computed } from 'vue';

const renderComponent: Record<string, RendererOptions> = {
  dropDownButton: {
    renderToolbarButton: (renderOpts) => {
      // console.log(renderOpts, params);
      const { props = {}, events = {}, attrs = {}, children = [] } = renderOpts;

      function renderChildren() {
        return children.map((child) => [
          <Menu.Item {...child.menuItemAttrs}>
            <Button {...child.buttonAttrs}>{child.label}</Button>
          </Menu.Item>,
        ]);
      }

      return [
        <Dropdown.Button {...attrs} {...events}>
          {{
            // default: () => ['hello', <Icon icon="ion:bar-chart-outline" />],
            default: props.label,
            overlay: () => [<Menu>{renderChildren()}</Menu>],
            icon: () => [<Icon icon="ion:bar-chart-outline" />],
            ...props.slots,
          }}
        </Dropdown.Button>,
      ];
    },
  },
  AInputGroup: {
    renderItemContent: (renderOpts, params) => {
      // console.log(renderOpts, params);

      const { props = {}, events = {}, children = [] } = renderOpts;
      const { data } = params;

      function renderChildren() {
        return children.map((child) => {
          const { name = '', props = {}, events = {}, field = '', filedKey = 'value' } = child;
          const Comp = getComponent(name);
          return [
            h(Comp, {
              ...props,
              ...events,
              ...{
                [`onUpdate:${filedKey}`]: (value) => {
                  data[field] = value;
                },
                [filedKey]: data[field],
              },
            }),
          ];
        });
      }

      return [
        <Input.Group {...props} {...events}>
          {renderChildren()}
        </Input.Group>,
      ];
    },
  },
  AInputRange: {
    renderItemContent: (renderOpts, params) => {
      const { props } = renderOpts;
      const { data } = params;
      const { separator, right, left, size = '' } = props as any;

      function renderSeparator() {
        if (separator) {
          return [<span>{separator}</span>];
        }
        return [<span>-</span>];
      }
      function renderCmp(opt) {
        const { component = '', field = '', attrs = {} } = opt;
        const _attrs = computed(() => ({
          size,
          ...attrs,
        }));
        if (component === 'number') {
          return <InputNumber v-model:value={data[field]} {..._attrs.value} />;
        } else if (component === 'input') {
          return <Input v-model:value={data[field]} {..._attrs.value} />;
        } else {
          return '没有这个组件';
        }
      }
      function renderRight() {
        if (right) {
          const Cmp = renderCmp(right);
          return Cmp;
        }
        return '请设置right';
      }

      function renderLeft() {
        if (left) {
          const Cmp = renderCmp(left);
          return Cmp;
        }
        return '请设置left';
      }

      return [
        <div class={['input-range']}>
          {renderRight()}
          {renderSeparator()}
          {renderLeft()}
        </div>,
      ];
    },
  },
  //表单的 查询，重置按钮
  formSearchReset: {
    renderItemContent: (renderOpts, params) => {
      console.log(renderOpts, params);
      const { $form, data } = params;
      const { props = {} } = renderOpts;
      const { size = 'small', reset = null, search = null, searchValid = null } = props;

      function renderSearch() {
        return [
          <Button
            block
            type="primary"
            size={size}
            onClick={() => {
              if (search) {
                search($form);
              } else {
                $form.validate((err) => {
                  if (err) {
                    console.log('表单错误', err);
                  }
                  if (searchValid) {
                    searchValid(data);
                  }
                });
              }
            }}
          >
            查询
          </Button>,
        ];
      }

      function renderReset() {
        return [
          <Button
            block
            size={size}
            onClick={() => {
              if (reset) {
                reset($form);
              } else {
                $form.reset();
              }
            }}
          >
            重置
          </Button>,
        ];
      }

      return [
        <div class={['form-searchreset']}>
          {renderSearch()}
          {renderReset()}
        </div>,
      ];
    },
  },
};

export default renderComponent;
