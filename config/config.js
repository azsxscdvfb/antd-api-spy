// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/simple',
            },
			{
              path: '/todo',//url中path部分，http://localhost:8000/todo状态跌幅到这个页面
              name: 'todo', //名称，国际化菜单配置根据这个名称来配置，如果不配置将直菜单将直接显示这个名称
              icon: 'unordered-list',//菜单图标名称
              component:'./todo'// 组件（页面）相对于src/pages的路径
            },
			{
			  path: '/test',//url中path部分，http://localhost:8000/todo状态跌幅到这个页面
              name: 'test', //名称，国际化菜单配置根据这个名称来配置，如果不配置将直菜单将直接显示这个名称
              icon: 'unordered-list',//菜单图标名称
              component:'./test'// 组件（页面）相对于src/pages的路径
			},
			{
			  path: '/simple',//url中path部分，http://localhost:8000/todo状态跌幅到这个页面
              name: 'simple', //名称，国际化菜单配置根据这个名称来配置，如果不配置将直菜单将直接显示这个名称
              icon: 'unordered-list',//菜单图标名称
              component:'./simple'// 组件（页面）相对于src/pages的路径
			},
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy:{
    "/testapi/": {
      target: 'http://39.106.105.240:8077/',
      changeOrigin: true,
      pathRewrite: { '^/testapi/': '' },
    },
  },
  manifest: {
    basePath: '/',
  },
});
