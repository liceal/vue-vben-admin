import { defineComponent, ref } from 'vue';

import { getMenus } from '/@/router/menus';

import { Drawer, Menu } from 'ant-design-vue';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';

export default defineComponent({
  setup() {
    const { setMenuSetting, getCollapsed } = useMenuSetting();

    function handleClose() {
      setMenuSetting({
        collapsed: true,
      });
    }

    const menus = ref();
    getMenus().then((res) => {
      console.log(res);
      menus.value = res;
    });

    async function renderMenu() {
      console.log(menus);

      return [
        <Menu mode="vertical">
          <Menu.Item>1</Menu.Item>
          <Menu.Item>1</Menu.Item>
        </Menu>,
      ];
    }

    return () => [
      <Drawer
        placement="left"
        visible={!getCollapsed.value}
        onClose={() => handleClose()}
        mask={false}
        style={{ top: '35px', height: 'calc(100vh - 35px)' }}
      >
        {renderMenu()}
      </Drawer>,
    ];
  },
});
