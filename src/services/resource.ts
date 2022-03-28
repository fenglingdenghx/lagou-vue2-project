/**
 * 资源管理请求模块
 */
import request from '@/utils/request'

export const getResourcePages = (data: any): Promise<any> => {
  return request({
    url: '/boss/resource/getResourcePages',
    method: 'post',
    data
  })
}

export const getAllResources = () => {
  return request({
    url: '/boss/resource/category/getAll',
    method: 'get'
  })
}
