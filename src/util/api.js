import axios from 'axios'
import md5 from 'js-md5'
import router from '../router'

let MAIN_URL = ''
if (process.env.NODE_ENV === 'development') {
  MAIN_URL = 'http://127.0.0.1:5000'
} else {
  MAIN_URL = '' // 部署到服务器的接口地址
}

const request = (url, data, callback) => {
  axios.post(MAIN_URL + '/' + url, data)
  .then((response) => {
    if (response &&
      response.status === 200 &&
      response.data.code === 1001) {
      // need login
      router.push({
        name: 'login'
      })
    }
    callback(response)
  })
}

/**
 * reg
 */
const reg = (params, callback) => {
  var data = new URLSearchParams()
  data.append('username', params.username)
  data.append('password', md5(params.password))
  data.append('password2', md5(params.password2))
  data.append('phone', params.phone)
  data.append('email', params.email)

  request('admin/reg', data, (response) => {
    callback(response)
  })
}

/**
 * login
 */
const login = (params, callback) => {
  var data = new URLSearchParams()
  data.append('username', params.username)
  data.append('password', md5(params.password))
  data.append('validId', params.validId)
  data.append('validValue', params.validValue)

  request('admin/login', data, (response) => {
    if (response &&
      response.status === 200 &&
      response.data.code === 0) {
      localStorage.token = response.data.data.token // save token to localStorage
    }
    callback(response)
  })
}

/**
 * 新增、编辑公告
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
const addNotice = (params, callback) => {
  // console.log(params)
  var data = new URLSearchParams()
  data.append('token', localStorage.token)
  data.append('type', params.type)
  data.append('record_id', params.record_id)
  data.append('style', params.style)
  data.append('title', params.title ? params.title : '')
  data.append('content', params.content ? params.content : '')
  data.append('pic', params.pic ? params.pic : '')
  data.append('url', params.url ? params.url : '')
  data.append('beginTime', params.beginTime ? params.beginTime : '')
  data.append('endTime', params.endTime ? params.endTime : '')
  data.append('remark', params.remark ? params.remark : '')

  request('notice/add', data, (response) => {
    callback(response)
  })
}

/**
 * 公告列表
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
const noticeList = (params, callback) => {
  // console.log(params)
  var data = new URLSearchParams()
  data.append('token', localStorage.token)
  data.append('type', params.type)
  data.append('page', params.page)
  data.append('size', params.size)

  request('notice/list', data, (response) => {
    callback(response)
  })
}

/**
 * qcloudToken
 */
const qcloudToken = (params, callback) => {
  var data = new URLSearchParams()
  data.append('token', localStorage.token)

  request('common/QCloud/sign', data, (response) => {
    if (response &&
      response.status === 200 &&
      response.data.code === 0) {
      callback(response)
    }
    callback(response)
  })
}

/**
 * 下线公告
 */
const offnotice = (params, callback) => {
  // console.log(params)
  var data = new URLSearchParams()
  data.append('token', localStorage.token)
  data.append('record_id', params.record_id)

  request('notice/offline', data, (response) => {
    callback(response)
  })
}

/**
 * 保存版本更新配置
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
const saveAppUpdate = (params, callback) => {
  // console.log(params)
  var data = new URLSearchParams()
  data.append('token', localStorage.token)
  data.append('ios_ver', params.ios_ver)
  data.append('ios_force_update', params.ios_force_update)
  data.append('ios_update_url', params.ios_update_url)
  data.append('ios_update_content', params.ios_update_content)
  data.append('ios_review', params.ios_review)
  data.append('android_ver', params.android_ver)
  data.append('android_force_update', params.android_force_update)
  data.append('android_update_url', params.android_update_url)
  data.append('android_update_content', params.android_update_content)

  request('app/version/save', data, (response) => {
    callback(response)
  })
}

/**
 * 获取版本更新
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
const appUpdate = (params, callback) => {
  // console.log(params)
  var data = new URLSearchParams()
  data.append('token', localStorage.token)

  request('app/version/detail', data, (response) => {
    callback(response)
  })
}

/**
 * 获取图片验证码
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
const getValidImage = (params, callback) => {
  // console.log(params)
  request('common/validImage/create', params, (response) => {
    callback(response)
  })
}

const userList = (params, callback) => {
  // console.log(params)
  var data = new URLSearchParams()
  data.append('token', localStorage.token)
  data.append('page', params.page)
  data.append('size', params.size)
  data.append('searchType', params.searchType)
  data.append('searchWords', params.searchWords)

  request('user/list', data, (response) => {
    callback(response)
  })
}

const messageList = (params, callback) => {
  // console.log(params)
  var data = new URLSearchParams()
  data.append('token', localStorage.token)
  data.append('page', params.page)
  data.append('size', params.size)
  data.append('searchType', params.searchType)
  data.append('searchWords', params.searchWords)

  request('message/list', data, (response) => {
    callback(response)
  })
}

const messageDetail = (params, callback) => {
  // console.log(params)
  var data = new URLSearchParams()
  data.append('token', localStorage.token)
  data.append('record_id', params.record_id)

  request('message/detail', data, (response) => {
    callback(response)
  })
}

const messageAdd = (params, callback) => {
  // console.log(params)
  var data = new URLSearchParams()
  data.append('token', localStorage.token)
  data.append('record_id', params.record_id)
  data.append('message', params.message)

  request('message/add', data, (response) => {
    callback(response)
  })
}

const api = {
  reg: reg,
  login: login,
  addNotice: addNotice,
  noticeList: noticeList,
  qcloudToken: qcloudToken,
  offnotice: offnotice,
  saveAppUpdate: saveAppUpdate,
  appUpdate: appUpdate,
  getValidImage: getValidImage,
  userList: userList,
  messageList: messageList,
  messageDetail: messageDetail,
  messageAdd: messageAdd
}

export default api
