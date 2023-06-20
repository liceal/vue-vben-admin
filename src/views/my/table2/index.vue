<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';
  import { VxeGrid } from '/@/components/VxeTable';

  export default defineComponent({
    name: 'MyTable2',
    setup() {
      return () => [
        <Layout class={['h-full']}>
          <Layout.Sider class={['!bg-gray-300', 'side']}>左边</Layout.Sider>
          <Layout>
            <Layout.Content>
              <VxeGrid />
              <VxeGrid />
            </Layout.Content>
          </Layout>
          <Layout.Sider class={['!bg-gray-300', 'side']}>右边</Layout.Sider>
        </Layout>,
      ];
    },
  });
</script>

<style lang="scss" scoped></style>
