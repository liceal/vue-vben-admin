import { CSSProperties } from 'vue';
import { VxeGridProps, VxeModalProps } from 'vxe-table';

export type BasicTableProps = VxeGridProps & {
  tableClass?: string;
  tableStyle?: CSSProperties;
};

// vxe props
export type JmVxeModalProps = VxeModalProps & {
  // 绑定到vxeModal
  vxeModalRef?: any;
};
