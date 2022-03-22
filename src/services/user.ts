/**
 * 用户相关请求模块
 */

import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone:string
  password:string
}

export const login = (data: User) => {
  return request({
    url: '/front/user/login',
    method: 'post',
    data: qs.stringify(data)
  })
}
