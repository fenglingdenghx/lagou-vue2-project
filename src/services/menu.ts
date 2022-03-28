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

// export const getRoleMenus = (roleId: string|number = -1) => {
//   return request({
//     url: '/boss/menu/getRoleMenus',
//     params: {
//       roleId
//     }
//   })
// }
export const getEditMenuInfo = (id: string|number = -1) => {
  return request({
    url: '/boss/menu/getEditMenuInfo',
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

export const getMenuNodeList = () => {
  return request({
    url: '/boss/menu/getMenuNodeList',
    method: 'get'
  })
}

export const allocateRoleMenus = (data:any) => {
  return request({
    url: '/boss//menu/allocateRoleMenus',
    method: 'post',
    data
  })
}

export const getRoleMenus = (roleId:number|string) => {
  return request({
    url: '/boss/menu/getRoleMenus',
    method: 'get',
    params: {
      roleId
    }
  })
}
