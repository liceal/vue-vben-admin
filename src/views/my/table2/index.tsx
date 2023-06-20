import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import styles from './index.module.scss';

export default defineComponent({
  name: 'MyTable2',
  setup() {
    console.log(styles.layout);

    return () => [
      <Layout class={['h-full']}>
        <Layout.Sider class={['!bg-gray-400']}>
          右边
          <div class={['side-toggle']}>-</div>
        </Layout.Sider>
        <Layout>
          <Layout.Content>222</Layout.Content>
        </Layout>
        <Layout.Sider class="!bg-gray-400">
          左边
          <div class={['side-toggle']}>-</div>
        </Layout.Sider>
      </Layout>,
    ];
  },
});
