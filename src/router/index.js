import Vue from 'vue'
import Router from 'vue-router'
import notFound from '@/components/common/404'
import admin from '@/components/admin/admin'
import reg from '@/components/common/reg'
import login from '@/components/common/login'
import notice from '@/components/admin/notice/notice'
import addNotice from '@/components/admin/notice/addNotice'
import update from '@/components/admin/app/update'
import users from '@/components/admin/user/users'
import userDetail from '@/components/admin/user/userDetail'
import message from '@/components/admin/message/message'
import messageDetail from '@/components/admin/message/messageDetail'

Vue.use(Router)

const dic = {
  routes: [
    {
      path: '/admin',
      title: '管理台',
      name: 'admin',
      component: admin,
      redirect: { name: 'message' },
      children: [
        {
          path: 'notice',
          title: '闪屏公告',
          name: 'notice',
          component: notice
        },
        {
          path: 'addnotice',
          title: '添加闪屏公告',
          name: 'addNotice',
          component: addNotice
        },
        {
          path: 'update',
          title: '版本更新',
          name: 'update',
          component: update
        },
        {
          path: 'users',
          title: '用户列表',
          name: 'users',
          component: users
        },
        {
          path: 'userDetail',
          title: '用户详情',
          name: 'userDetail',
          component: userDetail
        },
        {
          path: 'message',
          title: '留言板',
          name: 'message',
          component: message
        },
        {
          path: 'messageDetail',
          title: '留言板详情',
          name: 'messageDetail',
          component: messageDetail
        }
      ]
    },
    {
      path: '/login',
      title: '登录',
      name: 'login',
      component: login
    },
    {
      path: '/reg',
      title: '注册',
      name: 'reg',
      component: reg
    },
    {
      path: '/wrongway',
      component: notFound,
      name: 'notFound',
      hidden: true
    },
    {
      path: '*',
      hidden: true,
      redirect: { name: 'notFound' }
    },
    {
      path: '/',
      hidden: true,
      redirect: { name: 'message' }
    }
  ],
  mode: 'history'
}

export default new Router(dic)
