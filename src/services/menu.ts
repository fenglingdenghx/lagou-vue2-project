/**
 * 用户相关请求模块
 */

import request from '@/utils/request'

export const createOrUpdateMenu = (data: any) => {
  return request({
    url: '/boss/menu/saveOrUpdate',
    method: 'post',
    data
  })
}
