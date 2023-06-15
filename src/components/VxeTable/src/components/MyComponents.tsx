import { RendererOptions } from 'vxe-table';
import { Button, Dropdown, Menu, Input } from 'ant-design-vue';
import Icon from '@/components/Icon/Icon.vue';
import { getComponent } from './common';
import { h } from 'vue';

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
      console.log(renderOpts, params);

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
};

export default renderComponent;
