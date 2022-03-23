import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'post',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

const request = axios.create({
  // 配置选项
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user && user.access_token) {
    config.headers!.Authorization = user.access_token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
// Add a response interceptor
let isRefresh = false // 控制刷新 token 的状态
let requests:any[] = [] // 存储刷新token期间过来的 401 请求
request.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, async function (error) {
  if (error.response) {
    // 请求发出去收到响应了
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      if (!isRefresh) {
        isRefresh = true // 开启刷新状态
        return refreshToken().then((res) => {
          if (!res.data.success) {
            throw new Error('刷新 token 失败')
          }
          requests.forEach(cb => cb())
          // 重置 requests 数组
          requests = []
          store.commit('setUser', res.data.content)
          return request(error.config)
        }).catch((err) => {
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(err)
        }).finally(() => {
          isRefresh = false // 重置刷新状态
        })
      }
      // 刷新状态下 把请求挂起，放到 requests 数组中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) {
    // 请求发出去没有收到响应了
    Message.error('请求超时，请刷新重试')
  } else {
    // 设置请求时发生了一些错误
    Message.error(`请求失败:${error.message}`)
  }
  // Do something with response error
  return Promise.reject(error)
})

export default request
