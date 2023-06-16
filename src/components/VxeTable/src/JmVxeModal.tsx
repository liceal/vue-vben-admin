import { defineComponent, computed, toRefs, PropType } from 'vue';
import { VxeModal, VxeModalInstance } from 'vxe-table';
import { merge } from 'lodash-es';
import { JmVxeModalProps } from './types';

export default defineComponent({
  name: 'JmVxeModal',
  props: {
    vxeModalRef: {
      type: Object as PropType<VxeModalInstance>,
      default: () => ({}),
    },
  },
  setup(props, { slots, attrs }) {
    const { vxeModalRef } = toRefs(props);

    // 默认配置
    const defineAttrs: JmVxeModalProps = {
      escClosable: true,
      showZoom: true,
      resize: true,
    };

    const defineSlots = {};
    const mergeAttrs = computed(() => merge(defineAttrs, attrs));

    const mergeSlots = computed(() => merge(defineSlots, slots));

    return () => [
      <VxeModal ref={vxeModalRef} {...mergeAttrs.value}>
        {{
          ...mergeSlots.value,
        }}
      </VxeModal>,
    ];
  },
});
