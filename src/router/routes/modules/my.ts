import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const My: AppRouteModule = {
  path: '/my',
  name: 'My',
  component: LAYOUT,
  redirect: '/my/form',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: t('routes.my.my'),
  },
  children: [
    {
      path: 'form',
      name: 'Form',
      component: () => import('/@/views/my/form/index.vue'),
      meta: {
        title: t('routes.my.form'),
        icon: 'simple-icons:about-dot-me',
      },
    },
    {
      path: 'formv2',
      name: 'Formv2',
      component: () => import('/@/views/my/formv2/index.vue'),
      meta: {
        title: t('routes.my.formv2'),
        icon: 'ion:file-tray',
      },
    },
    {
      path: 'table',
      name: 'MyTable',
      component: () => import('/@/views/my/table'),
      meta: {
        title: t('routes.my.table'),
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default My;
