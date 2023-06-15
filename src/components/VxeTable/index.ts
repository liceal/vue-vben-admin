import { withInstall } from '/@/utils';
import vxeBasicTable from './src/VxeBasicTable';
import { VXETable, VXEComponent, VxeGridProps, VxeGridEventProps } from 'vxe-table';
import VXETablePluginAntd from './src/components';
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx';
import './src/setting';

import jmVxeGrid from './src/JmVxeGrid';

export const VxeBasicTable = withInstall(vxeBasicTable);
export const JmVxeGrid: VXEComponent<VxeGridProps, VxeGridEventProps> = withInstall(jmVxeGrid);
export * from 'vxe-table';
export * from './src/types';

VXETable.use(VXETablePluginAntd).use(VXETablePluginExportXLSX);
