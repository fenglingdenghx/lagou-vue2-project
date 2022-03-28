/**
 * 角色管理请求模块
 */

import request from '@/utils/request'

export const getRoleAll = (data:any) => {
  return request({
    url: '/boss/role/getRolePages',
    method: 'post',
    data
  })
}
export const deleteRole = (id:number) => {
  return request({
    url: `/boss/role/${id}`,
    method: 'delete'
  })
}

export const createOrUpdate = (data:any) => {
  return request({
    url: '/boss/role/saveOrUpdate',
    method: 'post',
    data
  })
}

export const getRoleById = (id:number|string) => {
  return request({
    url: `/boss/role/${id}`,
    method: 'get'
  })
}
