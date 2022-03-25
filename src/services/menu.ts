/**
 * 菜单管理请求模块
 */

import request from '@/utils/request'

export const createOrUpdateMenu = (data: any) => {
  return request({
    url: '/boss/menu/saveOrUpdate',
    method: 'post',
    data
  })
}

export const getEditMenuInfo = (id: string|number = -1) => {
  return request({
    url: '/boss/menu/getRoleMenus',
    params: {
      id
    }
  })
}

export const getAllMenus = () => {
  return request({
    url: '/boss/menu/getAll'
  })
}

export const deleteMenu = (id:number) => {
  return request({
    url: `/boss/menu/${id}`,
    method: 'delete'
  })
}
