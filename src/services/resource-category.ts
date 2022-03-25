/**
 * 资源分类请求模块
 */
import request from '@/utils/request'

export const getResourceCategories = () => {
  return request({
    url: '/boss/resource/category/getAll',
    method: 'get'
  })
}
