import { defineComponent, computed } from 'vue';
import { VxeGrid, VxeGridProps } from 'vxe-table';
import { merge } from 'lodash-es';

export default defineComponent({
  name: 'JmVxeGrid',
  props: {},
  setup(props, { slots, attrs }) {
    // 默认配置
    const defineAttrs: VxeGridProps = {
      exportConfig: {},
    };

    const defineSlots = {
      // form: () => [
      // <div class="py-4 px-8 bg-white">
      //   <JmForm />
      // </div>,
      // ],
    };

    const mergeAttrs = computed(() => merge(defineAttrs, attrs));

    const mergeSlots = computed(() => merge(defineSlots, slots));

    return () => [
      <VxeGrid {...mergeAttrs.value}>
        {{
          ...mergeSlots.value,
        }}
      </VxeGrid>,
    ];
  },
});
